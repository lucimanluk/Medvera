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
import InputRow from "./_components/InputRow";
import InputTypes from "./_components/InputTypes";
import { useState, useEffect } from "react";
import { api } from "~/trpc/react";
import { Loader2, Edit, Save, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { specializations } from "~/data/specializations";

export default function Profile() {
  const { data, isLoading, error } = api.user.get3.useQuery();
  const [editing, setEditing] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [series, setSeries] = useState<string>("");
  const [cnp, setCnp] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Date | undefined>();
  const [gender, setGender] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [county, setCounty] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [emergencyFirst, setEmergencyFirst] = useState<string>("");
  const [emergencyLast, setEmergencyLast] = useState<string>("");
  const [emergencyRelation, setEmergencyRelation] = useState<string>("");
  const [emergencyPhone, setEmergencyPhone] = useState<string>("");
  const [specialization, setSpecialization] = useState<string>("");
  const [spcializationDateOfIssue, setSpecializationDateOfIssue] = useState<
    Date | undefined
  >();
  const [cabinetName, setCabinetName] = useState<string>("");
  const [cabinetPhoneNumber, setCabinetPhoneNumber] = useState<string>("");
  const [cabinetAddress, setCabinetAddress] = useState<string>("");
  const [cabinetCity, setCabinetCity] = useState<string>("");
  const [cabinetCounty, setCabinetCounty] = useState<string>("");
  const [cabinetZip, setCabinetZip] = useState<string>("");
  const [cmrSeries, setCmrSeries] = useState<string>("");
  const [cmrNumber, setCmrNumber] = useState<string>("");
  const [cmrDateOfIssue, setCmrDateOfIssue] = useState<string>("");
  const [cmrExpirationDate, setCmrExpirationDate] = useState<string>("");
  const [digSigSeries, setDigSigSeries] = useState<string>("");
  const [digSigNumber, setDigSigNumber] = useState<string>("");
  const [digSigDateOfIssue, setDigSigDateOfIssue] = useState<string>("");
  const [digSigExpirationDate, setDigSigExpirationDate] = useState<string>("");
  const [apptPrice, setApptPrice] = useState<number>();
  const [apptDuration, setApptDuration] = useState<number>();
  const [familyDoctor, setFamilyDoctor] = useState<string>("");
  const [familyDoctorPhone, setFamilyDoctorPhone] = useState<string>("");
  const [bloodType, setBloodType] = useState<string>("");
  const [rhFactor, setRhFactor] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [allergies, setAllergies] = useState<string[]>([]);
  const [allergyInput, setAllergyInput] = useState<string>("");
  const [meidcalConditionInput, setMedicalConditionInput] =
    useState<string>("");
  const [meidcalCondition, setMedicalCondition] = useState<string[]>([]);
  useEffect(() => {
    if (!data) return;

    const profile = data.doctorProfile ?? data.patientProfile!;

    setImagePreview(data.image ?? null);
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
    setEmail(data.email);
    setPhoneNumber(profile.phoneNumber ?? "");
    setSeries(profile.series ?? "");
    setCnp(profile.cnp ?? "");
    setBirthDate(profile.birthDate ? new Date(profile.birthDate) : undefined);
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
    setSpecialization(
      "specialization" in profile ? (profile.specialization ?? "") : "",
    );
    setSpecializationDateOfIssue(
      "specializationIssueDate" in profile && profile.specializationIssueDate
        ? new Date(profile.specializationIssueDate)
        : undefined,
    );
    setCabinetName("cabinetName" in profile ? (profile.cabinetName ?? "") : "");
    setCabinetPhoneNumber(
      "cabinetPhone" in profile ? (profile.cabinetPhone ?? "") : "",
    );
    setCabinetAddress(
      "cabinetAddress" in profile ? (profile.cabinetAddress ?? "") : "",
    );
    setCabinetCity("cabinetCity" in profile ? (profile.cabinetCity ?? "") : "");
    setCabinetCounty(
      "cabinetCounty" in profile ? (profile.cabinetCounty ?? "") : "",
    );
    setCabinetZip(
      "cabinetZipCode" in profile ? (profile.cabinetZipCode ?? "") : "",
    );
    setCmrSeries("cmrSeries" in profile ? (profile.cmrSeries ?? "") : "");
    setCmrNumber("cmrNumber" in profile ? (profile.cmrNumber ?? "") : "");
    setCmrDateOfIssue(
      "cmrIssueDate" in profile && profile.cmrIssueDate
        ? profile.cmrIssueDate.toISOString().slice(0, 10)
        : "",
    );
    setCmrExpirationDate(
      "cmrExpirationDate" in profile && profile.cmrExpirationDate
        ? profile.cmrExpirationDate.toISOString().slice(0, 10)
        : "",
    );
    setDigSigSeries(
      "digiSigSeries" in profile ? (profile.digiSigSeries ?? "") : "",
    );
    setDigSigNumber(
      "digiSigNumber" in profile ? (profile.digiSigNumber ?? "") : "",
    );
    setDigSigDateOfIssue(
      "digiSigIssueDate" in profile && profile.digiSigIssueDate
        ? profile.digiSigIssueDate.toISOString().slice(0, 10)
        : "",
    );
    setDigSigExpirationDate(
      "digiSigExpirationDate" in profile && profile.digiSigExpirationDate
        ? profile.digiSigExpirationDate.toISOString().slice(0, 10)
        : "",
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
    setAllergies("allergies" in profile ? profile.allergies : []);
    setMedicalCondition(
      "medicalConditions" in profile ? profile.medicalConditions : [],
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

                    const profile =
                      data?.doctorProfile ?? data?.patientProfile!;

                    setImagePreview(data?.image ?? null);
                    setFirstName(profile.firstName);
                    setLastName(profile.lastName);
                    setPhoneNumber(profile.phoneNumber ?? "");
                    setSeries(profile.series ?? "");
                    setCnp(profile.cnp ?? "");
                    setBirthDate(
                      profile.birthDate
                        ? new Date(profile.birthDate)
                        : undefined,
                    );
                    setGender(profile.gender ?? "");
                    setAddress(
                      "address" in profile ? (profile.address ?? "") : "",
                    );
                    setCity("city" in profile ? (profile.city ?? "") : "");
                    setCounty(
                      "county" in profile ? (profile.county ?? "") : "",
                    );
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
                    setSpecialization(
                      "specialization" in profile
                        ? (profile.specialization ?? "")
                        : "",
                    );
                    setSpecializationDateOfIssue(
                      "specializationIssueDate" in profile &&
                        profile.specializationIssueDate
                        ? new Date(profile.specializationIssueDate)
                        : undefined,
                    );
                    setCabinetName(
                      "cabinetName" in profile
                        ? (profile.cabinetName ?? "")
                        : "",
                    );
                    setCabinetPhoneNumber(
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
                      "cabinetCity" in profile
                        ? (profile.cabinetCity ?? "")
                        : "",
                    );
                    setCabinetCounty(
                      "cabinetCounty" in profile
                        ? (profile.cabinetCounty ?? "")
                        : "",
                    );
                    setCabinetZip(
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
                    setCmrDateOfIssue(
                      "cmrIssueDate" in profile && profile.cmrIssueDate
                        ? profile.cmrIssueDate.toISOString().slice(0, 10)
                        : "",
                    );
                    setCmrExpirationDate(
                      "cmrExpirationDate" in profile &&
                        profile.cmrExpirationDate
                        ? profile.cmrExpirationDate.toISOString().slice(0, 10)
                        : "",
                    );
                    setDigSigSeries(
                      "digiSigSeries" in profile
                        ? (profile.digiSigSeries ?? "")
                        : "",
                    );
                    setDigSigNumber(
                      "digiSigNumber" in profile
                        ? (profile.digiSigNumber ?? "")
                        : "",
                    );
                    setDigSigDateOfIssue(
                      "digiSigIssueDate" in profile && profile.digiSigIssueDate
                        ? profile.digiSigIssueDate.toISOString().slice(0, 10)
                        : "",
                    );
                    setDigSigExpirationDate(
                      "digiSigExpirationDate" in profile &&
                        profile.digiSigExpirationDate
                        ? profile.digiSigExpirationDate
                            .toISOString()
                            .slice(0, 10)
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
                    setAllergies(
                      "allergies" in profile ? profile.allergies : [],
                    );
                    setMedicalCondition(
                      "medicalConditions" in profile
                        ? profile.medicalConditions
                        : [],
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
                  type={["input", "input"]}
                  value1={weight}
                  setValue1={setWeight}
                  value2={height}
                  setValue2={setHeight}
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

                    const profile =
                      data?.doctorProfile ?? data?.patientProfile!;

                    setImagePreview(data?.image ?? null);
                    setFirstName(profile.firstName);
                    setLastName(profile.lastName);
                    setPhoneNumber(profile.phoneNumber ?? "");
                    setSeries(profile.series ?? "");
                    setCnp(profile.cnp ?? "");
                    setBirthDate(
                      profile.birthDate
                        ? new Date(profile.birthDate)
                        : undefined,
                    );
                    setGender(profile.gender ?? "");
                    setAddress(
                      "address" in profile ? (profile.address ?? "") : "",
                    );
                    setCity("city" in profile ? (profile.city ?? "") : "");
                    setCounty(
                      "county" in profile ? (profile.county ?? "") : "",
                    );
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
                    setSpecialization(
                      "specialization" in profile
                        ? (profile.specialization ?? "")
                        : "",
                    );
                    setSpecializationDateOfIssue(
                      "specializationIssueDate" in profile &&
                        profile.specializationIssueDate
                        ? new Date(profile.specializationIssueDate)
                        : undefined,
                    );
                    setCabinetName(
                      "cabinetName" in profile
                        ? (profile.cabinetName ?? "")
                        : "",
                    );
                    setCabinetPhoneNumber(
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
                      "cabinetCity" in profile
                        ? (profile.cabinetCity ?? "")
                        : "",
                    );
                    setCabinetCounty(
                      "cabinetCounty" in profile
                        ? (profile.cabinetCounty ?? "")
                        : "",
                    );
                    setCabinetZip(
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
                    setCmrDateOfIssue(
                      "cmrIssueDate" in profile && profile.cmrIssueDate
                        ? profile.cmrIssueDate.toISOString().slice(0, 10)
                        : "",
                    );
                    setCmrExpirationDate(
                      "cmrExpirationDate" in profile &&
                        profile.cmrExpirationDate
                        ? profile.cmrExpirationDate.toISOString().slice(0, 10)
                        : "",
                    );
                    setDigSigSeries(
                      "digiSigSeries" in profile
                        ? (profile.digiSigSeries ?? "")
                        : "",
                    );
                    setDigSigNumber(
                      "digiSigNumber" in profile
                        ? (profile.digiSigNumber ?? "")
                        : "",
                    );
                    setDigSigDateOfIssue(
                      "digiSigIssueDate" in profile && profile.digiSigIssueDate
                        ? profile.digiSigIssueDate.toISOString().slice(0, 10)
                        : "",
                    );
                    setDigSigExpirationDate(
                      "digiSigExpirationDate" in profile &&
                        profile.digiSigExpirationDate
                        ? profile.digiSigExpirationDate
                            .toISOString()
                            .slice(0, 10)
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
                    setAllergies(
                      "allergies" in profile ? profile.allergies : [],
                    );
                    setMedicalCondition(
                      "medicalConditions" in profile
                        ? profile.medicalConditions
                        : [],
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
                  value2={spcializationDateOfIssue}
                  setValue2={setSpecializationDateOfIssue}
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
                    value2={cabinetPhoneNumber}
                    setValue2={setCabinetPhoneNumber}
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
                    value2={cabinetZip}
                    setValue2={setCabinetZip}
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
                    value1={cmrDateOfIssue}
                    setValue1={setCmrDateOfIssue}
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
                    value1={digSigSeries}
                    setValue1={setDigSigSeries}
                    value2={digSigNumber}
                    setValue2={setDigSigNumber}
                    type={["input", "input"]}
                    editing={editing}
                  />
                  <InputRow
                    label_name1={"Date of issue"}
                    label_name2={"Expiration date"}
                    inputType1="date"
                    inputType2="date"
                    value1={digSigDateOfIssue}
                    setValue1={setDigSigDateOfIssue}
                    value2={digSigExpirationDate}
                    setValue2={setDigSigExpirationDate}
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
                    label_name2={"Appointment duration"}
                    inputType1="number"
                    type={["input", "select"]}
                    data2={[
                      "15 minutes",
                      "30 minutes",
                      "45 minutes",
                      "60 minutes",
                    ]}
                    value1={apptPrice}
                    setValue1={setApptPrice}
                    value2={apptDuration}
                    setValue2={setApptDuration}
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
