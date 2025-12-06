import { Experience, Education, Skill, Interest } from './types';

export const PROFILE = {
  name: "Filipe Lopes",
  role: "Community Manager & Technical Support",
  email: "filipe.golden@hotmail.com",
  location: "Lisbon, Portugal",
  phone: "+351 912 685 560",
  linkedin: "linkedin.com/in/filipeathayde",
  // Placeholder used as per instructions, would be replaced by local asset in prod
  avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1200&auto=format&fit=crop", 
  bio: "I'm a finance enthusiast in the web3 space with a passion for lifelong learning. From technical analysis to community management, I thrive in environments that challenge me to grow. I bring 5 years of experience building relationships, troubleshooting complex issues, and creating engagement strategies that matter."
};

export const EXPERIENCE: Experience[] = [
  {
    role: "Head of Community Manager",
    company: "L4VA (Liquidity 4 Virtual Assets)",
    period: "09/2023 - Present",
    type: "Work",
    description: "Leading community engagement strategies, building lasting relationships with stakeholders, and handling all community-related operations including tickets and investor relations.",
    skills: ["Community Management", "Moderation", "Strategy", "Web3"]
  },
  {
    role: "Happiness Engineer",
    company: "Automattic (WordPress, Tumblr)",
    period: "06/2025 - 11/2025",
    type: "Work",
    description: "Provided high-level professional support to WordPress.com users, troubleshooting technical issues (CSS, HTML, DNS), and guiding users to maximize platform potential.",
    skills: ["Technical Support", "Troubleshooting", "Customer Success"]
  },
  {
    role: "Beat Mapping Project",
    company: "Senior Year Project",
    period: "09/2014 - 06/2017",
    type: "Project",
    description: "Created a 3D installation with diamond and triangle shapes illuminated by projected lights synchronized with music, creating an immersive visual experience.",
    skills: ["3D Mapping", "Creative Design", "Event Production"]
  }
];

export const EDUCATION: Education[] = [
  {
    course: "CS50's Introduction to Computer Science",
    institution: "HarvardX",
    period: "02/2025 - 04/2025",
    details: ["C, Python, SQL, JavaScript", "Data Structures & Algorithms"]
  },
  {
    course: "Technical Analysis: Crypto, Stocks",
    institution: "Self-Taught / Multiple Sources",
    period: "08/2018 - 10/2020",
    details: ["Trading Fundamentals", "Market Analysis", "Risk Management"]
  }
];

export const SKILLS: Skill[] = [
  { name: "Community Development", category: "Industry" },
  { name: "Problem Solving", category: "Soft" },
  { name: "Crypto/Web3", category: "Industry" },
  { name: "Python & SQL", category: "Tech" },
  { name: "Technical Analysis", category: "Industry" },
  { name: "Customer Support", category: "Soft" },
  { name: "Portuguese (Native)", category: "Soft" },
  { name: "English (Professional)", category: "Soft" }
];

export const INTERESTS: Interest[] = [
  { name: "Cryptocurrency", prompt: "A futuristic 3D golden bitcoin coin floating in a dark data void, high quality, octane render, cinematic lighting" },
  { name: "Anime", prompt: "A stylized 3D anime character mask or katana, glowing neon aesthetics, dark background, cyberpunk style" },
  { name: "Music", prompt: "A 3D abstract visualization of sound waves and a vinyl record, gold and black, elegant, minimalist" },
  { name: "Finance", prompt: "3D abstract financial chart bars rising, gold material, dark glass background, sophisticated" }
];
