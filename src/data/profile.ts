// Single source of truth for everything on the site, the /api/profile endpoint
// and the AI assistant's knowledge. Edit here and every surface updates.

export type Link = { label: string; href: string };

export type Experience = {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
};

export type ProjectCategory = "product" | "enterprise";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  period?: string;
  category: ProjectCategory;
  featured?: boolean;
  url?: string;
  urlLabel?: string;
  stack: string[];
  highlights: string[];
  metrics?: { value: string; label: string }[];
};

export const profile = {
  name: "Ishika Bhatnagar",
  firstName: "Ishika",
  initials: "IB",
  role: "QA Automation Engineer",
  headline: "I build test automation that lets teams release fast and with confidence.",
  location: "Bangalore, India",
  timezone: "Asia/Kolkata",
  email: "ishikabhatnagar7307@gmail.com",
  available: true,
  socials: {
    github: "https://github.com/captainishika",
    linkedin: "https://www.linkedin.com/in/ishika-bhatnagar-5548773a4" as string,
  },
  summary:
    "QA Automation Engineer with 4+ years of experience delivering high-quality software across Agile environments. Specialist in building robust, scalable test automation frameworks using Playwright, Node.js, and TypeScript/JavaScript. Proven expertise in creating Jenkins CI/CD pipelines, REST API testing, and validating complex ETL workflows. Adept in TDD/BDD methodologies, with hands-on experience utilizing AWS, Docker, and performance testing techniques to accelerate release cycles and ensure continuous testing.",
  about: [
    "I'm a QA automation engineer who likes finding bugs long before users do, and building the automation that keeps finding them on every release.",
    "At XORLABS I build BDD test suites with Playwright, Cucumber and Node.js, run them in Jenkins pipelines with Docker, and test the GoodieBag loyalty platform end to end. Before that, at Sun System Infotech, I moved legacy testing to a Playwright + TypeScript framework and validated ETL pipelines for financial and healthcare platforms.",
    "I care about clear acceptance criteria, fast and stable test suites, and data you can trust, from the UI and REST APIs down to the SQL underneath.",
  ],
  roles: [
    "QA Automation Engineer",
    "Playwright · TypeScript",
    "Cucumber · BDD",
    "REST API testing",
    "Jenkins CI/CD",
    "ETL & SQL validation",
  ],
  stats: [
    { value: 4, suffix: "+", label: "Years in QA", decimals: 0 },
    { value: 80, suffix: "%+", label: "Critical journeys automated", decimals: 0 },
    { value: 150, suffix: "+", label: "Bugs caught & logged", decimals: 0 },
    { value: 45, suffix: "%", label: "Less manual testing", decimals: 0 },
  ],
} as const;

export const experience: Experience[] = [
  {
    role: "QA Automation Engineer",
    company: "XORLABS",
    location: "Greater Noida, IN",
    start: "Sep 2024",
    end: "Present",
    current: true,
    summary:
      "Owning BDD test automation and the Jenkins pipelines that run it, so every release is tested before production.",
    highlights: [
      "Spearheaded the design and implementation of an automated BDD test suite using Playwright, Cucumber, and Node.js, achieving 80%+ coverage of critical user journeys.",
      "Created and managed Jenkins pipelines for continuous deployment, integrating automated tests and Docker containers to ensure continuous testing before production releases.",
      "Collaborated with cross-functional Agile teams to automate end-to-end system functionality and data flows, ensuring zero critical bugs in 15 sprint releases.",
      "Executed comprehensive REST API test suites and conducted performance testing to identify and resolve system bottlenecks, improving overall application scalability.",
      "Maintained deep alignment with Behavior-Driven Development (BDD) methodologies, defining acceptance criteria and executing seamless cross-browser testing.",
    ],
    stack: ["Playwright", "Cucumber", "Node.js", "Jenkins", "Docker", "REST APIs", "BDD"],
  },
  {
    role: "Quality Engineer",
    company: "Sun System Infotech Pvt Ltd",
    location: "Noida, IN",
    start: "Jul 2022",
    end: "Aug 2024",
    summary:
      "Modernised test automation and validated data end to end across financial and healthcare platforms.",
    highlights: [
      "Transitioned legacy testing processes to a Playwright and TypeScript framework, reducing manual testing effort by 45% and accelerating Agile delivery.",
      "Validated end-to-end ETL pipelines, ensuring data integrity and accuracy through complex SQL validations across multi-module financial and healthcare platforms.",
      "Executed end-to-end testing and debugging of cloud workflows and services hosted on AWS, ensuring high availability and seamless data integration.",
      "Led regression, smoke, and integration testing across 10+ software releases, maintaining a defect leakage rate below 5% for enterprise applications serving 10,000+ users.",
      "Detected and documented 150+ bugs using JIRA, proactively solving problems and optimizing the overall testing process within strict sprint deadlines.",
    ],
    stack: ["Playwright", "TypeScript", "SQL", "ETL", "AWS", "JIRA"],
  },
  {
    role: "QA Intern",
    company: "Sun System Infotech Pvt Ltd",
    location: "Noida, IN",
    start: "Jan 2022",
    end: "Jun 2022",
    summary: "Learned the craft alongside senior QA engineers across manual, automated and API testing.",
    highlights: [
      "Assisted senior QA engineers in manual and automated testing of web modules, executing 100+ test cases across functional and regression cycles within an Agile framework.",
      "Gained hands-on experience in defect lifecycle management and foundational API testing using Postman.",
    ],
    stack: ["Manual testing", "Regression", "Postman", "Agile"],
  },
];

export const projects: Project[] = [
  {
    slug: "goodiebag",
    name: "GoodieBag",
    tagline: "Loyalty & rewards platform · XORLABS",
    period: "Sep 2024 — Present",
    category: "product",
    featured: true,
    stack: ["Playwright", "Cucumber", "Node.js", "BDD"],
    highlights: [
      "Built comprehensive end-to-end automated test coverage using Playwright, Node.js, and Cucumber, validating flows for user registration, offer management, and reward redemptions.",
    ],
    metrics: [
      { value: "3", label: "core flows covered" },
      { value: "BDD", label: "Cucumber specs" },
      { value: "E2E", label: "Playwright" },
    ],
  },
  {
    slug: "axapdf",
    name: "AxaPDF",
    tagline: "PDF tools & translation platform",
    category: "product",
    featured: true,
    url: "https://axapdf.com",
    urlLabel: "axapdf.com",
    stack: ["Playwright", "Jenkins", "CI/CD"],
    highlights: [
      "Utilized Playwright to automate and validate the web application's core workflows, integrating the test suite into Jenkins CI/CD pipelines for continuous deployment validation.",
    ],
    metrics: [
      { value: "Playwright", label: "core workflows" },
      { value: "Jenkins", label: "CI/CD gate" },
      { value: "Every deploy", label: "validated" },
    ],
  },
  {
    slug: "healthcare-tax",
    name: "Health Care Information System & Tax Admin",
    tagline: "Enterprise platforms · Sun System Infotech",
    period: "2022 — 2024",
    category: "enterprise",
    stack: ["E2E testing", "ETL testing", "SQL"],
    highlights: [
      "Designed E2E test scenarios to ensure data accuracy across multi-module healthcare environments, executing rigorous ETL and SQL database testing for 500+ clients.",
    ],
  },
  {
    slug: "nonrix",
    name: "NonriX",
    tagline: "AI-powered productivity app",
    category: "product",
    url: "https://staging.nonrix.ai",
    urlLabel: "staging.nonrix.ai",
    stack: ["Google OAuth", "REST APIs", "AWS", "Performance testing"],
    highlights: [
      "Validated Google OAuth flows, REST APIs, and backend cloud workflows on AWS. Executed performance tests to ensure low latency for real-time video processing pipelines.",
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Testing",
    items: [
      "E2E Automation",
      "REST API Testing",
      "ETL Testing",
      "Performance Testing",
      "Regression",
      "Smoke",
      "Integration",
      "Cross-browser",
    ],
  },
  { group: "Automation", items: ["Playwright", "Cucumber", "Node.js"] },
  { group: "CI/CD & Cloud", items: ["Jenkins", "Docker", "AWS"] },
  { group: "Languages", items: ["TypeScript", "JavaScript", "SQL", "Java"] },
  { group: "Methodologies", items: ["Agile", "TDD", "BDD", "CI/CD", "SDLC"] },
  { group: "Tools", items: ["Postman", "JIRA"] },
];

export const education: { degree: string; school: string; year: string }[] = [
  { degree: "Master of Computer Applications (MCA)", school: "IGNOU, Delhi", year: "2025" },
  { degree: "Bachelor of Science (B.Sc)", school: "Ch Charan Singh University (CCSU), Meerut", year: "2022" },
  { degree: "12th Grade", school: "CBSE", year: "2019" },
  { degree: "10th Grade", school: "CBSE", year: "2017" },
];

export const marquee = [
  "Playwright",
  "Cucumber",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Jenkins",
  "Docker",
  "AWS",
  "REST APIs",
  "Postman",
  "SQL",
  "ETL Testing",
  "Performance Testing",
  "BDD",
  "TDD",
  "JIRA",
  "Java",
  "Agile",
];
