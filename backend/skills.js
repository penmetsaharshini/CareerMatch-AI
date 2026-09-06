const skills = [
  {
    canonical: "JavaScript",
    aliases: ["javascript", "js"],
  },
  {
    canonical: "TypeScript",
    aliases: ["typescript", "ts"],
  },
  {
    canonical: "Python",
    aliases: ["python"],
  },
  {
    canonical: "Java",
    aliases: ["java"],
  },
  {
    canonical: "C++",
    aliases: ["c++", "cpp"],
  },
  {
    canonical: "C",
    aliases: ["c"],
  },
  {
    canonical: "React",
    aliases: ["react", "react.js", "reactjs"],
  },
  {
    canonical: "Node.js",
    aliases: ["node.js", "nodejs", "node js"],
  },
  {
    canonical: "Express",
    aliases: ["express", "express.js", "expressjs"],
  },
  {
    canonical: "HTML",
    aliases: ["html", "html5"],
  },
  {
    canonical: "CSS",
    aliases: ["css", "css3"],
  },
  {
    canonical: "Tailwind CSS",
    aliases: ["tailwind css", "tailwind"],
  },
  {
    canonical: "SQL",
    aliases: ["sql"],
  },
  {
    canonical: "MySQL",
    aliases: ["mysql"],
  },
  {
    canonical: "MongoDB",
    aliases: ["mongodb", "mongo db"],
  },
  {
    canonical: "PostgreSQL",
    aliases: ["postgresql", "postgres"],
  },
  {
    canonical: "Git",
    aliases: ["git"],
  },
  {
    canonical: "GitHub",
    aliases: ["github", "git hub"],
  },
  {
    canonical: "REST APIs",
    aliases: ["rest api", "rest apis", "restful api", "restful apis"],
  },
  {
    canonical: "DBMS",
    aliases: ["dbms", "database management system"],
  },
  {
    canonical: "Data Structures",
    aliases: ["data structures", "data structure"],
  },
  {
    canonical: "Algorithms",
    aliases: ["algorithms", "algorithm"],
  },
  {
    canonical: "Machine Learning",
    aliases: ["machine learning", "ml"],
  },
  {
    canonical: "Artificial Intelligence",
    aliases: ["artificial intelligence", "ai"],
  },
  {
    canonical: "AWS",
    aliases: ["aws", "amazon web services"],
  },
  {
    canonical: "Docker",
    aliases: ["docker"],
  },
  {
    canonical: "Kubernetes",
    aliases: ["kubernetes", "k8s"],
  },
  {
    canonical: "Next.js",
    aliases: ["next.js", "nextjs", "next js"],
  },
  {
    canonical: "Angular",
    aliases: ["angular"],
  },
  {
    canonical: "Vue.js",
    aliases: ["vue.js", "vuejs", "vue js"],
  },
  {
    canonical: "Spring Boot",
    aliases: ["spring boot", "springboot"],
  },
  {
    canonical: "Firebase",
    aliases: ["firebase"],
  },
  {
    canonical: "Supabase",
    aliases: ["supabase"],
  },
];

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function containsSkill(text, alias) {
  const pattern = escapeRegex(alias.toLowerCase());

  const regex = new RegExp(
    `(^|[^a-z0-9+#.])${pattern}(?=$|[^a-z0-9+#.])`,
    "i"
  );

  return regex.test(text);
}

function extractSkills(text) {
  if (!text) {
    return [];
  }

  const foundSkills = [];
  const lowerText = text.toLowerCase();

  skills.forEach((skill) => {
    const found = skill.aliases.some((alias) =>
      containsSkill(lowerText, alias)
    );

    if (found) {
      foundSkills.push(skill.canonical);
    }
  });

  return [...new Set(foundSkills)];
}


// ==========================================
// INTELLIGENT MATCH SCORE
// ==========================================

function calculateMatchScore(resumeSkills, jobSkills) {
  if (!jobSkills || jobSkills.length === 0) {
    return 0;
  }

  const coreSkills = [
    "Java",
    "Python",
    "JavaScript",
    "TypeScript",
    "C++",
    "React",
    "Node.js",
    "SQL",
    "MySQL",
    "MongoDB",
    "PostgreSQL",
    "Data Structures",
    "Algorithms",
    "Machine Learning",
    "Artificial Intelligence",
    "AWS",
    "Docker",
    "Kubernetes",
    "Spring Boot",
  ];

  let totalWeight = 0;
  let matchedWeight = 0;

  jobSkills.forEach((jobSkill) => {
    const isCoreSkill = coreSkills.some(
      (skill) =>
        skill.toLowerCase() === jobSkill.toLowerCase()
    );

    // Core skills = 2 points
    // Other skills = 1 point
    const weight = isCoreSkill ? 2 : 1;

    totalWeight += weight;

    const isMatched = resumeSkills.some(
      (resumeSkill) =>
        resumeSkill.toLowerCase() === jobSkill.toLowerCase()
    );

    if (isMatched) {
      matchedWeight += weight;
    }
  });

  return Math.round(
    (matchedWeight / totalWeight) * 100
  );
}


module.exports = {
  extractSkills,
  calculateMatchScore,
};