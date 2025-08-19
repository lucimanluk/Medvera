"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import * as React from "react";
import ConnectionCard from "./_components/connectionCard";
import { Loader2 } from "lucide-react";
import { Input } from "~/components/ui/input";
import PopoverFilter from "../finddoctor/_components/popoverFilter";
import { frameworks } from "~/types/framework";
import { api } from "~/trpc/react";

export default function Connections() {
  const { data, isLoading, error } = api.connection.getConnections.useQuery();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("All specialisations");
  const [requests, setRequests] = React.useState<number>(0);
  React.useEffect(() => {
    const pendingCount = data?.data.filter((c) => !c.accepted).length ?? 0;
    setRequests(pendingCount);
  }, [data]);
  
  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-row items-center justify-center">
        <Loader2 size={16} className="animate-spin" />
      </div>
    );
  }
  if (error) {
    return <div>Error</div>;
  }
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
            {requests != 0 && data != null && data.user?.doctor ? (
              <span className="text-m absolute top-0 right-0 inline-flex translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600 px-2 py-1.5 leading-none font-medium text-white">
                {requests}
              </span>
            ) : null}
          </TabsTrigger>
        </TabsList>
        <div className="flex flex-row items-center gap-2">
          <Input placeholder="Search for a connection..." className="" />
          {data?.user?.doctor === false ? (
            <PopoverFilter
              open={open}
              setOpen={setOpen}
              value={value}
              setValue={setValue}
              frameworks={frameworks}
            />
          ) : null}
        </div>
        <TabsContent value="connections">
          {data?.data.map((item, index) =>
            item.accepted ? (
              <div className="mb-2" key={index}>
                <ConnectionCard
                  connection={item}
                  key={index}
                  type="connection"
                  user={data.user!}
                />
              </div>
            ) : null,
          )}
        </TabsContent>
        <TabsContent value="requests">
          {data?.data.map((item, index) =>
            item.accepted === false ? (
              <div className="mb-2" key={index}>
                <ConnectionCard
                  connection={item}
                  key={index}
                  type="request"
                  user={data.user!}
                />
              </div>
            ) : null,
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
