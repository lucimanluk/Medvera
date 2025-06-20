"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Check, X, Eye } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function ConnectionCard({ type }: { type: string }) {
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-black" />
          <div className="flex flex-col gap-1">
            <CardTitle>Caca</CardTitle>
            <CardDescription>Pipi</CardDescription>
          </div>
        </div>
        {type === "request" ? (
          <div className="flex flex-row gap-2">
            <Button variant="outline">
              <Eye />
              View details
            </Button>
            <Button className="bg-[#2F80ED] text-white hover:bg-[#1366d6]">
              <Check />
              Accept
            </Button>
            <Button className="bg-red-500 text-white hover:bg-red-600 hover:text-white">
              <X />
              Decline
            </Button>
          </div>
        ) : (
          <Button variant="outline">
            <Eye />
            View details
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex w-3/4 justify-between">
        <span>mail</span>
        <span></span>
      </CardContent>
    </Card>
  );
}
