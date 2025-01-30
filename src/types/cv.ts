export interface CVData {
  fullName: string;
  details: string[];
  aboutMe: string;
  educations: {
    institution: string;
    degree: string;
    gpa: string;
    location: string;
    year: string;
    experiences: { details: string; year: string }[];
  }[];
  experiences: {
    company: string;
    position: string;
    location: string;
    duration: string;
    descriptions: { details: string }[];
  }[];
  organizations: {
    name: string;
    position: string;
    location: string;
    duration: string;
    descriptions: { details: string }[];
  }[];
  nonFormalEducations: {
    institution: string;
    position: string;
    location: string;
    duration: string;
    descriptions: { details: string }[];
  }[];
  certifications: { name: string; nomor: string; year: string }[];
  skills: {
    type: string;
    details: string;
  }[];
}
