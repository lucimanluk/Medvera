'use client'

import { ScrollArea } from '~/components/ui/scroll-area'
import { Input } from '~/components/ui/input'
import { Card, CardContent } from '~/components/ui/card'
import Appointment from '../_components/appointment'

const appointments = [{
  doctor_name: "Andrei Denis",
  doctor_speciality: "Cardiology",
  date: "10/06/2025",
  time: "21:15",
  appointment_type: "virtual",
  location: "",
  avatar: "",
},
{
  doctor_name: "Andrei Denis",
  doctor_speciality: "Cardiology",
  date: "10/06/2025",
  time: "21:15",
  appointment_type: "virtual",
  location: "",
  avatar: "",
},
{
  doctor_name: "Andrei Denis",
  doctor_speciality: "Cardiology",
  date: "10/06/2025",
  time: "21:15",
  appointment_type: "virtual",
  location: "",
  avatar: "",
},
{
  doctor_name: "Andrei Denis",
  doctor_speciality: "Cardiology",
  date: "10/06/2025",
  time: "21:15",
  appointment_type: "virtual",
  location: "",
  avatar: "",
},
{
  doctor_name: "Andrei Denis",
  doctor_speciality: "Cardiology",
  date: "10/06/2025",
  time: "21:15",
  appointment_type: "virtual",
  location: "",
  avatar: "",
},
{
  doctor_name: "Andrei Denis",
  doctor_speciality: "Cardiology",
  date: "10/06/2025",
  time: "21:15",
  appointment_type: "virtual",
  location: "",
  avatar: "",
},
{
  doctor_name: "Andrei Denis",
  doctor_speciality: "Cardiology",
  date: "10/06/2025",
  time: "21:15",
  appointment_type: "virtual",
  location: "",
  avatar: "",
},
];

export default function Chat() {
  return (
    <div className="flex flex-col w-full h-screen gap-4 py-4 pr-4">
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-bold">Messages</span>
        <span className="text-base text-gray-400">
          Quick view into your prescriptions, appointments and messages
        </span>
      </div>
      <div className="flex flex-row overflow-hidden rounded-2xl">
        <div className="w-1/4 h-full border gap-2 flex flex-col p-2">
        <Input placeholder="Search for a chat..."></Input>
          <ScrollArea className="h-full">
            {appointments.map((_, index) => (
              <Appointment key={index} />
            ))}
          </ScrollArea>
        </div>
        <div className="w-3/4 h-full border overflow-hidden">
          <ScrollArea className="h-full">
            {/* You can add chat messages or content here */}
            <div className="p-4 text-gray-400">Select a conversation to start chatting...</div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
