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
};

export default function UserCard() {
    return (
        <Card className="border-0 shadow-none hover:bg-blue-100">
            <CardHeader className="flex flex-row">
                <div className="h-10 w-10 rounded-full bg-black" />
                <div className="flex flex-col">
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription>{user.speciality}</CardDescription>
                </div>
            </CardHeader>
        </Card>
    )
}