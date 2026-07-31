export type EducationItem = {
  degree: string;
  /** Shown under the degree when the awarded title differs from the common name. */
  concentration?: string;
  school: string;
  period: string;
  logo?: string;
  /** Public, third-party verification of the award. */
  verifyUrl?: string;
  summary: string;
  description: string[];
};

export const education: EducationItem[] = [
  {
    degree: "Master of Science, Data Analytics Engineering",
    concentration:
      "Concentration: Data Modeling/Warehousing and Database Administration",
    school: "George Mason University, College of Engineering and Computing",
    period: "Aug 2023 – May 2025",
    logo: "/logos/gmu-logo.png",
    verifyUrl:
      "https://www.parchment.com/u/award/80d1c1eaef0d1e8220d32069a7f6c5cc",
    summary:
      "A 30-credit multidisciplinary programme combining statistics, computer science and operations research, aimed at the engineering side of analytics rather than reporting.",
    description: [
      "Statistical Methods",
      "Data Mining",
      "Machine Learning",
      "Big Data Analytics",
      "Optimisation & Simulation",
    ],
  },
  {
    degree: "Bachelor of Engineering, Information Technology",
    school: "University of Mumbai, Don Bosco Institute of Technology",
    period: "July 2015 – June 2019",
    logo: "/logos/dbit-logo.png",
    summary:
      "Four-year engineering programme covering the fundamentals I still use daily: databases, operating systems, networks and software engineering.",
    description: [
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
      "Web Technologies",
    ],
  },
];
