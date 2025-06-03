'use client'

import { ScrollArea } from '~/components/ui/scroll-area'
import { Input } from '~/components/ui/input'
import UserCard from './_components/userCard'

export default function Chat() {
  return (
    <div className="flex flex-col w-full h-screen gap-4 py-4 pr-4">
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-bold">Messages</span>
        <span className="text-base text-gray-400">
          Quick view into your prescriptions, appointments and messages
        </span>
      </div>
      <div className="flex flex-row overflow-hidden">
        <div className="w-1/4 h-full border gap-2 flex flex-col p-2">
        <Input placeholder="Search for a chat..."></Input>
          <ScrollArea className="h-full">
              <div className="py-2"><UserCard/></div>
              <div className="py-2"><UserCard/></div>          
              <div className="py-2"><UserCard/></div>    
              <div className="py-2"><UserCard/></div>    
              <div className="py-2"><UserCard/></div>    
              <div className="py-2"><UserCard/></div>    
              <div className="py-2"><UserCard/></div>    
              <div className="py-2"><UserCard/></div>    
              <div className="py-2"><UserCard/></div>    
              <div className="py-2"><UserCard/></div>    
              <div className="py-2"><UserCard/></div>    
              <div className="py-2"><UserCard/></div>    
              <div className="py-2"><UserCard/></div>    
              <div className="py-2"><UserCard/></div>    
              <div className="py-2"><UserCard/></div>    
          </ScrollArea>
        </div>
        <div className="w-3/4 h-full border overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4 text-gray-400">Select a conversation to start chatting...</div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
