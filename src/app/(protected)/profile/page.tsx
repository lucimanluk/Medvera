"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Calendar } from "~/components/ui/calendar";
import InputRow from "./_components/InputRow";
import InputTypes from "./_components/InputTypes";
import { useState } from "react";
import { api } from "~/trpc/react";
import { Loader2, Edit, Save, X } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function Profile() {
  const { data, isLoading, error } = api.user.get2.useQuery();
  const [editing, setEditing] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [allergies, setAllergies] = useState<string[]>([]);
  const [allergyInput, setAllergyInput] = useState<string>("");
  const [meidcalConditionInput, setMedicalConditionInput] =
    useState<string>("");
  const [meidcalCondition, setMedicalCondition] = useState<string[]>([]);
  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-row items-center justify-center">
        <Loader2 size={16} className="animate-spin" />
      </div>
    );
  }
  if (error) {
    return <div className="m-auto">Error...</div>;
  }
  if (data?.doctor === false) {
    return (
      <div className="flex w-full flex-col gap-4 py-4 pr-4">
        <div className="flex flex-col gap-1">
          <span className="text-3xl font-bold">Profile</span>
          <span className="text-base text-gray-400">Manage your profile</span>
        </div>
        <Tabs defaultValue="personal" className="w-full">
          <div className="flex flex-row justify-between">
            <TabsList>
              <TabsTrigger value="personal" disabled={editing}>
                Personal Information
              </TabsTrigger>
              <TabsTrigger value="medical" disabled={editing}>
                Medical Information
              </TabsTrigger>
            </TabsList>
            <div className="flex flex-row gap-2">
              <Button
                className="bg-[#2F80ED] text-white hover:bg-[#1366d6]"
                onClick={() => {
                  setEditing(!editing);
                }}
              >
                {editing ? (
                  <>
                    <Save />
                    <span>Save changes</span>
                  </>
                ) : (
                  <>
                    <Edit />
                    <span>Edit profile</span>
                  </>
                )}
              </Button>
              {editing ? (
                <Button
                  onClick={() => {
                    setEditing(false);
                  }}
                >
                  <X />
                  Cancel editing
                </Button>
              ) : null}
            </div>
          </div>
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal information</CardTitle>
                <CardDescription>
                  Basic personal information about yourself
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <InputRow
                  label_name1={"First name"}
                  label_name2={"Last name"}
                  type={["input", "input"]}
                  editing={editing}
                />
                <InputRow
                  label_name1={"Email"}
                  label_name2={"Phone number"}
                  inputType1={"email"}
                  type={["input", "input"]}
                  editing={editing}
                />
                <InputRow
                  label_name1={"Series"}
                  label_name2={"CNP"}
                  type={["input", "input"]}
                  editing={editing}
                />
                <InputRow
                  label_name1={"Birth date"}
                  label_name2={"Gender"}
                  inputType1="date"
                  inputType2="text"
                  type={["input", "select"]}
                  data2={["Male", "Female"]}
                  editing={editing}
                />
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <h1 className="font-semibold">Address information</h1>
                    <span className="text-muted-foreground text-sm">
                      Details about where you live
                    </span>
                  </div>
                  <InputRow
                    label_name1={"Address"}
                    label_name2={"City"}
                    type={["input", "input"]}
                    editing={editing}
                  />
                  <InputRow
                    label_name1={"County"}
                    label_name2={"ZIP Code"}
                    type={["input", "input"]}
                    editing={editing}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <h1 className="font-semibold">Emergency contact</h1>
                    <span className="text-muted-foreground text-sm">
                      Person to contact in case of emergency
                    </span>
                  </div>
                  <InputRow
                    label_name1={"First Name"}
                    label_name2={"Last Name"}
                    type={["input", "input"]}
                    editing={editing}
                  />
                  <InputRow
                    label_name1={"Relationship"}
                    label_name2={"Phone Number"}
                    type={["input", "input"]}
                    editing={editing}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="medical">
            <Card>
              <CardHeader>
                <CardTitle>Medical information</CardTitle>
                <CardDescription>Medical information</CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col gap-4">
                <InputRow
                  label_name1={"Family doctor"}
                  label_name2={"Family doctor's phone number"}
                  type={["input", "input"]}
                  editing={editing}
                />
                <InputRow
                  label_name1={"Blood type"}
                  label_name2={"Rh factor"}
                  type={["select", "select"]}
                  data1={["A", "B", "AB", "O"]}
                  data2={["Negative", "Positive"]}
                  editing={editing}
                />
                <InputRow
                  label_name1={"Weight"}
                  label_name2={"Height"}
                  type={["input", "input"]}
                  editing={editing}
                />
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <h1 className="font-semibold">Afflictions information</h1>
                    <span className="text-muted-foreground text-sm">
                      Details about allergies and medical conditions
                    </span>
                  </div>
                  <InputTypes
                    label_name={"Allergies"}
                    value={allergyInput}
                    setValue={setAllergyInput}
                    editing={editing}
                  />
                  <InputTypes
                    label_name={"Medical conditions"}
                    value={meidcalConditionInput}
                    setValue={setMedicalConditionInput}
                    editing={editing}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  } else if (data?.doctor === true) {
    return (
      <div className="flex w-full flex-col gap-4 py-4 pr-4">
        <div className="flex flex-col gap-1">
          <span className="text-3xl font-bold">Profile</span>
          <span className="text-base text-gray-400">Manage your profile</span>
        </div>
        <Tabs defaultValue="personal" className="w-full">
          <div className="flex flex-row justify-between">
            <TabsList>
              <TabsTrigger value="personal" disabled={editing}>
                Personal Information
              </TabsTrigger>
              <TabsTrigger value="professional" disabled={editing}>
                Professional Information
              </TabsTrigger>
            </TabsList>
            <div className="flex flex-row gap-2">
              <Button
                className="bg-[#2F80ED] text-white hover:bg-[#1366d6]"
                onClick={() => {
                  setEditing(!editing);
                }}
              >
                {editing ? (
                  <>
                    <Save />
                    <span>Save changes</span>
                  </>
                ) : (
                  <>
                    <Edit />
                    <span>Edit profile</span>
                  </>
                )}
              </Button>
              {editing ? (
                <Button
                  onClick={() => {
                    setEditing(false);
                  }}
                >
                  <X />
                  Cancel editing
                </Button>
              ) : null}
            </div>
          </div>
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal information</CardTitle>
                <CardDescription>
                  Basic personal information about yourself
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <InputRow
                  label_name1={"First name"}
                  label_name2={"Last name"}
                  type={["input", "input"]}
                  editing={editing}
                />
                <InputRow
                  label_name1={"Email"}
                  label_name2={"Phone number"}
                  inputType1={"email"}
                  type={["input", "input"]}
                  editing={editing}
                />
                <InputRow
                  label_name1={"Series"}
                  label_name2={"CNP"}
                  type={["input", "input"]}
                  editing={editing}
                />
                <InputRow
                  label_name1={"Birth date"}
                  label_name2={"Gender"}
                  inputType1="date"
                  inputType2="text"
                  type={["input", "select"]}
                  data2={["Male", "Female"]}
                  editing={editing}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="professional">
            <Card>
              <CardHeader>
                <CardTitle>Professional information</CardTitle>
                <CardDescription>
                  Profesional information about you
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <InputRow
                  label_name1={"Specialization"}
                  label_name2={"Subspecialization"}
                  type={["select", "select"]}
                  editing={editing}
                />
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <h1 className="font-semibold">Adress information</h1>
                    <span className="text-muted-foreground text-sm">
                      Details about your cabinet location
                    </span>
                  </div>

                  <InputRow
                    label_name1={"Cabinet name"}
                    label_name2={"Cabinet phone number"}
                    type={["input", "input"]}
                    editing={editing}
                  />
                  <InputRow
                    label_name1={"Address"}
                    label_name2={"City"}
                    type={["input", "input"]}
                    editing={editing}
                  />
                  <InputRow
                    label_name1={"County"}
                    label_name2={"ZIP Code"}
                    type={["input", "input"]}
                    editing={editing}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <h1 className="font-semibold">
                      CMR information (Romanian College of Physicians)
                    </h1>
                    <span className="text-muted-foreground text-sm">
                      Your CMR details
                    </span>
                  </div>
                  <InputRow
                    label_name1={"CMR Series"}
                    label_name2={"CMR Number"}
                    type={["input", "input"]}
                    editing={editing}
                  />
                  <InputRow
                    label_name1={"Date of issue"}
                    label_name2={"Expiration date"}
                    inputType1="date"
                    inputType2="date"
                    type={["input", "input"]}
                    editing={editing}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <h1 className="font-semibold">Digital signature</h1>
                    <span className="text-muted-foreground text-sm">
                      Your digital signature details
                    </span>
                  </div>
                  <InputRow
                    label_name1={"Digital signature series"}
                    label_name2={"Digital signature number"}
                    type={["input", "input"]}
                    editing={editing}
                  />
                  <InputRow
                    label_name1={"Date of issue"}
                    label_name2={"Expiration date"}
                    inputType1="date"
                    inputType2="date"
                    type={["input", "input"]}
                    editing={editing}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }
}
