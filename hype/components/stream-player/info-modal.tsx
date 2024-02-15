"use client"
import {Dialog
    ,DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger} from '@/components/ui/dialog'
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ElementRef, useRef, useState, useTransition } from 'react';
import { updateStream } from '@/actions/stream';
import { toast } from 'sonner';
import { UploadDropzone } from '@/lib/uploadthing';
import { useRouter } from 'next/navigation';
interface InfoModalProps{
    initialName:string;
    initialThumbnailUrl?:string | null;

}

export const InfoModal = ({initialName,initialThumbnailUrl}:InfoModalProps)=>{
    const router =useRouter()
    const closeRef=useRef<ElementRef<"button">>(null)
    const[isPending,startTransition] = useTransition();
    const [name,setName] =useState(initialName)
    const [thumbnailUrl,setthumbnailUrl] =useState(initialThumbnailUrl)

    
    const onSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        startTransition(()=>{
            updateStream({ name:name })
            .then(()=> {
                toast.success("Stream updated");
                closeRef?.current?.click();
            })
            .catch(()=> toast.error("Somwthing went wrong!"))

        })
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setName(e.target.value)

    }
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='link' size='sm' className='ml-auto'>Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit stream
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className='space-y-14'>
                    <div className='space-y-2'>
                    <label>
                        Name
                    </label>
                    <Input 
                    placeholder="Stream name"
                    onChange={onChange}
                    value={name}
                    disabled={isPending}
                    />
                    </div>
                    <div className='space-y-2'>
                    <label>Thumbnail</label>
                    <div className='rounded-xl border outline-dashed outline-muted'>
                    <UploadDropzone 
                    endpoint='thumbnailUploader'
                    appearance={{
                        label:{
                            color: "#FFFFFF"
                        },
                        allowedContent: {
                            color: "#FFFFFF"
                        }
                    }}
                    onClientUploadComplete={(res)=>{
                        setthumbnailUrl(res?.[0]?.url)
                        router.refresh()
                    }}
                    />
                    </div>
                    </div>
                    <div className='flex justify-between'>
                    <DialogClose ref={closeRef} asChild>
                        <Button type='button' variant='ghost'>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button variant='secondary' disabled={isPending} type='submit'>
                        Save
                    </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}