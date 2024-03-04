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
import { Hint } from '../hint';
import { Trash } from 'lucide-react';
import Image from 'next/image';

interface InfoModalProps{
    initialName:string;
    initialThumbnailUrl?:string | null;

}

export const InfoModal = ({initialName,initialThumbnailUrl}:InfoModalProps)=>{
    const router =useRouter()
    const closeRef=useRef<ElementRef<"button">>(null)
    const[isPending,startTransition] = useTransition();
    const [name,setName] =useState(initialName)
    const [thumbnailUrl,setThumbnailUrl] =useState(initialThumbnailUrl)
    const onRemove = ()=>{
        startTransition(()=>{
            updateStream({ thumbnailUrl: null})
            .then(()=>{toast.success("Thumbnail removed")
                setThumbnailUrl("") 
                closeRef?.current?.click()
            })
            .catch(()=>toast.error("Something went wrong!"))
        })
    }
    
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
                    {thumbnailUrl? (
                        <div className='relative aspect-video rounded-xl overflow-hidden border border-white/10'>
                            <div className='absolute top-2 right-2 z-[10]'>
                            <Hint asChild side='left' align='center' label='Remove thumbnail'>
                                <Button 
                                type='button'
                                disabled={isPending}
                                className='h-auto w-auto p-1.5'
                                onClick={onRemove}
                                >
                                <Trash className='h-4 w-4'/>
                                </Button>
                            </Hint>
                            </div>
                            <Image 
                            alt='thumbnail'
                            src={thumbnailUrl}
                            className='object-cover'
                            fill
                            />
                        </div>
                    ):(

                    
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
                        setThumbnailUrl(res?.[0]?.url)
                        closeRef?.current?.click()
                        router.refresh()
                    }}
                    />
                    </div>
                    
                    )
                    }
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