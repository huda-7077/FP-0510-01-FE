"use client";
import { CertificateData } from "@/types/certificate";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import QRCode from "qrcode";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: "30px 24px",
  },
  container: {
    width: "100%",
    height: "100%",
    border: "1.5pt solid #9CA3AF",
    padding: 40,
    position: "relative",
  },
  badgeImage: {
    position: "absolute",
    left: 48,
    top: 40,
    width: 60,
    height: 60,
  },
  logoImage: {
    position: "absolute",
    right: 48,
    top: 40,
    width: 120,
  },
  contentContainer: {
    margin: "auto",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    fontFamily: "Helvetica-Bold",
  },
  subtitle: {
    fontSize: 12,
    color: "#4B5563",
    marginBottom: 14,
  },
  fullName: {
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    marginBottom: 14,
  },
  subtitleName: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 24,
    marginBottom: 12,
  },
  dateSection: {
    borderTopWidth: 1,
    borderColor: "#D1D5DB",
    paddingTop: 8,
    alignItems: "center",
    width: 500,
  },
  dateLabel: {
    fontSize: 10,
    color: "#4B5563",
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: "medium",
  },
  bottomSection: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
  },
  qrCodeContainer: {
    position: "absolute",
    left: 8,
    bottom: 8,
  },
  verificationText: {
    position: "absolute",
    alignItems: "center",
    textAlign: "center",
    left: 0,
    right: 0,
    top: 14,
    fontSize: 10,
    color: "#4B5563",
  },
  signatureSection: {
    position: "absolute",
    right: 0,
    bottom: 0,
    alignItems: "center",
  },
  signatureImage: {
    width: 120,
    marginBottom: 8,
  },
  signatureName: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  signatureRole: {
    fontSize: 10,
    color: "#6B7280",
  },
});

const CertificateTemplate: React.FC<CertificateData> = ({
  fullName,
  title,
  badgeImage,
  createdAt,
  certificateUrl,
}) => {
  const [qrData, setQrData] = useState<string>("");

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const url = await QRCode.toDataURL(certificateUrl);
        setQrData(url);
      } catch (err) {
        console.error("Error generating QR code", err);
      }
    };

    generateQRCode();
  }, []);

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.container}>
          <Image src={badgeImage} style={styles.badgeImage} />
          <Image src="/logo.png" style={styles.logoImage} />
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Certificate of Completion</Text>
            <Text style={styles.subtitle}>
              This certificate is proudly presented to
            </Text>
            <Text style={styles.fullName}>{fullName}</Text>
            <Text style={styles.subtitleName}>for successfully completing</Text>
            <Text style={styles.courseTitle}>{title}</Text>
            <View style={styles.dateSection}>
              <Text style={styles.dateLabel}>Date of Completion</Text>
              <Text style={styles.dateValue}>
                {format(new Date(createdAt), "dd MMMM yyyy")}
              </Text>
            </View>
          </View>
          <View style={styles.bottomSection}>
            <View style={styles.qrCodeContainer}>
              {qrData && (
                <Image src={qrData} style={{ width: 80, height: 80 }} />
              )}
            </View>
            <Text style={styles.verificationText}>
              Certificate verification at {certificateUrl}
            </Text>
            <View style={styles.signatureSection}>
              <Image
                src="/static/huda-signature.png"
                style={styles.signatureImage}
              />
              <Text style={styles.signatureName}>Muhammad Masyhuda</Text>
              <Text style={styles.signatureRole}>Developer of Supajob</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CertificateTemplate;
