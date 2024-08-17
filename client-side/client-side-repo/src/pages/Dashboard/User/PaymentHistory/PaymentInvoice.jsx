import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const PaymentInvoice = () => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });
  const MyDocument = () => (
    <Document>
      <Page  size="A5" style={styles.page}>
        <View style={styles.section}>
          <Text></Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
  return (
    <div className=' w-full'>
      <PDFViewer>
    <MyDocument></MyDocument>
    </PDFViewer>
    </div>
  );
};

export default PaymentInvoice;