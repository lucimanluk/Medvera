import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import InputRow from "./_components/InputRow";

export default function Profile() {
  return (
    <div className="py-4 pr-4">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList>
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="medical">Medical Information</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal information</CardTitle>
              <CardDescription>
                Basic personal information about yourself
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InputRow label_name1={"First name"} label_name2={"Last name"} />
              <InputRow label_name1={"Email"} label_name2={"Phone number"} />
              <InputRow label_name1={"Date of Birth"} label_name2={"Gender"} />
              <div>
                <div className="mb-4 flex flex-col">
                  <h1 className="font-semibold">Adress information</h1>
                  <span className="text-muted-foreground text-sm">
                    Details about where you live
                  </span>
                </div>
                <InputRow label_name1={"Address"} label_name2={"City"} />
                <InputRow label_name1={"County"} label_name2={"ZIP Code"} />
              </div>
              <div>
                <div className="mb-4 flex flex-col">
                  <h1 className="font-semibold">Emergency contact</h1>
                  <span className="text-muted-foreground text-sm">
                    Person to contact in case of emergency
                  </span>
                </div>
                <InputRow
                  label_name1={"First Name"}
                  label_name2={"Last Name"}
                />
                <InputRow
                  label_name1={"Relationship"}
                  label_name2={"Phone Number"}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
