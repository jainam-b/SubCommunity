import {SidebarDemo} from '@/components/SideNab'
import React from 'react'

const Page = () => {
  return (
    <div className=' h-screen w-full'>
      
      
      <SidebarDemo /> 
    </div>
  )
}

export default Page


export const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
       
      </div>
    </div>
  );
};