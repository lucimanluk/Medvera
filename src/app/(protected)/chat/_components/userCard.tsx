import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const user = {
  name: "Andrei Denis",
  speciality: "Caridiology",
  lastMessage: "Ma duc la Mc, vrei ceva?",
  lastMessageData: "9:40 AM",
};

export default function UserCard() {
  return (
    <Card className="border-0 shadow-none hover:bg-blue-100">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="h-10 w-10 rounded-full bg-black" />
        <div className="flex flex-col">
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>{user.speciality}</CardDescription>
          <span>{user.lastMessage}</span>
        </div>
        <span>{user.lastMessageData}</span>
      </CardHeader>
    </Card>
  );
}
