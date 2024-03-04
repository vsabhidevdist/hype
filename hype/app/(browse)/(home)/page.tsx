import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { UserButton } from "@clerk/nextjs";
import Image from 'next/image'
import Link from "next/link";

import Header from "@/components/ui/header";
import Sidebar from "../_components/navbar";
import { Results,ResultSkeleton } from "./_components/results";

import { Suspense } from "react";
export default function Home() {
  return (
   <>   
   <div className="h-full p-8 max-w-screen-2xl mx-auto">
    <Suspense fallback={ <ResultSkeleton />}>
   <Results />

    </Suspense>
    
   </div>
</>
  
  )
}
