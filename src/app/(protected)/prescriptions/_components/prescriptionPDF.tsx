import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import type { User as UserType } from "~/types/user";

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 12,
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
  },
  header: {
    textAlign: "center",
    marginBottom: 50,
  },
  title: { fontSize: 24, marginBottom: 4 },
  subtitle: { fontSize: 10, color: "gray" },

  body: {
    flexGrow: 1,
    marginBottom: 8,
    gap: 4,
  },
  col: { flexDirection: "column" },
  mr12: { marginRight: 12 },

  footer: {
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 10,
  },
});

type PDFData = {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  quantity: number | string;
  startingDate: string | Date;
  endingDate: string | Date;
  diagnostic: string;
  instructions: string;
  createdAt: string | Date;
  doctor: UserType;
  patient: UserType;
};

const fmtISO = (d: string | Date) => new Date(d).toISOString().slice(0, 10);

export function PrescriptionPDF({ data }: { data: PDFData }) {
  return (
    <Document>
      <Page size="A5" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Medical prescription</Text>
          <Text style={styles.subtitle}>{data.doctor.name}</Text>
        </View>

        <View style={styles.body}>
          <Text>Medication: {data.medicationName}</Text>
          <Text style={styles.mr12}>Dosage: {data.dosage}</Text>
          <Text style={styles.mr12}>Frequency: {data.frequency}</Text>
          <Text>Quantity: {String(data.quantity)}</Text>
          <Text>
            Start: {fmtISO(data.startingDate)} --- End:{" "}
            {fmtISO(data.endingDate)}
          </Text>
          <Text>
            Diagnostics:
            {data.diagnostic}
          </Text>
          <Text>
            Instructions:
            {data.instructions}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>Date: {new Date(data.createdAt).toDateString()}</Text>
          <Text>Doctor signature: __________</Text>
        </View>
      </Page>
    </Document>
  );
}
