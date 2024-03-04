"use client"

import { Button } from "../ui/button";
import { Dialog,DialogClose,DialogContent,
DialogTitle,DialogTrigger,DialogHeader } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Hint } from "../hint";
import { ElementRef, useRef, useState, useTransition } from "react";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";
interface BioModalProps{
    initialValue: string | null;
}

export const BioModal =({initialValue}:BioModalProps)=>{
    const closeRef = useRef<ElementRef<"button">>(null)
    const [isPending,startTransition] = useTransition()
    const [value,setValue] = useState(initialValue || "")

    const onSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault()
            startTransition(()=>{
                updateUser( { bio: value} )
                .then(()=> {toast.success("User bio updated");
                closeRef.current?.click()
            }) 
                .catch(()=> {toast.error("Something went wrong!");})
            })
    }
    return(
            <Dialog>
                <DialogTrigger asChild>
                <Button variant='link' size='sm' className="ml-auto">
                    Edit
                </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Edit user bio
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={onSubmit} className="space-y-4">
                    <Textarea  placeholder="User bio" value={value} disabled={isPending} className="resize-none"
                    onChange={(e)=>{
                        setValue(e.target.value)
                    }}
                    />
                    <div className="flex justify-between">
                    <DialogClose ref={closeRef} asChild>
                        <Button type="submit" variant='ghost'>
                        Cancel
                        </Button>
                    </DialogClose>
                    <Button disabled={isPending} type="submit" variant='primary'>
                        Save
                    </Button>
                    </div>
                    </form>
                </DialogContent>
            </Dialog>
        )
}