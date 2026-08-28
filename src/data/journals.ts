export interface Article {
  slug: string;
  title: string;
  author: string;
  volume: string;
  year: string;
}

export interface Journal {
  slug: string;
  cardNo: string;
  icon: string;
  field: "Management" | "Science" | "Technology" | "Social Sciences";
  name: string;
  shortDescription: string;
  heroDescription: string;
  issn: string;
  frequency: string;
  review: string;
  language: string;
  aboutHeading: string;
  aboutText: string;
  scope: string[];
  articles: Article[];
}

export const journals: Journal[] = [
  {
    slug: "management",
    cardNo: "01",
    icon: "▦",
    field: "Management",
    name: "Journal of Management",
    shortDescription:
      "Management, business, leadership and organizational studies.",
    heroDescription:
      "Advancing research in management, business, leadership and organizational studies.",
    issn: "Coming Soon",
    frequency: "Quarterly",
    review: "Peer Review",
    language: "English",
    aboutHeading: "A home for meaningful management research.",
    aboutText:
      "The Journal of Management publishes original scholarly contributions addressing contemporary management and organizational questions. This page is structured so you can replace the sample copy with your journal's official aims, scope and editorial information.",
    scope: [
      "Business and strategic management",
      "Leadership and organizational behaviour",
      "Entrepreneurship and innovation",
      "Human resource management",
      "Operations and contemporary management issues",
    ],
    articles: [
      {
        slug: "contemporary-approaches-to-strategic-management",
        title: "Contemporary Approaches to Strategic Management",
        author: "Author Name",
        volume: "Volume 1, Issue 1",
        year: "2026",
      },
      {
        slug: "leadership-and-organizational-performance",
        title: "Leadership and Organizational Performance",
        author: "Author Name",
        volume: "Volume 1, Issue 1",
        year: "2026",
      },
    ],
  },
  {
    slug: "science",
    cardNo: "02",
    icon: "⌬",
    field: "Science",
    name: "Journal of Science",
    shortDescription:
      "Scientific research, innovation, interdisciplinary studies and emerging discoveries.",
    heroDescription:
      "Advancing research in the natural sciences, applied sciences and interdisciplinary discovery.",
    issn: "Coming Soon",
    frequency: "Quarterly",
    review: "Peer Review",
    language: "English",
    aboutHeading: "A home for meaningful scientific research.",
    aboutText:
      "The Journal of Science publishes original scholarly contributions addressing contemporary questions across the natural and applied sciences. This page is structured so you can replace the sample copy with your journal's official aims, scope and editorial information.",
    scope: [
      "Physical and natural sciences",
      "Applied and interdisciplinary research",
      "Environmental and life sciences",
      "Emerging scientific discoveries",
      "Data-driven and experimental methods",
    ],
    articles: [
      {
        slug: "emerging-methods-in-interdisciplinary-research",
        title: "Emerging Methods in Interdisciplinary Research",
        author: "Author Name",
        volume: "Volume 1, Issue 1",
        year: "2026",
      },
      {
        slug: "advances-in-applied-scientific-discovery",
        title: "Advances in Applied Scientific Discovery",
        author: "Author Name",
        volume: "Volume 1, Issue 1",
        year: "2026",
      },
    ],
  },
  {
    slug: "technology",
    cardNo: "03",
    icon: "◇",
    field: "Technology",
    name: "Journal of Technology",
    shortDescription:
      "Computer science, engineering, information technology and digital innovation.",
    heroDescription:
      "Advancing research in computer science, engineering and digital innovation.",
    issn: "Coming Soon",
    frequency: "Quarterly",
    review: "Peer Review",
    language: "English",
    aboutHeading: "A home for meaningful technology research.",
    aboutText:
      "The Journal of Technology publishes original scholarly contributions addressing contemporary questions in computing, engineering and digital innovation. This page is structured so you can replace the sample copy with your journal's official aims, scope and editorial information.",
    scope: [
      "Computer science and software engineering",
      "Information technology and systems",
      "Artificial intelligence and data science",
      "Digital innovation and emerging technologies",
      "Cybersecurity and network engineering",
    ],
    articles: [
      {
        slug: "trends-in-digital-innovation-and-computing",
        title: "Trends in Digital Innovation and Computing",
        author: "Author Name",
        volume: "Volume 1, Issue 1",
        year: "2026",
      },
      {
        slug: "engineering-approaches-to-emerging-technologies",
        title: "Engineering Approaches to Emerging Technologies",
        author: "Author Name",
        volume: "Volume 1, Issue 1",
        year: "2026",
      },
    ],
  },
  {
    slug: "social-studies",
    cardNo: "04",
    icon: "◌",
    field: "Social Sciences",
    name: "Journal of Social Studies",
    shortDescription:
      "Contemporary research in education, humanities and social sciences.",
    heroDescription:
      "Advancing research in education, humanities and the social sciences.",
    issn: "Coming Soon",
    frequency: "Quarterly",
    review: "Peer Review",
    language: "English",
    aboutHeading: "A home for meaningful social science research.",
    aboutText:
      "The Journal of Social Studies publishes original scholarly contributions addressing contemporary questions in education, humanities and society. This page is structured so you can replace the sample copy with your journal's official aims, scope and editorial information.",
    scope: [
      "Education and pedagogy",
      "Humanities and cultural studies",
      "Sociology and contemporary society",
      "Public policy and governance",
      "Social sciences research methods",
    ],
    articles: [
      {
        slug: "contemporary-issues-in-education-and-society",
        title: "Contemporary Issues in Education and Society",
        author: "Author Name",
        volume: "Volume 1, Issue 1",
        year: "2026",
      },
      {
        slug: "perspectives-in-humanities-and-culture",
        title: "Perspectives in Humanities and Culture",
        author: "Author Name",
        volume: "Volume 1, Issue 1",
        year: "2026",
      },
    ],
  },
];

export function getJournalBySlug(slug: string): Journal | undefined {
  return journals.find((j) => j.slug === slug);
}

export function getArticleBySlug(
  slug: string
): { article: Article; journal: Journal } | undefined {
  for (const journal of journals) {
    const article = journal.articles.find((a) => a.slug === slug);
    if (article) return { article, journal };
  }
  return undefined;
}

export function getAllArticles(): { article: Article; journal: Journal }[] {
  return journals.flatMap((journal) =>
    journal.articles.map((article) => ({ article, journal }))
  );
}
