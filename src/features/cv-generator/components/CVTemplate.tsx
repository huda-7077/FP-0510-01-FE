import { CVData } from "@/types/cv";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Times-Roman",
    fontSize: 10,
    color: "#333",
  },
  header: {
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    fontFamily: "Times-Bold",
    textAlign: "center",
  },
  contactInfo: {
    fontSize: 10,
    paddingVertical: 5,
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Times-Bold",
    textAlign: "center",
    paddingVertical: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  item: {
    marginTop: 5,
    marginBottom: 5,
  },
  itemFlex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  itemTitle: {
    fontFamily: "Times-Bold",
  },
  itemLeft: {
    textAlign: "left",
  },
  itemDetails: {
    marginLeft: 5,
    textAlign: "justify",
    marginRight: 6,
  },
  itemDetailsFlex: {
    display: "flex",
    flexDirection: "row",
  },
  itemItalic: {
    fontFamily: "Times-Italic",
  },
  textDescription: {
    marginTop: 5,
    textAlign: "justify",
    fontSize: 10,
  },
  dot: {
    marginHorizontal: 2,
  },
});

interface CVTemplateProps extends CVData {}

const CVTemplate = ({
  fullName,
  details,
  aboutMe,
  educations,
  experiences,
  organizations,
  nonFormalEducations,
  certifications,
  skills,
}: CVTemplateProps) => (
  <Document title={fullName + " CV"}>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>- {fullName.toUpperCase()} -</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.contactInfo}>
          {details?.map((detail, index) => (
            <View key={index} style={{ display: "flex", flexDirection: "row" }}>
              {index > 0 && <Text style={styles.dot}>•</Text>}
              <Text style={{ marginRight: 5 }}>{detail}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.textDescription}>{aboutMe}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>EDUCATION</Text>
        <View style={styles.item}>
          {educations.map((education, index) => (
            <View key={index}>
              <View style={styles.itemFlex}>
                <View style={styles.itemLeft}>
                  <Text style={styles.itemTitle}>{education.institution}</Text>
                  <View
                    style={{ display: "flex", flexDirection: "row", gap: 2 }}
                  >
                    <Text style={styles.itemItalic}>{education.degree}</Text>
                    <Text> | GPA: {education.gpa}</Text>
                  </View>
                </View>
                <View style={styles.itemRight}>
                  <Text style={styles.itemTitle}>{education.location}</Text>
                  <Text style={styles.itemTitle}>{education.year}</Text>
                </View>
              </View>
              {education.experiences?.map((experience, index) => (
                <View key={index} style={styles.itemDetailsFlex}>
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.itemDetails}>
                    {experience.details} - {experience.year}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
        <View style={styles.item}>
          {experiences?.map((experience, index) => (
            <View key={index}>
              <View style={styles.itemFlex}>
                <View style={styles.itemLeft}>
                  <Text style={styles.itemTitle}>{experience.company}</Text>
                  <Text style={styles.itemItalic}>{experience.position}</Text>
                </View>
                <View style={styles.itemRight}>
                  <Text style={styles.itemTitle}>{experience.location}</Text>
                  <Text style={styles.itemTitle}>{experience.duration}</Text>
                </View>
              </View>
              {experience.descriptions?.map((description, index) => (
                <View key={index} style={styles.itemDetailsFlex}>
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.itemDetails}>{description.details}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
      {organizations && organizations.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ORGANIZATION</Text>
          <View style={styles.item}>
            {organizations?.map((organization, index) => (
              <View key={index}>
                <View style={styles.itemFlex}>
                  <View style={styles.itemLeft}>
                    <Text style={styles.itemTitle}>{organization.name}</Text>
                    <Text style={styles.itemItalic}>
                      {organization.position}
                    </Text>
                  </View>
                  <View style={styles.itemRight}>
                    <Text style={styles.itemTitle}>
                      {organization.location}
                    </Text>
                    <Text style={styles.itemTitle}>
                      {organization.duration}
                    </Text>
                  </View>
                </View>
                {organization.descriptions?.map((description, index) => (
                  <View key={index} style={styles.itemDetailsFlex}>
                    <Text style={styles.dot}>•</Text>
                    <Text style={styles.itemDetails}>
                      {description.details}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      )}
      {nonFormalEducations && nonFormalEducations.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NON-FORMAL EDUCATION</Text>
          <View style={styles.item}>
            {nonFormalEducations?.map((nonFormalEducation, index) => (
              <View key={index}>
                <View style={styles.itemFlex}>
                  <View style={styles.itemLeft}>
                    <Text style={styles.itemTitle}>
                      {nonFormalEducation.institution}
                    </Text>
                    <Text style={styles.itemItalic}>
                      {nonFormalEducation.position}
                    </Text>
                  </View>
                  <View style={styles.itemRight}>
                    <Text style={styles.itemTitle}>
                      {nonFormalEducation.location}
                    </Text>
                    <Text style={styles.itemTitle}>
                      {nonFormalEducation.duration}
                    </Text>
                  </View>
                </View>
                {nonFormalEducation.descriptions?.map((description, index) => (
                  <View key={index} style={styles.itemDetailsFlex}>
                    <Text style={styles.dot}>•</Text>
                    <Text style={styles.itemDetails}>
                      {description.details}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      )}
      {certifications && certifications.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CERTIFICATION</Text>
          <View style={styles.item}>
            {certifications?.map((certification, index) => (
              <View key={index} style={styles.itemDetailsFlex}>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.itemDetails}>
                  {certification.name}, {certification.nomor},{" "}
                  {certification.year}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SKILLS</Text>
        <View style={styles.item}>
          {skills.map((skill, index) => (
            <View key={index} style={styles.itemDetailsFlex}>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.itemDetails}>{skill.type}:</Text>
              <Text style={styles.itemDetails}>{skill.details}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default CVTemplate;
