import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

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
    marginBottom: 12,
  },
  title: { fontSize: 16, marginBottom: 4 },
  subtitle: { fontSize: 9, color: "gray" },

  body: {
    flexGrow: 1,
  },
  section: { marginBottom: 8 },
  row: { flexDirection: "row" },
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
  instructions: string;
  createdAt: string | Date;
};

const fmtISO = (d: string | Date) => new Date(d).toISOString().slice(0, 10);

export function PrescriptionPDF({ data }: { data: PDFData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Prescription</Text>
          <Text style={styles.subtitle}>#{data.id}</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.section}>
            <Text>Medication: {data.medicationName}</Text>
            <View style={[styles.row, { marginTop: 4 }]}>
              <Text style={styles.mr12}>Dosage: {data.dosage}</Text>
              <Text style={styles.mr12}>Frequency: {data.frequency}</Text>
              <Text>Quantity: {String(data.quantity)}</Text>
            </View>
            <Text style={{ marginTop: 4 }}>
              Start: {fmtISO(data.startingDate)} | End:{" "}
              {fmtISO(data.endingDate)}
            </Text>
          </View>

          <View style={styles.section}>
            <Text>Instructions:</Text>
            <Text>{data.instructions}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Date: {new Date(data.createdAt).toDateString()}</Text>
          <Text>Doctor signature: __________</Text>
        </View>
      </Page>
    </Document>
  );
}
