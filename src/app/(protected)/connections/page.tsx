"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import * as React from "react";
import ConnectionCard from "./_components/connectionCard";
import { Input } from "~/components/ui/input";
import PopoverFilter from "../finddoctor/_components/popoverFilter";
import { frameworks } from "~/types/framework";

export default function Connections() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("All specialisations");
  const requests = 9;
  return (
    <div className="flex w-full flex-col gap-4 py-4 pr-4">
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-bold">Conenctions</span>
        <span className="text-base text-gray-400">
          Simple connection management for patients and doctors alike
        </span>
      </div>
      <Tabs defaultValue="connections">
        <TabsList>
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="requests" className="relative">
            Requests
            <span className="text-m absolute top-0 right-0 inline-flex translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600 px-2 py-1.5 leading-none font-medium text-white">
              {requests}
            </span>
          </TabsTrigger>
        </TabsList>
        <div className="flex flex-row items-center gap-2">
          <Input placeholder="Search for a connection..." className=""/>
          <PopoverFilter
            open={open}
            setOpen={setOpen}
            value={value}
            setValue={setValue}
            frameworks={frameworks}
          />
        </div>
        <TabsContent value="connections">
          <ConnectionCard type={"connection"}/>
        </TabsContent>
        <TabsContent value="requests">
          <ConnectionCard type={"request"}/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
