import { 
  Faculty, 
  Programme, 
  Course, 
  BoardMember, 
  AffiliationRecord, 
  NewsArticle, 
  UniversityEvent, 
  UniversityDocument, 
  GalleryItem,
  Student,
  AcademicResult,
  InternalCertificate,
  AdmissionApplication
} from '../types';

export const UNIVERSITY_INFO = {
  name: "Harvester's Theological University",
  shortName: "HATHUN",
  tagline: "WE ARE A SURE GUIDE TO YOUR DREAM",
  description: "Harvester's Theological University is a theological university that handles the affairs of church education and provides theological education from Certificate to PhD level.",
  lawDescription: "The institution also offers Law from Diploma to PhD and provides specialized programmes across multiple academic disciplines.",
  headOffice: {
    title: "INTERNATIONAL HEAD OFFICE",
    addressLine1: "Former Police Control, Ambam-yat",
    city: "Ambam",
    region: "South Region",
    country: "Cameroon",
    formattedAddress: "Former Police Control, Ambam-yat, Ambam, South Region, Cameroon",
    email: "admissions@hathun.edu",
    supportEmail: "info@hathun.edu",
    phone: "+237 672 929 067",
    whatsapp: "+237672929067",
    whatsappUrl: "https://wa.me/237672929067",
    officeHours: "Monday – Friday: 8:00 AM – 5:00 PM (WAT)"
  },
  paymentNotice: "Please contact the University Admissions Office for payment instructions. All tuition and registration fees are processed strictly through official university-designated institutional accounts. The university website does not collect online card or gateway payments."
};

export const ACADEMIC_LEVELS_INFO = [
  {
    level: "Certificate",
    duration: "Information coming soon",
    registrationFee: "Contact Admissions Office",
    schoolFees: "Very Affordable",
    summary: "Foundational theological and vocational certificates tailored for church workers, ministers, and Christian educators seeking structured initial grounding."
  },
  {
    level: "Diploma",
    duration: "2 Years",
    registrationFee: "$50",
    schoolFees: "Very Affordable",
    summary: "Comprehensive two-year diploma courses providing rigorous theoretical and practical preparation across Theology, Law, and multidisciplinary branches."
  },
  {
    level: "Bachelor",
    duration: "2 Years",
    registrationFee: "$100",
    schoolFees: "Very Affordable",
    summary: "Undergraduate degree curricula designed to equip students with profound intellectual breadth, ministry leadership, and academic discipline."
  },
  {
    level: "Master’s",
    duration: "1 Year",
    registrationFee: "$150",
    schoolFees: "Very Affordable",
    summary: "Advanced postgraduate scholarship focused on specialized theological inquiry, legal mastery, public leadership, and high-level church administration."
  },
  {
    level: "PhD",
    duration: "3 Years",
    registrationFee: "$200",
    schoolFees: "Very Affordable",
    summary: "Doctoral research level programmes training high-caliber scholars, theologians, jurists, and executive educators capable of original academic contribution."
  },
  {
    level: "Honorary Doctorate",
    duration: "Conferred on Merit",
    registrationFee: "By Nomination / Assessment",
    schoolFees: "Not Applicable",
    summary: "Conferred by Harvester’s Theological University to candidates considered deserving based on their life performance, exemplary public service, and love for education and continuous learning."
  }
];

export const INITIAL_FACULTIES: Faculty[] = [
  {
    id: "fac-theology",
    name: "FACULTY OF THEOLOGY",
    slug: "faculty-of-theology",
    description: "The Faculty of Theology provides theological education designed to deepen biblical understanding, Christian leadership, ministry knowledge and theological scholarship from Certificate to PhD level.",
    iconName: "BookOpen",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
    programmesCount: 6,
    availableProgrammes: [
      "Church Administration",
      "Missiology",
      "Divinity",
      "Christian Education",
      "Biblical Studies",
      "Theological Leadership & Ministry"
    ]
  },
  {
    id: "fac-law",
    name: "FACULTY OF LAW",
    slug: "faculty-of-law",
    description: "Harvester's Theological University offers Law from Diploma to PhD level, instilling jurisprudence, legal ethics, ecclesiastical law, and constitutional principles.",
    iconName: "Scale",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
    programmesCount: 4,
    availableProgrammes: [
      "Diploma in Law",
      "Bachelor of Laws (LL.B)",
      "Master of Laws (LL.M)",
      "Doctor of Philosophy in Law (PhD)"
    ]
  },
  {
    id: "fac-pub-admin",
    name: "FACULTY OF PUBLIC ADMINISTRATION",
    slug: "faculty-of-public-administration",
    description: "Equipping public servants, church administrators, and organizational stewards with governance, policy analysis, and institutional leadership capabilities.",
    iconName: "Landmark",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    programmesCount: 3,
    availableProgrammes: [
      "Public Sector Governance",
      "Institutional Policy & Administration",
      "Public Leadership & Ethics"
    ]
  },
  {
    id: "fac-biz-mgmt",
    name: "FACULTY OF BUSINESS MANAGEMENT AND MARKETING",
    slug: "faculty-of-business-management-and-marketing",
    description: "Developing ethical executives, enterprise leaders, and marketing strategists committed to financial integrity and sustainable organizational growth.",
    iconName: "Briefcase",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    programmesCount: 4,
    availableProgrammes: [
      "Business Management & Leadership",
      "Strategic Marketing & Brand Management",
      "Enterprise & Non-Profit Finance",
      "Organizational Management"
    ]
  },
  {
    id: "fac-agric",
    name: "FACULTY OF AGRICULTURE",
    slug: "faculty-of-agriculture",
    description: "Promoting food security, agrarian stewardship, and modern sustainable agribusiness management grounded in practical and ecological excellence.",
    iconName: "Sprout",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
    programmesCount: 3,
    availableProgrammes: [
      "Agribusiness Management",
      "Sustainable Crop Production",
      "Agricultural Extension & Community Development"
    ]
  },
  {
    id: "fac-med-sci",
    name: "FACULTY OF MEDICAL SCIENCE & MEDICINE",
    slug: "faculty-of-medical-science-and-medicine",
    description: "Advancing health education, community wellness, healthcare leadership, and medical sciences with an emphasis on compassionate service.",
    iconName: "HeartPulse",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    programmesCount: 3,
    availableProgrammes: [
      "Community Health Science",
      "Healthcare Administration",
      "Medical Support Sciences"
    ]
  },
  {
    id: "fac-arts-culture",
    name: "FACULTY OF ARTS AND CULTURE",
    slug: "faculty-of-arts-and-culture",
    description: "Celebrating heritage, linguistic studies, humanities, religious arts, and intercultural understanding across African and global contexts.",
    iconName: "Palette",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80",
    programmesCount: 3,
    availableProgrammes: [
      "Cultural Studies & Heritage",
      "Religious Arts & Musicology",
      "Humanities & Social Thought"
    ]
  },
  {
    id: "fac-pol-sci",
    name: "FACULTY OF POLITICAL SCIENCE",
    slug: "faculty-of-political-science",
    description: "Investigating international relations, statecraft, peace studies, and civic leadership rooted in justice, democracy, and ethical statesmanship.",
    iconName: "Globe",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
    programmesCount: 3,
    availableProgrammes: [
      "International Relations & Diplomacy",
      "Peace & Conflict Studies",
      "Political Theory & Governance"
    ]
  },
  {
    id: "fac-pub-comm",
    name: "FACULTY OF PUBLIC COMMUNICATION",
    slug: "faculty-of-public-communication",
    description: "Training journalists, public relations officers, digital media practitioners, and religious communicators for impactful global discourse.",
    iconName: "Radio",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
    programmesCount: 3,
    availableProgrammes: [
      "Mass Communication & Media",
      "Public Relations & Institutional Messaging",
      "Christian Digital Media & Broadcasting"
    ]
  }
];

export const INITIAL_PROGRAMMES: Programme[] = [
  // Theology
  {
    id: "prog-theo-biblical",
    name: "Biblical Studies",
    facultyId: "fac-theology",
    facultyName: "FACULTY OF THEOLOGY",
    level: "Bachelor",
    duration: "2 Years",
    registrationFee: "$100",
    tuitionFeeNote: "Very Affordable",
    description: "In-depth study of Old and New Testament hermeneutics, original biblical contexts, exegesis, and sound theological interpretation.",
    entryRequirements: "Diploma in Theology or equivalent academic qualification; passion for sacred scripture and ministerial service.",
    curriculumHighlights: ["Old Testament Exegesis", "New Testament Epistles", "Biblical Hermeneutics", "Systematic Theology"],
    careerOpportunities: ["Pastor / Minister", "Bible College Lecturer", "Christian Education Director", "Chaplain"]
  },
  {
    id: "prog-theo-divinity-m",
    name: "Divinity",
    facultyId: "fac-theology",
    facultyName: "FACULTY OF THEOLOGY",
    level: "Master’s",
    duration: "1 Year",
    registrationFee: "$150",
    tuitionFeeNote: "Very Affordable",
    description: "Advanced pastoral preparation in doctrinal studies, pastoral counselling, homiletics, and apologetics for senior Christian leadership.",
    entryRequirements: "Bachelor’s degree in Theology, Divinity, or related humanities field from a recognized institution.",
    curriculumHighlights: ["Advanced Homiletics", "Historical Dogmatics", "Pastoral Care & Ethics", "Theological Research Methods"],
    careerOpportunities: ["Senior Clergy", "Theological Seminary Dean", "Institutional Chaplain", "Denominational Executive"]
  },
  {
    id: "prog-theo-church-admin-dip",
    name: "Church Administration",
    facultyId: "fac-theology",
    facultyName: "FACULTY OF THEOLOGY",
    level: "Diploma",
    duration: "2 Years",
    registrationFee: "$50",
    tuitionFeeNote: "Very Affordable",
    description: "Operational, financial, and procedural management for local churches, mission agencies, and Christian non-profit organizations.",
    entryRequirements: "Secondary school certificate or relevant church worker experience.",
    curriculumHighlights: ["Ecclesiastical Governance", "Church Financial Accounting", "Ministry Logistics", "Legal Foundations of Ministries"],
    careerOpportunities: ["Church Administrator", "Mission Coordinator", "Parish Secretary", "NGO Project Officer"]
  },
  {
    id: "prog-theo-missiology-phd",
    name: "Missiology",
    facultyId: "fac-theology",
    facultyName: "FACULTY OF THEOLOGY",
    level: "PhD",
    duration: "3 Years",
    registrationFee: "$200",
    tuitionFeeNote: "Very Affordable",
    description: "Doctoral research into cross-cultural missions, church planting strategies, intercultural theology, and contemporary global missiology.",
    entryRequirements: "Master’s degree in Theology, Missiology, or related discipline with a vetted research proposal.",
    curriculumHighlights: ["Global Mission History", "Cross-Cultural Communication", "Doctoral Dissertation Research", "Ecclesiological Contexts"],
    careerOpportunities: ["Professor of Missiology", "Global Missions Director", "Consultant to Denominations", "Academic Researcher"]
  },
  {
    id: "prog-theo-christian-edu-cert",
    name: "Christian Education",
    facultyId: "fac-theology",
    facultyName: "FACULTY OF THEOLOGY",
    level: "Certificate",
    duration: "Information coming soon",
    registrationFee: "Contact Admissions Office",
    tuitionFeeNote: "Very Affordable",
    description: "Foundational training in Sunday school administration, discipleship curriculum development, and youth ministry pedagogy.",
    entryRequirements: "Open to church teachers, children's ministry workers, and aspiring educators.",
    curriculumHighlights: ["Principles of Discipleship", "Curriculum for Christian Schools", "Spiritual Formation"],
    careerOpportunities: ["Sunday School Superintendent", "Christian School Teacher", "Youth Ministry Leader"]
  },
  // Law
  {
    id: "prog-law-diploma",
    name: "Diploma in Law",
    facultyId: "fac-law",
    facultyName: "FACULTY OF LAW",
    level: "Diploma",
    duration: "2 Years",
    registrationFee: "$50",
    tuitionFeeNote: "Very Affordable",
    description: "Comprehensive foundational legal studies covering legal systems, contract law, administrative principles, and human rights.",
    entryRequirements: "Secondary school certificate with credits in English and Social Sciences.",
    curriculumHighlights: ["Introduction to Legal Method", "Constitutional Law", "Law of Contract", "Torts & Civil Wrongs"],
    careerOpportunities: ["Paralegal Assistant", "Legal Clerk", "Court Liaison", "Compliance Support Officer"]
  },
  {
    id: "prog-law-llb",
    name: "Bachelor of Laws (LL.B)",
    facultyId: "fac-law",
    facultyName: "FACULTY OF LAW",
    level: "Bachelor",
    duration: "2 Years",
    registrationFee: "$100",
    tuitionFeeNote: "Very Affordable",
    description: "Rigorous academic study of substantive law, jurisprudence, international law, commercial arbitration, and legal ethics.",
    entryRequirements: "Recognized Diploma in Law, Associate Degree, or qualifying collegiate foundation.",
    curriculumHighlights: ["Criminal Law & Procedure", "Commercial Law", "Jurisprudence", "International Human Rights Law"],
    careerOpportunities: ["Legal Counsel", "Corporate Legal Advisor", "Policy Analyst", "Judicial Officer Support"]
  },
  {
    id: "prog-law-phd",
    name: "Doctor of Philosophy in Law (PhD)",
    facultyId: "fac-law",
    facultyName: "FACULTY OF LAW",
    level: "PhD",
    duration: "3 Years",
    registrationFee: "$200",
    tuitionFeeNote: "Very Affordable",
    description: "Doctoral research level legal scholarship providing high-level analytical investigation into specialized areas of comparative law and jurisprudence.",
    entryRequirements: "Master of Laws (LL.M) or equivalent postgraduate legal qualification.",
    curriculumHighlights: ["Advanced Legal Theory", "Comparative Jurisprudence", "Doctoral Legal Thesis"],
    careerOpportunities: ["University Law Professor", "Senior Legal Consultant", "International Arbitrator"]
  },
  // Public Administration
  {
    id: "prog-pub-admin-bach",
    name: "Public Sector Governance & Administration",
    facultyId: "fac-pub-admin",
    facultyName: "FACULTY OF PUBLIC ADMINISTRATION",
    level: "Bachelor",
    duration: "2 Years",
    registrationFee: "$100",
    tuitionFeeNote: "Very Affordable",
    description: "Prepares visionary administrators for civil services, local government councils, and multilateral development agencies.",
    entryRequirements: "Diploma in Public Administration or relevant educational credentials.",
    curriculumHighlights: ["Public Policy Formulation", "Administrative Law", "Civil Service Ethics", "Local Governance Systems"],
    careerOpportunities: ["Public Administrator", "Policy Officer", "Local Government Executive", "Administrative Secretary"]
  },
  // Business
  {
    id: "prog-biz-mgmt-master",
    name: "Business Management & Marketing",
    facultyId: "fac-biz-mgmt",
    facultyName: "FACULTY OF BUSINESS MANAGEMENT AND MARKETING",
    level: "Master’s",
    duration: "1 Year",
    registrationFee: "$150",
    tuitionFeeNote: "Very Affordable",
    description: "Executive postgraduate mastery in strategic marketing, corporate leadership, entrepreneurial ventures, and enterprise governance.",
    entryRequirements: "Bachelor’s degree in Business, Economics, Marketing, or related field.",
    curriculumHighlights: ["Strategic Corporate Planning", "Global Marketing Strategy", "Financial Stewardship", "Organizational Leadership"],
    careerOpportunities: ["Managing Director", "Chief Marketing Officer", "Business Consultant", "Executive Strategist"]
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: "crs-th-101",
    code: "TH-BIB-201",
    title: "Old Testament Exegesis & Theology",
    facultyId: "fac-theology",
    level: "Bachelor",
    credits: 3,
    semester: "Semester 1",
    lecturerName: "Bishop Dr Achine Divine Fru",
    description: "Comprehensive historical, linguistic, and canonical study of the Pentateuch, Historical Books, and Prophetic Literature."
  },
  {
    id: "crs-th-102",
    code: "TH-ADM-202",
    title: "Ecclesiastical Administration & Church Governance",
    facultyId: "fac-theology",
    level: "Diploma",
    credits: 3,
    semester: "Semester 1",
    lecturerName: "Bishop Mrs Azor Loveline Ashia",
    description: "Operational frameworks, financial stewardship, secretarial procedures, and statutory compliance for religious bodies."
  },
  {
    id: "crs-th-103",
    code: "TH-MIS-301",
    title: "Cross-Cultural Missiology & Church Planting",
    facultyId: "fac-theology",
    level: "Bachelor",
    credits: 3,
    semester: "Semester 2",
    lecturerName: "HIS ROYAL EMINENCE ARCHBISHOP AMB PROF. KING AZOR JOHN ELIJAH PhDs",
    description: "Theological principles and strategic paradigms for trans-cultural evangelism, community transformation, and indigenous church planting."
  },
  {
    id: "crs-law-101",
    code: "LAW-JUR-201",
    title: "Foundations of Jurisprudence & Legal Ethics",
    facultyId: "fac-law",
    level: "Bachelor",
    credits: 4,
    semester: "Semester 1",
    lecturerName: "Senior Faculty Fellow",
    description: "Critical analysis of natural law, positivism, legal reasoning, and the professional code of conduct for legal practitioners."
  }
];

export const INITIAL_BOARD_MEMBERS: BoardMember[] = [
  {
    id: "bm-1",
    name: "HIS ROYAL EMINENCE ARCHBISHOP AMB PROF. KING AZOR JOHN ELIJAH PhDs",
    title: "Founder and Global Chancellor",
    position: "Founder and Global Chancellor",
    country: "Cameroon / International",
    photoUrl: "/chancellor.jpg",
    biography: "Distinguished prelate, theologian, and global visionary committed to advancing theological scholarship, church education, and university-level leadership across Africa and worldwide.",
    displayOrder: 1
  },
  {
    id: "bm-2",
    name: "Bishop Mrs Azor Loveline Ashia",
    title: "Registrar and co-founder",
    position: "Registrar and co-founder",
    country: "Cameroon / International",
    photoUrl: "/co-founder.jpg",
    biography: "Accomplished institutional administrator, Christian educator, and co-founder dedicated to academic excellence, student support systems, and the orderly governance of university affairs.",
    displayOrder: 2
  },
  {
    id: "bm-3",
    name: "Bishop Dr Achine Divine Fru",
    title: "Vice Chancellor",
    position: "Vice Chancellor",
    country: "Cameroon",
    photoUrl: "/vice-chancellor.png",
    biography: "Eminent church leader, theological scholar, and chief academic administrator overseeing collegiate faculties, academic programmes, and student development.",
    displayOrder: 3
  },
  {
    id: "bm-4",
    name: "Apostle Dr TANYI PETER ASHU",
    title: "General Secretary",
    position: "General Secretary",
    country: "Cameroon",
    photoUrl: "/officials/tanyi-peter-ashu.jpg",
    biography: "Distinguished apostolic minister and seasoned institutional administrator serving as General Secretary of Harvester's Theological University, coordinating chancellery council documentation, general administration, and institutional communications.",
    displayOrder: 4
  },
  {
    id: "bm-5",
    name: "ARCHBISHOP AMBASSADOR PROFESSOR BRIAN CAMERON ANTHONY",
    title: "INT'L PRESIDENT",
    position: "INT'L PRESIDENT",
    country: "JAMAICA",
    photoUrl: "/officials/brian-cameron-anthony.jpg",
    biography: "Eminent archbishop, international ambassador, and distinguished professor of divinity leading Harvester's Theological University's global presence, international episcopal relations, and Caribbean/international institutional partnerships.",
    displayOrder: 5
  },
  {
    id: "bm-6",
    name: "DR. ALIREZA SALMANIA MOUKABADI",
    title: "VICE INT'L PRESIDENT",
    position: "VICE INT'L PRESIDENT",
    country: "ASFAHAN - IRAN",
    photoUrl: "/officials/alireza-salmania-moukabadi.jpg",
    biography: "Esteemed international academic and institutional executive serving as Vice International President, driving global educational diplomacy, cross-continental academic linkages, and collaborative research initiatives.",
    displayOrder: 6
  },
  {
    id: "bm-7",
    name: "H.E. AMB. EMERITUS PROF. SIR OBENG ELIJAH EMMANUEL KIRCHOFF Ph.D, Esq.",
    title: "GLOBAL VICE CHANCELLOR",
    position: "GLOBAL VICE CHANCELLOR",
    country: "GHANA",
    photoUrl: "/officials/obeng-elijah-emmanuel.jpg",
    biography: "Distinguished legal scholar, diplomat, and emeritus professor serving as Global Vice Chancellor, directing international collegiate standards, global campus development, and worldwide degree governance.",
    displayOrder: 7
  },
  {
    id: "bm-8",
    name: "ADVOCATE DR. JOSH F.N. LÖTTERING",
    title: "DEAN OF STUDIES, FACULTY OF LAW",
    position: "DEAN OF STUDIES, FACULTY OF LAW",
    country: "SOUTH AFRICA",
    photoUrl: "/officials/josh-lottering.jpg",
    biography: "Renowned legal advocate and judicial educator serving as Dean of Studies for the Faculty of Law, overseeing jurisprudence curricula, international legal studies, and human rights education.",
    displayOrder: 8
  }
];

export const INITIAL_AFFILIATIONS: AffiliationRecord[] = [
  {
    id: "aff-1",
    organization: "The Royal Peace Alliance",
    relationshipType: "International Fellowship",
    country: "International",
    description: "An international alliance promoting educational peace initiatives, theological advancement, and ethical leadership programs across borders.",
    officialNote: "Institutional relationship as supplied in the official HATHUN university brochure."
  },
  {
    id: "aff-2",
    organization: "ALSA University",
    relationshipType: "Affiliated University",
    country: "International",
    description: "Academic partnership fostering collaborative scholarship, institutional exchange, and international academic progression.",
    officialNote: "Institutional relationship as stated by HATHUN."
  },
  {
    id: "aff-3",
    organization: "Peace Foundation Christian University, Texas, USA",
    relationshipType: "Theological Partnership",
    country: "United States of America",
    description: "Cooperative collegiate relationship for Christian education, ministerial credentials, and trans-continental theological fellowship.",
    officialNote: "Institutional relationship as indicated in university materials."
  },
  {
    id: "aff-4",
    organization: "International Theological & Academic Alliances",
    relationshipType: "Academic Alliance",
    country: "Global",
    description: "Ongoing bilateral dialogues and educational partnerships with peer theological colleges, Christian institutions, and multidisciplinary faculties.",
    officialNote: "Official documentation and verification letters available upon request to the University Registry."
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: "news-1",
    title: "Admissions Open for 2026/2027 Academic Session Across All Faculties",
    slug: "admissions-open-2026-2027",
    featuredImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    date: "September 15, 2026",
    author: "Office of the University Registrar",
    category: "Academic Notice",
    excerpt: "Harvester's Theological University invites qualified applicants worldwide to enroll for Certificate, Diploma, Bachelor, Master’s and PhD programmes.",
    content: "The University Registry has officially commenced admissions for the upcoming academic session. Prospective candidates can submit applications online for programmes in Theology, Law, Business Management, Public Administration, Agriculture, and other faculties. Following submission, candidates will receive official admission references for documentation processing.",
    isFeatured: true
  },
  {
    id: "news-2",
    title: "Faculty of Theology Expands Modular Curriculum for Church Workers and Clergy",
    slug: "faculty-theology-modular-curriculum",
    featuredImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
    date: "August 28, 2026",
    author: "Dean of Theology",
    category: "Theological Discourse",
    excerpt: "New flexible learning schedules introduced for working ministers in Biblical Studies, Missiology, Divinity, and Church Administration.",
    content: "Understanding the demanding schedules of active church workers and missionaries, the Faculty of Theology under the guidance of Founder and Global Chancellor HIS ROYAL EMINENCE ARCHBISHOP AMB PROF. KING AZOR JOHN ELIJAH PhDs has structured enhanced hybrid and modular study formats.",
    isFeatured: false
  },
  {
    id: "news-3",
    title: "International Convocation Ceremony & Honorary Doctorate Conferment Announced",
    slug: "international-convocation-announcement",
    featuredImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    date: "July 20, 2026",
    author: "University Relations Bureau",
    category: "Convocation",
    excerpt: "Graduating scholars and deserving honorary award recipients will be honored during the upcoming annual solemn assembly.",
    content: "Harvester's Theological University will celebrate its upcoming solemn convocation, conferring certificates, diplomas, degrees, and honorary doctorates on deserving candidates recognized for their exemplary dedication to human service and education.",
    isFeatured: true
  }
];

export const INITIAL_EVENTS: UniversityEvent[] = [
  {
    id: "ev-1",
    title: "Annual Theological Symposium & Ministerial Colloquium",
    date: "October 24, 2026",
    time: "10:00 AM WAT",
    venue: "Main University Auditorium, Ambam Campus",
    category: "Seminar",
    description: "Keynote addresses and theological research papers exploring biblical stewardship, 21st-century church administration, and pastoral resilience.",
    registrationNote: "Free attendance for registered students; public delegates must register at the reception."
  },
  {
    id: "ev-2",
    title: "Matriculation & Oath of Academic Excellence",
    date: "November 14, 2026",
    time: "09:00 AM WAT",
    venue: "Ambam International Centre, South Region",
    category: "Matriculation",
    description: "Formal induction of newly admitted undergraduate and postgraduate students into the university academic registry.",
    registrationNote: "Compulsory for all newly admitted candidates."
  },
  {
    id: "ev-3",
    title: "Solemn Convocation & Graduation Assembly",
    date: "December 12, 2026",
    time: "10:00 AM WAT",
    venue: "University Grand Pavilion, Ambam",
    category: "Convocation",
    description: "Conferment of Certificate, Diploma, Bachelor, Master's, PhD degrees and Honorary Doctorates by the Global Chancellor.",
    registrationNote: "Academic gown collection details available through student portal."
  }
];

export const INITIAL_DOCUMENTS: UniversityDocument[] = [
  {
    id: "doc-1",
    title: "HATHUN General Prospectus & Academic Guide",
    category: "Prospectus",
    fileSize: "3.4 MB",
    updatedDate: "August 2026",
    description: "Complete institutional prospectus detailing faculties, departments, academic requirements, and educational philosophy.",
    isPrivate: false
  },
  {
    id: "doc-2",
    title: "Admission Requirements & Application Guide",
    category: "Admission Information",
    fileSize: "1.2 MB",
    updatedDate: "September 2026",
    description: "Step-by-step instructions for prospective candidates applying for Certificate through PhD level education.",
    isPrivate: false
  },
  {
    id: "doc-3",
    title: "HATHUN Academic Calendar 2026/2027",
    category: "Academic Calendar",
    fileSize: "850 KB",
    updatedDate: "September 2026",
    description: "Official schedule of semesters, matriculation, lecture periods, examinations, and convocation dates.",
    isPrivate: false
  },
  {
    id: "doc-4",
    title: "Undergraduate & Postgraduate Student Handbook",
    category: "Student Handbook",
    fileSize: "2.8 MB",
    updatedDate: "July 2026",
    description: "Institutional regulations, academic conduct, code of Christian ethics, and library guidelines.",
    isPrivate: false
  },
  {
    id: "doc-5",
    title: "Faculty of Theology Curricular Regulations",
    category: "Programme Information",
    fileSize: "1.9 MB",
    updatedDate: "August 2026",
    description: "Detailed syllabus specifications for Church Administration, Missiology, Divinity, and Biblical Studies.",
    isPrivate: false
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: "gal-real-1",
    title: "Conferment of Honorary Doctorate Degrees",
    category: "Ceremonies",
    imageUrl: "/gallery/item-1.jpg",
    fallbackUrl: "https://i.ibb.co/XxKmbQg5/IMG-20260926-WA0064.jpg",
    caption: "The Global Chancellor and academic council preside over the formal conferment of doctoral honors and ecclesiastical hooding during the university convocation ceremony.",
    date: "2026",
    featured: true
  },
  {
    id: "gal-real-2",
    title: "Academic Council and Chancellery Procession",
    category: "Faculty",
    imageUrl: "/gallery/item-2.jpg",
    fallbackUrl: "https://i.ibb.co/d0cXyFkK/IMG-20260926-WA0069.jpg",
    caption: "Members of the university board and visiting dignitaries robed in full academic regalia convene on the stage during annual commencement proceedings.",
    date: "2026",
    featured: true
  },
  {
    id: "gal-real-3",
    title: "Solemn Presentation of Degree Certificate",
    category: "Graduation",
    imageUrl: "/gallery/item-3.jpg",
    fallbackUrl: "https://i.ibb.co/s9fKQWvQ/IMG-20260926-WA0079.jpg",
    caption: "A distinguished graduate receives their degree citation and hardbound diploma from the Global Chancellor amid official assembly applause.",
    date: "2026",
    featured: true
  },
  {
    id: "gal-real-4",
    title: "Faculty of Theology Graduation Assembly",
    category: "Graduation",
    imageUrl: "/gallery/item-4.jpg",
    fallbackUrl: "https://i.ibb.co/5h1LwbFX/IMG-20260926-WA0070.jpg",
    caption: "Graduating ministers and scholars clad in ceremonial gowns gather together in thanksgiving during the university convocation.",
    date: "2026",
    featured: true
  },
  {
    id: "gal-real-5",
    title: "Chancellor Address to Graduating Class",
    category: "Academic Events",
    imageUrl: "/gallery/item-5.jpg",
    fallbackUrl: "https://i.ibb.co/cpgvcHL/IMG-20260926-WA0086.jpg",
    caption: "Founder and Global Chancellor Archbishop Amb Prof. King Azor delivers the keynote commencement address on ministerial excellence and Christian leadership.",
    date: "2026",
    featured: true
  },
  {
    id: "gal-real-6",
    title: "Conferral of Master's Hood and Stole",
    category: "Ceremonies",
    imageUrl: "/gallery/item-6.jpg",
    fallbackUrl: "https://i.ibb.co/VpgzSFND/IMG-20260926-WA0075.jpg",
    caption: "Academic deans formally invest an accomplished theological scholar with the ceremonial master's stole upon completion of their rigorous curriculum.",
    date: "2026",
    featured: false
  },
  {
    id: "gal-real-7",
    title: "Assembly of Honored Degree Recipients",
    category: "Graduation",
    imageUrl: "/gallery/item-7.jpg",
    fallbackUrl: "https://i.ibb.co/Xx5JyD0b/IMG-20260926-WA0078.jpg",
    caption: "A vibrant cohort of graduating students display their official degree binders and ceremonial honors following the graduation rites.",
    date: "2026",
    featured: true
  },
  {
    id: "gal-real-8",
    title: "Ecclesiastical Academic Procession in Sanctuarium",
    category: "Ceremonies",
    imageUrl: "/gallery/item-8.jpg",
    fallbackUrl: "https://i.ibb.co/nF754RR/IMG-20260926-WA0072.jpg",
    caption: "Faculty elders and doctoral candidates conduct the solemn academic procession through the convocation sanctuary.",
    date: "2026",
    featured: false
  },
  {
    id: "gal-real-9",
    title: "Awarding of the Institutional Honor Plaque",
    category: "Certificates",
    imageUrl: "/gallery/item-9.jpg",
    fallbackUrl: "https://i.ibb.co/LzSzXtv3/IMG-20260926-WA0085.jpg",
    caption: "The Chancellery presents a commemorative leadership plaque and certification to a meritorious institutional partner.",
    date: "2026",
    featured: false
  },
  {
    id: "gal-real-10",
    title: "Doctor of Divinity Hooding Rite",
    category: "Ceremonies",
    imageUrl: "/gallery/item-10.jpg",
    fallbackUrl: "https://i.ibb.co/TMDg3nw0/IMG-20260926-WA0084.jpg",
    caption: "The presiding chancellor and bishops perform the time-honored academic hooding ceremony for a candidate elevated to the doctorate.",
    date: "2026",
    featured: true
  },
  {
    id: "gal-real-11",
    title: "Congratulatory Gowning and Fellowship",
    category: "Students",
    imageUrl: "/gallery/item-11.jpg",
    fallbackUrl: "https://i.ibb.co/JR5BS3Xr/IMG-20260926-WA0081.jpg",
    caption: "Graduates celebrate their academic milestone with faculty mentors and ministry leaders following the close of commencement.",
    date: "2026",
    featured: false
  },
  {
    id: "gal-real-12",
    title: "Celebration of Conferred Degree Candidates",
    category: "Graduation",
    imageUrl: "/gallery/item-12.jpg",
    fallbackUrl: "https://i.ibb.co/bMX5RB4T/IMG-20260926-WA0083.jpg",
    caption: "Graduates celebrate joyful achievement in full doctoral and masters regalia alongside members of the governing chancellery.",
    date: "2026",
    featured: false
  },
  {
    id: "gal-real-13",
    title: "Formal Academic Stage Presentation",
    category: "Ceremonies",
    imageUrl: "/gallery/item-13.jpg",
    fallbackUrl: "https://i.ibb.co/LdtWyRP5/IMG-20260926-WA0087.jpg",
    caption: "Dignitaries and senior university officers salute the audience during the formal benediction and close of the convocation.",
    date: "2026",
    featured: false
  },
  {
    id: "gal-real-14",
    title: "Academic Robing of Degree Recipient",
    category: "Ceremonies",
    imageUrl: "/gallery/item-14.jpg",
    fallbackUrl: "https://i.ibb.co/7xrDFVGW/IMG-20260926-WA0061.jpg",
    caption: "A university chancellor adjusts the ceremonial hood of an honors graduate during the formal academic investiture.",
    date: "2026",
    featured: true
  },
  {
    id: "gal-real-15",
    title: "Conferment of Master's Degree Scroll",
    category: "Certificates",
    imageUrl: "/gallery/item-15.jpg",
    fallbackUrl: "https://i.ibb.co/VWZ043xq/IMG-20260926-WA0063.jpg",
    caption: "A proud postgraduate scholar receives their official degree diploma from presiding faculty during the convocation ceremony.",
    date: "2026",
    featured: false
  },
  {
    id: "gal-real-16",
    title: "Doctoral Investiture and Hooding Ceremony",
    category: "Ceremonies",
    imageUrl: "/gallery/item-16.jpg",
    fallbackUrl: "https://i.ibb.co/4w2LwbL4/IMG-20260926-WA0067.jpg",
    caption: "Presiding academic elders and bishops drape the crimson and gold doctoral hood upon an accomplished ministry scholar.",
    date: "2026",
    featured: true
  },
  {
    id: "gal-real-17",
    title: "Solemn Presentation of Graduate Citation",
    category: "Graduation",
    imageUrl: "/gallery/item-17.jpg",
    fallbackUrl: "https://i.ibb.co/dJKVDvsX/IMG-20260926-WA0056.jpg",
    caption: "An honored graduate in full academic regalia receives their official certificate folder during the commencement proceedings.",
    date: "2026",
    featured: true
  },
  {
    id: "gal-real-18",
    title: "Conferment of Certificate of Completion",
    category: "Certificates",
    imageUrl: "/gallery/item-18.jpg",
    fallbackUrl: "https://i.ibb.co/35Kqz2DJ/IMG-20260926-WA0060.jpg",
    caption: "University leaders and deans formally award a graduation certificate to a scholar during the academic convocation.",
    date: "2026",
    featured: false
  },
  {
    id: "gal-campus",
    title: "Ambam International Centre & Campus Facilities",
    category: "Campus",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    caption: "The scenic university administrative headquarters located at Ambam-yat, Ambam, South Region, Cameroon.",
    date: "2026",
    featured: false
  }
];

export const INITIAL_STUDENT: Student = {
  id: "stud-1",
  studentId: "HATHUN/2026/0001",
  fullName: "Emmanuel N. Mbah",
  email: "emmanuel.mbah@student.hathun.edu",
  phone: "+237 675 123 456",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  faculty: "FACULTY OF THEOLOGY",
  programme: "Biblical Studies",
  academicLevel: "Bachelor",
  admissionYear: "2026",
  currentSemester: "Semester 1",
  status: "Active",
  cgpa: 3.82,
  enrollmentReference: "HATHUN-2026-00001"
};

export const INITIAL_RESULTS: AcademicResult[] = [
  {
    id: "res-1",
    studentId: "HATHUN/2026/0001",
    studentName: "Emmanuel N. Mbah",
    academicSession: "2025/2026",
    semester: "Semester 1",
    courses: [
      {
        courseCode: "TH-BIB-201",
        courseTitle: "Old Testament Exegesis & Theology",
        creditUnits: 3,
        score: 84,
        grade: "A",
        gradePoint: 4.0
      },
      {
        courseCode: "TH-ADM-202",
        courseTitle: "Ecclesiastical Administration & Church Governance",
        creditUnits: 3,
        score: 78,
        grade: "B+",
        gradePoint: 3.5
      },
      {
        courseCode: "TH-MIS-301",
        courseTitle: "Cross-Cultural Missiology & Church Planting",
        creditUnits: 3,
        score: 88,
        grade: "A",
        gradePoint: 4.0
      },
      {
        courseCode: "TH-HER-101",
        courseTitle: "Principles of Biblical Hermeneutics",
        creditUnits: 3,
        score: 82,
        grade: "A-",
        gradePoint: 3.7
      }
    ],
    gpa: 3.80,
    cgpa: 3.82,
    totalCreditsEarned: 12,
    status: "Published",
    publishedDate: "August 12, 2026",
    remarks: "Excellent Academic Standing"
  }
];

export const INITIAL_CERTIFICATES: InternalCertificate[] = [
  {
    id: "cert-1",
    certificateNumber: "HATHUN-CERT-2026-0014",
    studentId: "HATHUN/2026/0001",
    studentName: "Emmanuel N. Mbah",
    programme: "Diploma in Church Administration",
    faculty: "FACULTY OF THEOLOGY",
    awardLevel: "Diploma",
    dateAwarded: "June 25, 2026",
    chancellorName: "HIS ROYAL EMINENCE ARCHBISHOP AMB PROF. KING AZOR JOHN ELIJAH PhDs",
    registrarName: "Bishop Mrs Azor Loveline Ashia",
    classification: "Distinction",
    citation: "Having fulfilled all the academic and moral requirements set forth by the Senate of Harvester's Theological University.",
    isPrivate: true
  }
];

export const INITIAL_APPLICATIONS: AdmissionApplication[] = [
  {
    id: "app-1",
    referenceNumber: "HATHUN-2026-00001",
    submittedAt: "2026-09-18 10:30 WAT",
    status: "Approved",
    firstName: "Emmanuel",
    middleName: "Nji",
    lastName: "Mbah",
    gender: "Male",
    dateOfBirth: "1998-05-14",
    nationality: "Cameroonian",
    country: "Cameroon",
    stateRegion: "South Region",
    city: "Ambam",
    residentialAddress: "Quartier Administratif, Ambam",
    phone: "+237 675 123 456",
    whatsapp: "+237 675 123 456",
    email: "emmanuel.mbah@student.hathun.edu",
    faculty: "FACULTY OF THEOLOGY",
    programme: "Biblical Studies",
    academicLevel: "Bachelor",
    previousInstitution: "Grace Theological Institute",
    previousQualification: "Diploma in Christian Ministry",
    graduationYear: "2025",
    passportPhotoName: "passport_photo_mbah.jpg",
    academicDocumentsName: "diploma_transcript_certified.pdf",
    supportingDocumentsName: "pastoral_recommendation_letter.pdf",
    personalStatement: "I desire to expand my theological mastery and equip church leaders with sound doctrine and pastoral wisdom.",
    assignedStudentId: "HATHUN/2026/0001",
    notes: "Admitted. Student ID assigned by Registrar."
  },
  {
    id: "app-2",
    referenceNumber: "HATHUN-2026-00002",
    submittedAt: "2026-09-24 14:15 WAT",
    status: "Pending",
    firstName: "Grace",
    middleName: "Ebenezer",
    lastName: "Okonkwo",
    gender: "Female",
    dateOfBirth: "2001-08-20",
    nationality: "Nigerian",
    country: "Nigeria",
    stateRegion: "Lagos",
    city: "Lagos",
    residentialAddress: "14 Kingsway Road, Ikoyi",
    phone: "+234 803 555 7890",
    whatsapp: "+234 803 555 7890",
    email: "grace.okonkwo@example.com",
    faculty: "FACULTY OF LAW",
    programme: "Bachelor of Laws (LL.B)",
    academicLevel: "Bachelor",
    previousInstitution: "National College of Arts & Commerce",
    previousQualification: "Diploma in Legal Studies",
    graduationYear: "2024",
    passportPhotoName: "grace_portrait.jpg",
    academicDocumentsName: "legal_diploma_certificate.pdf",
    supportingDocumentsName: "character_reference.pdf",
    personalStatement: "Passionate about combining legal scholarship with Christian ethics to defend vulnerable populations."
  },
  {
    id: "app-3",
    referenceNumber: "HATHUN-2026-00003",
    submittedAt: "2026-09-26 09:45 WAT",
    status: "Under Review",
    firstName: "Pastor David",
    middleName: "Paul",
    lastName: "Tchamba",
    gender: "Male",
    dateOfBirth: "1989-11-03",
    nationality: "Cameroonian",
    country: "Cameroon",
    stateRegion: "Littoral",
    city: "Douala",
    residentialAddress: "Bonanjo, Douala",
    phone: "+237 699 887 766",
    whatsapp: "+237 699 887 766",
    email: "david.tchamba@ministries.org",
    faculty: "FACULTY OF THEOLOGY",
    programme: "Divinity",
    academicLevel: "Master’s",
    previousInstitution: "Bethel Bible College",
    previousQualification: "Bachelor of Theology (B.Th)",
    graduationYear: "2021",
    passportPhotoName: "pastor_david_photo.png",
    academicDocumentsName: "bachelor_degree_transcript.pdf",
    supportingDocumentsName: "ordination_credential.pdf",
    personalStatement: "Seeking Master's level scholarly depth to lead our denomination's ministerial training division."
  }
];
