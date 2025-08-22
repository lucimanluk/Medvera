"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import Image from "next/image";
import InputRow from "./InputRow";

import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Edit, Save, X } from "lucide-react";
import { api } from "~/trpc/react";
import { toast } from "sonner";

export default function PatientProfile({ data }: { data: any }) {
  const [editing, setEditing] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [series, setSeries] = useState<string>("");
  const [cnp, setCnp] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [gender, setGender] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [county, setCounty] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [emergencyFirst, setEmergencyFirst] = useState<string>("");
  const [emergencyLast, setEmergencyLast] = useState<string>("");
  const [emergencyRelation, setEmergencyRelation] = useState<string>("");
  const [emergencyPhone, setEmergencyPhone] = useState<string>("");
  const [familyDoctor, setFamilyDoctor] = useState<string>("");
  const [familyDoctorPhone, setFamilyDoctorPhone] = useState<string>("");
  const [bloodType, setBloodType] = useState<string>("");
  const [rhFactor, setRhFactor] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");

  const utils = api.useUtils();
  const mutation = api.profile.updatePatientProfile.useMutation({
    onSuccess: () => {
      toast("Successfully modified profile!", {
        action: {
          label: "Close",
          onClick: () => {
            return;
          },
        },
      });
      setEditing(false);
      utils.user.get3.invalidate();
    },
    onError: (err) => {
      toast.error("Couldn't update profile, something went wrong.", {
        action: {
          label: "Close",
          onClick: () => {
            return;
          },
        },
      });
    },
  });

  useEffect(() => {
    if (!data) return;

    const profile = data.doctorProfile ?? data.patientProfile!;

    setImagePreview(profile.image ?? null);
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
    setEmail(data.email);
    setPhoneNumber(profile.phoneNumber ?? "");
    setSeries(profile.series ?? "");
    setCnp(profile.cnp ?? "");
    setBirthDate(profile.birthDate ? new Date(profile.birthDate) : null);
    setGender(profile.gender ?? "");
    setAddress("address" in profile ? (profile.address ?? "") : "");
    setCity("city" in profile ? (profile.city ?? "") : "");
    setCounty("county" in profile ? (profile.county ?? "") : "");
    setZipCode("zipCode" in profile ? (profile.zipCode ?? "") : "");
    setEmergencyFirst(
      "emergencyFirst" in profile ? (profile.emergencyFirst ?? "") : "",
    );
    setEmergencyLast(
      "emergencyLast" in profile ? (profile.emergencyLast ?? "") : "",
    );
    setEmergencyRelation(
      "emergencyRelation" in profile ? (profile.emergencyRelation ?? "") : "",
    );
    setEmergencyPhone(
      "emergencyPhone" in profile ? (profile.emergencyPhone ?? "") : "",
    );

    setFamilyDoctor(
      "familyDoctor" in profile ? (profile.familyDoctor ?? "") : "",
    );
    setFamilyDoctorPhone(
      "familyDoctorPhone" in profile ? (profile.familyDoctorPhone ?? "") : "",
    );
    setBloodType("bloodType" in profile ? (profile.bloodType ?? "") : "");
    setRhFactor("rhFactor" in profile ? (profile.rhFactor ?? "") : "");
    setWeight(
      "weight" in profile && typeof profile.weight === "number"
        ? profile.weight.toString()
        : "",
    );
    setHeight(
      "height" in profile && typeof profile.height === "number"
        ? profile.height.toString()
        : "",
    );
  }, [data]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="flex w-full flex-col gap-4 py-4 pr-4">
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-bold">Profile</span>
        <span className="text-base text-gray-400">Manage your profile</span>
      </div>
      <Tabs defaultValue="personal" className="w-full">
        <div className="flex flex-row justify-between">
          <TabsList>
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="medical">Medical Information</TabsTrigger>
          </TabsList>
          <div className="flex flex-row gap-2">
            <Button
              className="bg-[#2F80ED] text-white hover:bg-[#1366d6]"
              disabled={mutation.isPending}
              onClick={async () => {
                if (editing) {
                  await mutation.mutateAsync({
                    firstName,
                    lastName,
                    image: image
                      ? await convertImageToBase64(image)
                      : imagePreview || "",
                    phoneNumber,
                    series,
                    cnp,
                    birthDate,
                    gender,
                    address,
                    city,
                    county,
                    zipCode,
                    emergencyFirst,
                    emergencyLast,
                    emergencyRelation,
                    emergencyPhone,
                    familyDoctor,
                    familyDoctorPhone,
                    bloodType,
                    rhFactor,
                    weight: weight ? parseFloat(weight) : null,
                    height: height ? parseFloat(height) : null,
                  });
                } else {
                  setEditing(true);
                }
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
                disabled={mutation.isPending}
                onClick={() => {
                  setEditing(false);

                  const profile = data?.doctorProfile ?? data?.patientProfile!;

                  setImagePreview(profile?.image ?? null);
                  setFirstName(profile.firstName);
                  setLastName(profile.lastName);
                  setPhoneNumber(profile.phoneNumber ?? "");
                  setSeries(profile.series ?? "");
                  setCnp(profile.cnp ?? "");
                  setBirthDate(
                    profile.birthDate ? new Date(profile.birthDate) : null,
                  );
                  setGender(profile.gender ?? "");
                  setAddress(
                    "address" in profile ? (profile.address ?? "") : "",
                  );
                  setCity("city" in profile ? (profile.city ?? "") : "");
                  setCounty("county" in profile ? (profile.county ?? "") : "");
                  setZipCode(
                    "zipCode" in profile ? (profile.zipCode ?? "") : "",
                  );
                  setEmergencyFirst(
                    "emergencyFirst" in profile
                      ? (profile.emergencyFirst ?? "")
                      : "",
                  );
                  setEmergencyLast(
                    "emergencyLast" in profile
                      ? (profile.emergencyLast ?? "")
                      : "",
                  );
                  setEmergencyRelation(
                    "emergencyRelation" in profile
                      ? (profile.emergencyRelation ?? "")
                      : "",
                  );
                  setEmergencyPhone(
                    "emergencyPhone" in profile
                      ? (profile.emergencyPhone ?? "")
                      : "",
                  );
                  setFamilyDoctor(
                    "familyDoctor" in profile
                      ? (profile.familyDoctor ?? "")
                      : "",
                  );
                  setFamilyDoctorPhone(
                    "familyDoctorPhone" in profile
                      ? (profile.familyDoctorPhone ?? "")
                      : "",
                  );
                  setBloodType(
                    "bloodType" in profile ? (profile.bloodType ?? "") : "",
                  );
                  setRhFactor(
                    "rhFactor" in profile ? (profile.rhFactor ?? "") : "",
                  );
                  setWeight(
                    "weight" in profile && typeof profile.weight === "number"
                      ? profile.weight.toString()
                      : "",
                  );
                  setHeight(
                    "height" in profile && typeof profile.height === "number"
                      ? profile.height.toString()
                      : "",
                  );
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
            <CardHeader className="flex flex-row justify-between">
              <div>
                <CardTitle>Personal information</CardTitle>
                <CardDescription>
                  Basic personal information about yourself
                </CardDescription>
              </div>
              <div className="flex w-1/4 flex-col items-end gap-2">
                {editing ? (
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full"
                  />
                ) : null}

                <div className="relative h-32 w-32 overflow-hidden rounded-full">
                  <Image
                    src={imagePreview || "/default_pfp.jpg"}
                    alt="Profile preview"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <InputRow
                label_name1={"First name"}
                label_name2={"Last name"}
                value1={firstName}
                setValue1={setFirstName}
                value2={lastName}
                setValue2={setLastName}
                type={["input", "input"]}
                editing={editing}
              />
              <InputRow
                label_name1={"Email"}
                label_name2={"Phone number"}
                inputType1={"email"}
                value1={email}
                setValue1={setEmail}
                value2={phoneNumber}
                setValue2={setPhoneNumber}
                type={["input", "input"]}
                editing={editing}
              />
              <InputRow
                label_name1={"Series"}
                label_name2={"CNP"}
                value1={series}
                setValue1={setSeries}
                value2={cnp}
                setValue2={setCnp}
                type={["input", "input"]}
                editing={editing}
              />
              <InputRow
                label_name1={"Birth date"}
                label_name2={"Gender"}
                inputType1="date"
                inputType2="text"
                value1={birthDate}
                setValue1={setBirthDate}
                value2={gender}
                setValue2={setGender}
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
                  value1={address}
                  setValue1={setAddress}
                  value2={city}
                  setValue2={setCity}
                  type={["input", "input"]}
                  editing={editing}
                />
                <InputRow
                  label_name1={"County"}
                  label_name2={"ZIP Code"}
                  value1={county}
                  setValue1={setCounty}
                  value2={zipCode}
                  setValue2={setZipCode}
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
                  value1={emergencyFirst}
                  setValue1={setEmergencyFirst}
                  value2={emergencyLast}
                  setValue2={setEmergencyLast}
                  type={["input", "input"]}
                  editing={editing}
                />
                <InputRow
                  label_name1={"Relationship"}
                  label_name2={"Phone Number"}
                  value1={emergencyRelation}
                  setValue1={setEmergencyRelation}
                  value2={emergencyPhone}
                  setValue2={setEmergencyPhone}
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
                value1={familyDoctor}
                setValue1={setFamilyDoctor}
                value2={familyDoctorPhone}
                setValue2={setFamilyDoctorPhone}
                type={["input", "input"]}
                editing={editing}
              />
              <InputRow
                label_name1={"Blood type"}
                label_name2={"Rh factor"}
                type={["select", "select"]}
                data1={["A", "B", "AB", "O"]}
                data2={["Negative", "Positive"]}
                value1={bloodType}
                setValue1={setBloodType}
                value2={rhFactor}
                setValue2={setRhFactor}
                editing={editing}
              />
              <InputRow
                label_name1={"Weight"}
                label_name2={"Height"}
                inputType1="number"
                inputType2="number"
                type={["input", "input"]}
                value1={weight}
                setValue1={setWeight}
                value2={height}
                setValue2={setHeight}
                editing={editing}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
