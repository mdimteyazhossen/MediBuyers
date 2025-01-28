import React from 'react';
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { flexDirection: 'row', padding: 30 },
  section: { margin: 10, padding: 10 },
});

const SalesReportPDF = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.section}>Sales Report</Text>
      {data.map((sale, index) => (
        <Text key={index} style={styles.section}>
          {sale.medicine} | {sale.seller} | {sale.buyer} | ${sale.totalPrice} | {sale.date}
        </Text>
      ))}
    </Page>
  </Document>
);

export default SalesReportPDF;
