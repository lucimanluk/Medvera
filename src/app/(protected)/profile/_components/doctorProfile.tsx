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
import { Edit, Save, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { specializations } from "~/data/specializations";
import { toast } from "sonner";

export default function DoctorProfile({ data }: { data: any }) {
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
  const [specialization, setSpecialization] = useState<string>("");
  const [specializationIssueDate, setSpecializationIssueDate] =
    useState<Date | null>(null);
  const [cabinetName, setCabinetName] = useState<string>("");
  const [cabinetPhone, setCabinetPhone] = useState<string>("");
  const [cabinetAddress, setCabinetAddress] = useState<string>("");
  const [cabinetCity, setCabinetCity] = useState<string>("");
  const [cabinetCounty, setCabinetCounty] = useState<string>("");
  const [cabinetZipCode, setCabinetZipCode] = useState<string>("");
  const [cmrSeries, setCmrSeries] = useState<string>("");
  const [cmrNumber, setCmrNumber] = useState<string>("");
  const [cmrIssueDate, setCmrIssueDate] = useState<Date | null>(null);
  const [cmrExpirationDate, setCmrExpirationDate] = useState<Date | null>(null);
  const [digiSigSeries, setDigiSigSeries] = useState<string>("");
  const [digiSigNumber, setDigiSigNumber] = useState<string>("");
  const [digiSigIssueDate, setDigiSigIssueDate] = useState<Date | null>(null);
  const [digiSigExpirationDate, setDigiSigExpirationDate] =
    useState<Date | null>(null);
  const [appointmentPrice, setAppointmentPrice] = useState<string>("");
  const [appointmentDuration, setAppointmentDuration] = useState<number>();

  const utils = api.useUtils();
  const mutation = api.profile.updateDoctorProfile.useMutation({
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
      const zodMsg = err?.data?.zodError
        ? Object.values(err.data.zodError.fieldErrors)
            .flat()
            .filter(Boolean)
            .join(", ")
        : null;

      toast.error("Couldn't update profile", {
        description: zodMsg || err.message || "Something went wrong.",
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
    setSpecialization(
      "specialization" in profile ? (profile.specialization ?? "") : "",
    );
    setSpecializationIssueDate(
      "specializationIssueDate" in profile && profile.specializationIssueDate
        ? new Date(profile.specializationIssueDate)
        : null,
    );
    setCabinetName("cabinetName" in profile ? (profile.cabinetName ?? "") : "");
    setCabinetPhone(
      "cabinetPhone" in profile ? (profile.cabinetPhone ?? "") : "",
    );
    setCabinetAddress(
      "cabinetAddress" in profile ? (profile.cabinetAddress ?? "") : "",
    );
    setCabinetCity("cabinetCity" in profile ? (profile.cabinetCity ?? "") : "");
    setCabinetCounty(
      "cabinetCounty" in profile ? (profile.cabinetCounty ?? "") : "",
    );
    setCabinetZipCode(
      "cabinetZipCode" in profile ? (profile.cabinetZipCode ?? "") : "",
    );
    setCmrSeries("cmrSeries" in profile ? (profile.cmrSeries ?? "") : "");
    setCmrNumber("cmrNumber" in profile ? (profile.cmrNumber ?? "") : "");
    setCmrIssueDate(
      "cmrIssueDate" in profile && profile.cmrIssueDate
        ? profile.cmrIssueDate
        : null,
    );
    setCmrExpirationDate(
      "cmrExpirationDate" in profile && profile.cmrExpirationDate
        ? profile.cmrExpirationDate
        : null,
    );
    setDigiSigSeries(
      "digiSigSeries" in profile ? (profile.digiSigSeries ?? "") : "",
    );
    setDigiSigNumber(
      "digiSigNumber" in profile ? (profile.digiSigNumber ?? "") : "",
    );
    setDigiSigIssueDate(
      "digiSigIssueDate" in profile && profile.digiSigIssueDate
        ? profile.digiSigIssueDate
        : null,
    );
    setDigiSigExpirationDate(
      "digiSigExpirationDate" in profile && profile.digiSigExpirationDate
        ? profile.digiSigExpirationDate
        : null,
    );
    setAppointmentPrice(
      "appointmentPrice" in profile && profile.appointmentPrice
        ? profile.appointmentPrice
        : 0,
    );
    setAppointmentDuration(
      "appointmentDuration" in profile && profile.appointmentDuration
        ? profile.appointmentDuration
        : 0,
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
            <TabsTrigger value="professional">
              Professional Information
            </TabsTrigger>
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
                    specialization,
                    specializationIssueDate,
                    cabinetName,
                    cabinetPhone,
                    cabinetAddress,
                    cabinetCity,
                    cabinetCounty,
                    cabinetZipCode,
                    cmrSeries,
                    cmrNumber,
                    cmrIssueDate,
                    cmrExpirationDate,
                    digiSigSeries,
                    digiSigNumber,
                    digiSigIssueDate,
                    digiSigExpirationDate,
                    appointmentDuration,
                    appointmentPrice: appointmentPrice ? parseInt(appointmentPrice) : null,
                  });
                }
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

                  setSpecialization(
                    "specialization" in profile
                      ? (profile.specialization ?? "")
                      : "",
                  );
                  setSpecializationIssueDate(
                    "specializationIssueDate" in profile &&
                      profile.specializationIssueDate
                      ? new Date(profile.specializationIssueDate)
                      : null,
                  );
                  setCabinetName(
                    "cabinetName" in profile ? (profile.cabinetName ?? "") : "",
                  );
                  setCabinetPhone(
                    "cabinetPhone" in profile
                      ? (profile.cabinetPhone ?? "")
                      : "",
                  );
                  setCabinetAddress(
                    "cabinetAddress" in profile
                      ? (profile.cabinetAddress ?? "")
                      : "",
                  );
                  setCabinetCity(
                    "cabinetCity" in profile ? (profile.cabinetCity ?? "") : "",
                  );
                  setCabinetCounty(
                    "cabinetCounty" in profile
                      ? (profile.cabinetCounty ?? "")
                      : "",
                  );
                  setCabinetZipCode(
                    "cabinetZipCode" in profile
                      ? (profile.cabinetZipCode ?? "")
                      : "",
                  );
                  setCmrSeries(
                    "cmrSeries" in profile ? (profile.cmrSeries ?? "") : "",
                  );
                  setCmrNumber(
                    "cmrNumber" in profile ? (profile.cmrNumber ?? "") : "",
                  );
                  setCmrIssueDate(
                    "cmrIssueDate" in profile && profile.cmrIssueDate
                      ? profile.cmrIssueDate
                      : null,
                  );
                  setCmrExpirationDate(
                    "cmrExpirationDate" in profile && profile.cmrExpirationDate
                      ? profile.cmrExpirationDate
                      : null,
                  );
                  setDigiSigSeries(
                    "digiSigSeries" in profile
                      ? (profile.digiSigSeries ?? "")
                      : "",
                  );
                  setDigiSigNumber(
                    "digiSigNumber" in profile
                      ? (profile.digiSigNumber ?? "")
                      : "",
                  );
                  setDigiSigIssueDate(
                    "digiSigIssueDate" in profile && profile.digiSigIssueDate
                      ? profile.digiSigIssueDate
                      : null,
                  );
                  setDigiSigExpirationDate(
                    "digiSigExpirationDate" in profile &&
                      profile.digiSigExpirationDate
                      ? profile.digiSigExpirationDate
                      : null,
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
                {imagePreview ? (
                  <div className="relative h-32 w-32 overflow-hidden rounded-full">
                    <Image
                      src={imagePreview}
                      alt="Profile preview"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                ) : (
                  <div className="relative h-32 w-32 overflow-hidden rounded-full">
                    <Image
                      src="/default_pfp.jpg"
                      alt="Blank avatar"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
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
                inputType2={"phone"}
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
                inputType2="cnp"
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
                label_name2={"Date of issue"}
                inputType2="date"
                type={["select", "input"]}
                value1={specialization}
                setValue1={setSpecialization}
                value2={specializationIssueDate}
                setValue2={setSpecializationIssueDate}
                editing={editing}
                data1={specializations}
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
                  value1={cabinetName}
                  setValue1={setCabinetName}
                  inputType2={"phone"}
                  value2={cabinetPhone}
                  setValue2={setCabinetPhone}
                  type={["input", "input"]}
                  editing={editing}
                />
                <InputRow
                  label_name1={"Address"}
                  label_name2={"City"}
                  value1={cabinetAddress}
                  setValue1={setCabinetAddress}
                  value2={cabinetCity}
                  setValue2={setCabinetCity}
                  type={["input", "input"]}
                  editing={editing}
                />
                <InputRow
                  label_name1={"County"}
                  label_name2={"ZIP Code"}
                  value1={cabinetCounty}
                  setValue1={setCabinetCounty}
                  value2={cabinetZipCode}
                  setValue2={setCabinetZipCode}
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
                  value1={cmrSeries}
                  setValue1={setCmrSeries}
                  value2={cmrNumber}
                  setValue2={setCmrNumber}
                  type={["input", "input"]}
                  editing={editing}
                />
                <InputRow
                  label_name1={"Date of issue"}
                  label_name2={"Expiration date"}
                  inputType1="date"
                  inputType2="date"
                  value1={cmrIssueDate}
                  setValue1={setCmrIssueDate}
                  value2={cmrExpirationDate}
                  setValue2={setCmrExpirationDate}
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
                  value1={digiSigSeries}
                  setValue1={setDigiSigSeries}
                  value2={digiSigNumber}
                  setValue2={setDigiSigNumber}
                  type={["input", "input"]}
                  editing={editing}
                />
                <InputRow
                  label_name1={"Date of issue"}
                  label_name2={"Expiration date"}
                  inputType1="date"
                  inputType2="date"
                  value1={digiSigIssueDate}
                  setValue1={setDigiSigIssueDate}
                  value2={digiSigExpirationDate}
                  setValue2={setDigiSigExpirationDate}
                  type={["input", "input"]}
                  editing={editing}
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <h1 className="font-semibold">
                    Schedule and appointment details
                  </h1>
                  <span className="text-muted-foreground text-sm">
                    Details about your schedule and appointments
                  </span>
                </div>
                <InputRow
                  label_name1={"Appointment price (prices in RON)"}
                  label_name2={"Appointment duration (in minutes)"}
                  inputType1="number"
                  inputType2="number"
                  type={["input", "select"]}
                  data2={[15, 30, 60]}
                  value1={appointmentPrice}
                  setValue1={setAppointmentPrice}
                  value2={appointmentDuration}
                  setValue2={setAppointmentDuration}
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

async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
