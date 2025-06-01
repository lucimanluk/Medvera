import Appointment from "../_components/appointment";
import { Button } from "~/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

export default function Appointments() {
  return (
    <div className="flex w-full flex-col gap-4 py-4 pr-4">
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-bold">Appointments</span>
        <span className="text-base text-gray-400">
          Manage your healthcare appointments
        </span>
      </div>
      <div className="flex flex-row items-center justify-between">
        <Tabs defaultValue="upcoming" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
        </Tabs>
        <Link href="/lucimanluk4000@gmail.com/finddoctor">
          <Button className="bg-[#2F80ED] text-white hover:bg-[#1366d6]">
            New appointment
          </Button>
        </Link>
      </div>
      <Appointment />
      <Appointment />
      <Appointment />
      <Appointment />
      <Appointment />
      <Appointment />
      <Appointment />
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
