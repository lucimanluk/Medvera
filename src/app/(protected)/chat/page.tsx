"use client";

import { ScrollArea } from "~/components/ui/scroll-area";
import { Input } from "~/components/ui/input";
import UserCard from "./_components/userCard";

export default function Chat() {
  return (
    <div className="flex h-screen w-full flex-col gap-4 py-4 pr-4">
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-bold">Messages</span>
        <span className="text-base text-gray-400">
          Quick view into your prescriptions, appointments and messages
        </span>
      </div>
      <div className="flex flex-row overflow-hidden">
        <div className="flex h-full w-1/3 flex-col gap-2 border p-2">
          <Input placeholder="Search for a chat..." className="p-2"></Input>
          <ScrollArea className="scrollbar-hide h-full">
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
          </ScrollArea>
        </div>
        <div className="h-full w-full overflow-hidden border">
          <ScrollArea className="h-full">
            <div className="p-4 text-gray-400">
              Select a conversation to start chatting...
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
