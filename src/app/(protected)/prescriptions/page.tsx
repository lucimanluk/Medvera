"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import PopoverFilterModal from "./_components/popoverFilterModal";
import { Input } from "~/components/ui/input";
import { useState, useMemo } from "react";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Loader2, FilePlus } from "lucide-react";
import PrescriptionCard from "./_components/prescriptionCard";
import { toast } from "sonner";

const appointment_types = ["Live and video", "Video", "Live"];

export default function Prescriptions() {
  const {
    data: prescriptionsResponse,
    isLoading: isPrescriptionsLoading,
    error: prescriptionsError,
  } = api.prescription.getPrescriptions.useQuery();
  const {
    data: connectionResponse,
    isLoading: isConnectionLoading,
    error: connectionError,
  } = api.connection.getConnections.useQuery();

  const prescriptions = prescriptionsResponse?.data ?? [];
  const user = prescriptionsResponse?.user;
  const connectionData = connectionResponse?.data ?? [];

  const utils = api.useUtils();
  const createPrescription = api.prescription.createPrescription.useMutation({
    onSuccess: () => {
      toast("Successfully created prescription!");
      setVal("");
      setStartingDate(null);
      setEndingDate(null);
      setDosage("");
      setFrequency("");
      setInstructions("");
      setMedicationName("");
      setQuantity("");
      utils.prescription.getPrescriptions.invalidate();
      utils.prescription.getDashboardPrescriptions.invalidate();
    },
    onError: () => toast.error("Error creating prescription"),
    onMutate() {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const [startingDate, setStartingDate] = useState<Date | null>(null);
  const [endingDate, setEndingDate] = useState<Date | null>(null);
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [instructions, setInstructions] = useState("");
  const [medicationName, setMedicationName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [op, setOp] = useState(false);
  const [val, setVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayTime = todayStart.getTime();

  const filteredSearch = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return prescriptions;
    return prescriptions.filter(
      (prescription) =>
        prescription.medicationName.toLowerCase().includes(term) ||
        prescription.dosage.toLowerCase().includes(term),
    );
  }, [prescriptions, search]);

  if (isPrescriptionsLoading || isConnectionLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 size={16} className="animate-spin" />
      </div>
    );
  }
  if (prescriptionsError || connectionError) {
    return null;
  }

  return (
    <div className="flex w-full flex-col gap-4 py-4 pr-4">
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-bold">Prescriptions</span>
        <span className="text-base text-gray-400">See your prescriptions</span>
      </div>

      <Tabs defaultValue="ongoing" className="w-full">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger
              value="ongoing"
              onClick={() => {
                setSearch("");
              }}
            >
              Ongoing
            </TabsTrigger>
            <TabsTrigger
              value="past"
              onClick={() => {
                setSearch("");
              }}
            >
              Past
            </TabsTrigger>
          </TabsList>
          {user?.doctor && (
            <Dialog
              onOpenChange={() => {
                setOp(false);
                setVal("");
                setStartingDate(null);
                setEndingDate(null);
                setDosage("");
                setFrequency("");
                setInstructions("");
                setMedicationName("");
                setQuantity("");
              }}
            >
              <DialogTrigger asChild>
                <Button
                  className="bg-[#2F80ED] text-white hover:bg-[#1366d6]"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : null}
                  <FilePlus />
                  New prescription
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form
                  className="flex flex-col gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (
                      !val ||
                      !startingDate ||
                      !endingDate ||
                      !dosage ||
                      !frequency ||
                      !instructions ||
                      !medicationName ||
                      !quantity
                    ) {
                      toast.error("Please fill in all fields");
                      return;
                    }
                    const patientConn = connectionData.find(
                      (d) => d.patient.name === val,
                    );
                    if (!patientConn) {
                      toast.error("Selected patient not found");
                      return;
                    }
                    createPrescription.mutate({
                      patientId: patientConn.patient.id,
                      startingDate,
                      endingDate,
                      dosage,
                      frequency,
                      instructions,
                      medicationName,
                      quantity,
                    });
                  }}
                >
                  <DialogHeader>
                    <DialogTitle>Create prescription</DialogTitle>
                    <DialogDescription>
                      Create prescriptions for patients you're connected to.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <Label>Patient name</Label>
                      <PopoverFilterModal
                        open={op}
                        setOpen={setOp}
                        value={val}
                        setValue={setVal}
                        data={connectionData}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Medication</Label>
                      <Input
                        placeholder="Eg: paracetamol"
                        value={medicationName}
                        onChange={(e) => setMedicationName(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex flex-col gap-2">
                        <Label>Dosage</Label>
                        <Input
                          placeholder="Eg: 10mg"
                          value={dosage}
                          onChange={(e) => setDosage(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label>Frequency</Label>
                        <Input
                          placeholder="Eg: thrice a day"
                          value={frequency}
                          onChange={(e) => setFrequency(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label>Quantity</Label>
                        <Input
                          placeholder="Eg: one tablet"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex w-1/2 flex-col gap-2">
                        <Label>Starting date</Label>
                        <Input
                          type="date"
                          value={startingDate?.toISOString().slice(0, 10) ?? ""}
                          onChange={(e) =>
                            setStartingDate(
                              e.target.value ? new Date(e.target.value) : null,
                            )
                          }
                        />
                      </div>
                      <div className="flex w-1/2 flex-col gap-2">
                        <Label>Ending date</Label>
                        <Input
                          type="date"
                          value={endingDate?.toISOString().slice(0, 10) ?? ""}
                          onChange={(e) =>
                            setEndingDate(
                              e.target.value ? new Date(e.target.value) : null,
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Instructions</Label>
                      <Textarea
                        placeholder="Instructions for the patient..."
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter className="flex flex-row items-center">
                    {loading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : null}
                    <DialogClose asChild>
                      <Button variant="outline" disabled={loading}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      className="bg-[#2F80ED] text-white hover:bg-[#1366d6]"
                      disabled={loading}
                    >
                      Create prescription
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Search for a prescription..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <TabsContent value="ongoing">
          {filteredSearch
            .filter(
              (prescription) => prescription.endingDate.getTime() >= todayTime,
            )
            .map((prescription, index) => (
              <div className="mb-2" key={index}>
                <PrescriptionCard
                  props={prescription}
                  user={user!}
                  type="ongoing"
                />
              </div>
            ))}
        </TabsContent>
        <TabsContent value="past">
          {filteredSearch
            .filter(
              (prescription) => prescription.endingDate.getTime() < todayTime,
            )
            .map((prescription, index) => (
              <div className="mb-2" key={index}>
                <PrescriptionCard
                  props={prescription}
                  user={user!}
                  type="past"
                />
              </div>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
