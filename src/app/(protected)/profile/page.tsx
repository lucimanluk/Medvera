"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import InputRow from "./_components/InputRow";
import InputTypes from "./_components/InputTypes";
import { useState } from "react";

export default function Profile() {
  const [allergies, setAllergies] = useState<string[]>([]);
  const [allergyInput, setAllergyInput] = useState<string>("");
  const [meidcalConditionInput, setMedicalConditionInput] =
    useState<string>("");
  const [meidcalCondition, setMedicalCondition] = useState<string[]>([]);

  return (
    <div className="flex w-full flex-col gap-4 py-4 pr-4">
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-bold">Profile</span>
        <span className="text-base text-gray-400">Manage your profile</span>
      </div>
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
              <InputRow
                label_name1={"First name"}
                label_name2={"Last name"}
                type={["input", "input"]}
              />
              <InputRow
                label_name1={"Email"}
                label_name2={"Phone number"}
                inputType1={"email"}
                type={["input", "input"]}
              />
              <InputRow
                label_name1={"Birth date"}
                label_name2={"Gender"}
                inputType1="date"
                inputType2="text"
                type={["input", "select"]}
                data2={["Male", "Female"]}  
              />
              <div>
                <div className="mb-4 flex flex-col">
                  <h1 className="font-semibold">Adress information</h1>
                  <span className="text-muted-foreground text-sm">
                    Details about where you live
                  </span>
                </div>
                <InputRow
                  label_name1={"Address"}
                  label_name2={"City"}
                  type={["input", "input"]}
                />
                <InputRow
                  label_name1={"County"}
                  label_name2={"ZIP Code"}
                  type={["input", "input"]}
                />
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
                  type={["input", "input"]}
                />
                <InputRow
                  label_name1={"Relationship"}
                  label_name2={"Phone Number"}
                  type={["input", "input"]}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="medical">
          <Card>
            <CardHeader>
              <CardTitle>Medical information</CardTitle>
              <CardDescription>Medical information about you</CardDescription>
            </CardHeader>
            <CardContent>
              <InputRow
                label_name1={"Family doctor"}
                label_name2={"Family doctor's phone number"}
                type={["input", "input"]}
              />
              <InputRow
                label_name1={"Blood type"}
                label_name2={"Rh factor"}
                type={["select", "select"]}
                data1={["A", "B", "AB", "O"]}
                data2={["Negative", "Positive"]}
              />
              <InputRow
                label_name1={"Weight"}
                label_name2={"Height"}
                type={["input", "input"]}
              />
              <div>
                <div className="mb-4 flex flex-col">
                  <h1 className="font-semibold">Afflictions information</h1>
                  <span className="text-muted-foreground text-sm">
                    Details about allergies and medical conditions
                  </span>
                </div>
                <InputTypes
                  label_name={"Allergies"}
                  value={allergyInput}
                  setValue={setAllergyInput}
                />
                <InputTypes
                  label_name={"Medical conditions"}
                  value={meidcalConditionInput}
                  setValue={setMedicalConditionInput}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
