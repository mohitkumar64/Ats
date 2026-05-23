export interface ProfileData {
  personal: {
    name: string;
    title: string;
    bio: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    portfolio: string;
    profileImage: string;
  };
  education: {
    university: string;
    degree: string;
    branch: string;
    cgpa: string;
    startYear: string;
    endYear: string;
    coursework: string[];
  }[];
  skills: {
    technical: {
      languages: { name: string; level: number }[];
      frameworks: string[];
      tools: string[];
    };
    soft: string[];
  };
  experience: {
    company: string;
    role: string;
    type: "Internship" | "Full-time" | "Freelance" | "Part-time";
    startDate: string;
    endDate: string;
    responsibilities: string[];
    achievements: string[];
  }[];
  projects: {
    title: string;
    description: string;
    techStack: string[];
    github: string;
    liveDemo: string;
    features: string[];
  }[];
  certifications: {
    name: string;
    organization: string;
    date: string;
  }[];
  achievements: {
    hackathons: string[];
    awards: string[];
    openSource: string[];
    codingProfiles: { platform: string; url: string }[];
  };
  resumeUrl: string;
}

export const profileData: ProfileData = {
  personal: {
    name: "Mohit Kumar",
    title: "Full-Stack Developer",
    bio: "Passionate full-stack developer with expertise in building modern web applications. I specialize in React, Next.js, and Node.js, creating scalable solutions that deliver exceptional user experiences. Constantly learning and exploring new technologies to stay at the cutting edge of web development.",
    email: "mohit@example.com",
    phone: "+91 98765 43210",
    location: "New Delhi, India",
    linkedin: "https://linkedin.com/in/mohitkumar",
    github: "https://github.com/mohitkumar64",
    portfolio: "https://mohitkumar.dev",
    profileImage: "",
  },
  education: [
    {
      university: "Delhi Technological University",
      degree: "Bachelor of Technology",
      branch: "Computer Science & Engineering",
      cgpa: "8.5 / 10",
      startYear: "2021",
      endYear: "2025",
      coursework: [
        "Data Structures & Algorithms",
        "Database Management Systems",
        "Operating Systems",
        "Computer Networks",
        "Machine Learning",
        "Web Development",
      ],
    },
  ],
  skills: {
    technical: {
      languages: [
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "Python", level: 75 },
        { name: "C++", level: 70 },
        { name: "Java", level: 65 },
      ],
      frameworks: [
        "React.js",
        "Next.js",
        "Node.js",
        "Express.js",
        "Tailwind CSS",
        "MongoDB",
        "PostgreSQL",
        "Prisma",
        "Redux",
        "Socket.io",
      ],
      tools: [
        "Git & GitHub",
        "Docker",
        "VS Code",
        "Postman",
        "Figma",
        "Vercel",
        "AWS",
        "Linux",
      ],
    },
    soft: [
      "Problem Solving",
      "Team Collaboration",
      "Communication",
      "Leadership",
      "Time Management",
      "Adaptability",
    ],
  },
  experience: [
    {
      company: "Tech Solutions Pvt. Ltd.",
      role: "Full-Stack Developer Intern",
      type: "Internship",
      startDate: "Jun 2024",
      endDate: "Aug 2024",
      responsibilities: [
        "Developed and maintained RESTful APIs using Node.js and Express.js",
        "Built responsive front-end interfaces using React.js and Tailwind CSS",
        "Implemented authentication and authorization using JWT tokens",
        "Optimized database queries resulting in 30% faster response times",
      ],
      achievements: [
        "Received 'Best Intern' recognition for outstanding performance",
        "Delivered 3 features ahead of schedule",
      ],
    },
    {
      company: "Freelance",
      role: "Web Developer",
      type: "Freelance",
      startDate: "Jan 2024",
      endDate: "Present",
      responsibilities: [
        "Designed and developed custom websites for small businesses",
        "Created responsive landing pages with modern UI/UX practices",
        "Integrated payment gateways and third-party APIs",
      ],
      achievements: [
        "Successfully delivered 5+ projects with 100% client satisfaction",
        "Increased client website traffic by average 40%",
      ],
    },
  ],
  projects: [
    {
      title: "Builder & ATS",
      description:
        "AI-powered resume builder with ATS scoring. Users can create professional resumes using templates and get instant ATS compatibility scores with AI-driven suggestions.",
      techStack: ["Next.js", "React", "TypeScript", "MongoDB", "Tailwind CSS", "Gemini AI"],
      github: "https://github.com/mohitkumar64/Ats",
      liveDemo: "https://builderandats.vercel.app",
      features: [
        "Multiple professional resume templates",
        "AI-powered ATS score analysis",
        "Live resume preview while editing",
        "One-click PDF export",
      ],
    },
    {
      title: "Real-Time Chat App",
      description:
        "A feature-rich real-time messaging application with group chats, media sharing, and online status indicators built using modern web technologies.",
      techStack: ["React", "Node.js", "Socket.io", "MongoDB", "Express.js"],
      github: "https://github.com/mohitkumar64/chat-app",
      liveDemo: "",
      features: [
        "Real-time messaging with Socket.io",
        "Group chat functionality",
        "Media file sharing",
        "Online/offline status indicators",
      ],
    },
    {
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with product catalog, cart management, payment integration, and admin dashboard for inventory management.",
      techStack: ["Next.js", "Prisma", "PostgreSQL", "Stripe", "Tailwind CSS"],
      github: "https://github.com/mohitkumar64/ecommerce",
      liveDemo: "",
      features: [
        "Product catalog with search & filters",
        "Shopping cart and checkout flow",
        "Stripe payment integration",
        "Admin dashboard for order management",
      ],
    },
  ],
  certifications: [
    {
      name: "Full-Stack Web Development",
      organization: "Udemy",
      date: "March 2024",
    },
    {
      name: "Data Structures & Algorithms",
      organization: "GeeksforGeeks",
      date: "January 2024",
    },
    {
      name: "AWS Cloud Practitioner",
      organization: "Amazon Web Services",
      date: "December 2023",
    },
  ],
  achievements: {
    hackathons: [
      "Winner - HackDelhi 2024 (Built an AI-powered study assistant)",
      "Runner Up - Code Sprint 3.0 (Developed a healthcare scheduling platform)",
      "Top 10 - Smart India Hackathon 2023",
    ],
    awards: [
      "Dean's List - Academic Excellence 2023-24",
      "Best Project Award - Web Development Course",
    ],
    openSource: [
      "Contributed to Next.js documentation",
      "Created popular React component library with 500+ GitHub stars",
    ],
    codingProfiles: [
      { platform: "LeetCode", url: "https://leetcode.com/mohitkumar" },
      { platform: "CodeForces", url: "https://codeforces.com/profile/mohitkumar" },
      { platform: "HackerRank", url: "https://hackerrank.com/mohitkumar" },
    ],
  },
  resumeUrl: "/resume.pdf",
};
