export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: "Full Stack" | "System Design" | "Cloud Infrastructure" | "AI & Data Science";
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  achievements: string[];
  architecture: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string; // Structured content or markdown representation
  publishedAt: string;
  readTime: string;
  tags: string[];
  category: "Engineering" | "System Design" | "Career" | "Tutorials";
  imageUrl: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  skillsUsed: string[];
}
