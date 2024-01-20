import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
 import axios from 'axios'
export async function POST(req: Request) {
 
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
 
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }
 
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");
 
  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }
 
  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);
 
  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);
 
  let evt: WebhookEvent
 
  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }
 
  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;
 
  console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
  console.log('Webhook body:', body)
  
  
  if (eventType === "user.created"){
    const postData = {
      username : payload.data.username,
      externalUserId: payload.data.id,
      email: payload.data.email_addresses[0].email_address,
      imageUrl : payload.data.image_url,
  
    };
    console.log(postData)
    const handlePostRequest = async () => {
      try {
        const response = await axios.post(`${process.env.HOST}api/userinfo`, postData);
  
        if (response.status === 200) {
          console.log('POST request successful');
        } else {
          console.error('POST request failed');
        }
      } catch (error) {
        console.error('Error during POST request:', error);
      }
    };
    handlePostRequest()
  }
  if(eventType==="user.updated"){
    const postData = {
      username : payload.data.username,
      externalUserId: payload.data.id,
      email: payload.data.email_addresses[0].email_address,
      imageUrl : payload.data.image_url,
  
    };
    const handlePutRequest = async () => {
      try {
        const response = await axios.put(`${process.env.HOST}/api/userupdate`, postData,{
          headers: {
            'Content-Type': 'application/json',
            // Include other headers if needed
          },
        });
  
        if (response.status === 200) {
          console.log('PUT request successful');
        } else {
          console.error('PUT request failed');
        }
      } catch (error) {
        console.error('Error during PUT request:', error);
      }
    };
    handlePutRequest()
  }
  if(eventType==="user.deleted"){
    const deleteData = {
      username : payload.data.username,
      externalUserId: payload.data.id,
      email: payload.data.email_addresses[0].email_address,
      imageUrl : payload.data.image_url,
  
    };
    const handlePutRequest = async () => {
      try {
        const response = await axios.delete(`${process.env.HOST}/api/userdelete`, {data: deleteData});
  
        if (response.status === 200) {
          console.log('Delete request successful');
        } else {
          console.error('Delete request failed');
        }
      } catch (error) {
        console.error('Error during Delete request:', error);
      }
    };
    handlePutRequest()
  }
      

      
  
  return new Response('', { status: 200 })
}
 