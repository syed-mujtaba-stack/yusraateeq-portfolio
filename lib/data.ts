import type {
  NavLink,
  Project,
  Service,
  Skill,
  Experience,
  Education,
  Testimonial,
  FAQ,
  BlogPost,
  Certificate,
  Achievement,
} from "@/types";

export const navLinks: NavLink[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export const skills: Skill[] = [
  { name: "JavaScript", category: "Languages" },
  { name: "TypeScript", category: "Languages" },
  { name: "Python", category: "Languages" },
  { name: "HTML", category: "Languages" },
  { name: "CSS", category: "Languages" },
  { name: "SQL", category: "Languages" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TailwindCSS", category: "Frontend" },
  { name: "Redux", category: "Frontend" },
  { name: "Framer Motion", category: "Frontend" },
  { name: "GSAP", category: "Frontend" },
  { name: "Anime.js", category: "Frontend" },
  { name: "Three.js", category: "Frontend" },
  { name: "R3F", category: "Frontend" },
  { name: "Drei", category: "Frontend" },
  { name: "Shadcn", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "FastAPI", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "WebSockets", category: "Backend" },
  { name: "Auth", category: "Backend" },
  { name: "Agentic AI APIs", category: "Backend" },
  { name: "MongoDB", category: "Databases" },
  { name: "PostgreSQL", category: "Databases" },
  { name: "Neon", category: "Databases" },
  { name: "Firebase", category: "Databases" },
  { name: "Redis", category: "Databases" },
  { name: "OpenAI", category: "AI" },
  { name: "OpenRouter", category: "AI" },
  { name: "Gemini", category: "AI" },
  { name: "Claude", category: "AI" },
  { name: "LangChain", category: "AI" },
  { name: "Genkit", category: "AI" },
  { name: "Vector DB", category: "AI" },
  { name: "Embeddings", category: "AI" },
  { name: "RAG", category: "AI" },
  { name: "Prompt Engineering", category: "AI" },
  { name: "AI Agents", category: "AI" },
  { name: "MCP", category: "AI" },
  { name: "Agentic AI", category: "AI" },
  { name: "Docker", category: "DevOps" },
  { name: "GitHub Actions", category: "DevOps" },
  { name: "Linux", category: "DevOps" },
  { name: "Nginx", category: "DevOps" },
  { name: "CI/CD", category: "DevOps" },
  { name: "PM2", category: "DevOps" },
  { name: "Vercel", category: "DevOps" },
  { name: "Cloudflare", category: "DevOps" },
  { name: "AWS", category: "Cloud" },
  { name: "Google Cloud", category: "Cloud" },
  { name: "Azure", category: "Cloud" },
  { name: "Supabase", category: "Cloud" },
  { name: "Cloudinary", category: "Cloud" },
  { name: "DigitalOcean", category: "Cloud" },
  { name: "Sanity", category: "CMS" },
  { name: "WordPress", category: "CMS" },
  { name: "Headless CMS", category: "CMS" },
  { name: "Figma", category: "Design" },
  { name: "UI Design", category: "Design" },
  { name: "UX Design", category: "Design" },
  { name: "Wireframing", category: "Design" },
  { name: "Prototyping", category: "Design" },
];

export const services: Service[] = [
  {
    title: "Agentic AI Development",
    description: "Build intelligent AI agents and autonomous systems using LangChain, MCP, and advanced LLM orchestration.",
    icon: "Brain",
  },
  {
    title: "AI Automation",
    description: "Automate workflows with AI-powered pipelines, RAG systems, and intelligent process automation.",
    icon: "Zap",
  },
  {
    title: "Full Stack Development",
    description: "End-to-end development of modern web applications with Next.js, React, Node.js, and TypeScript.",
    icon: "Code2",
  },
  {
    title: "Modern Web Apps",
    description: "Responsive, performant, and accessible web applications with cutting-edge technologies.",
    icon: "Globe",
  },
  {
    title: "SaaS Platforms",
    description: "Scalable SaaS architectures with authentication, payments, and multi-tenant support.",
    icon: "Cloud",
  },
  {
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces designed for exceptional user experiences.",
    icon: "Palette",
  },
  {
    title: "Cloud Deployment",
    description: "Deploy and scale applications on AWS, GCP, Azure, and Vercel with CI/CD pipelines.",
    icon: "Server",
  },
  {
    title: "DevOps Setup",
    description: "Containerization, orchestration, monitoring, and infrastructure automation.",
    icon: "Settings2",
  },
  {
    title: "Performance Optimization",
    description: "Lighthouse 95+ scores, code splitting, lazy loading, and image optimization.",
    icon: "Gauge",
  },
];

export const experiences: Experience[] = [
  {
    role: "Business Development",
    company: "1MindSoft",
    period: "Mar 2024 – Aug 2025",
    description: [
      "Worked with international clients to understand requirements and deliver technical solutions",
      "Drove business growth through strategic partnerships and client relationship management",
      "Bridged the gap between technical teams and business stakeholders",
      "Conducted requirement analysis and technical feasibility studies",
    ],
  },
];

export const education: Education[] = [
  {
    degree: "Bachelor of Business Administration",
    institution: "University of Ziauddin",
    period: "2025 – 2028",
    description: "Current student combining business acumen with technical expertise",
  },
  {
    degree: "Diploma in Web Development",
    institution: "Pak Collegiate",
    period: "Nov 2023 – Apr 2024",
    description: "Comprehensive web development program covering full-stack technologies",
  },
];

export const internships = [
  {
    role: "Full Stack Development Intern",
    company: "Code Alfa",
    period: "",
    description: ["Contributed to full-stack web development projects"],
  },
  {
    role: "WordPress Development Intern",
    company: "Codex Cue",
    period: "",
    description: ["Developed and maintained WordPress websites"],
  },
];

export const projects: Project[] = [
  {
    title: "AI Agent Platform",
    description: "Multi-agent orchestration platform with LangChain, MCP integration, and real-time agent communication.",
    tags: ["Next.js", "LangChain", "AI Agents", "WebSockets"],
    image: "/images/project-ai.jpg",
    githubUrl: "https://github.com/yusraateeq",
  },
  {
    title: "Cloud Native Dashboard",
    description: "Real-time dashboard for monitoring cloud infrastructure with interactive visualizations.",
    tags: ["React", "TypeScript", "D3.js", "WebSockets"],
    image: "/images/project-cloud.jpg",
    liveUrl: "#",
    githubUrl: "https://github.com/yusraateeq",
  },
  {
    title: "SaaS Boilerplate",
    description: "Production-ready SaaS starter with authentication, billing, and multi-tenant architecture.",
    tags: ["Next.js", "Prisma", "Stripe", "PostgreSQL"],
    image: "/images/project-saas.jpg",
    githubUrl: "https://github.com/yusraateeq",
  },
  {
    title: "E-Commerce Platform",
    description: "Modern e-commerce solution with Sanity CMS, real-time inventory, and payment integration.",
    tags: ["Next.js", "Sanity", "Stripe", "TailwindCSS"],
    image: "/images/project-ecom.jpg",
    liveUrl: "#",
    githubUrl: "https://github.com/yusraateeq",
  },
];

export const blogPosts: BlogPost[] = [
  {
    title: "Building Intelligent Agents with LangChain",
    excerpt: "A deep dive into creating autonomous AI agents using LangChain's agent framework and MCP tools.",
    date: "2025-06-15",
    slug: "building-intelligent-agents-langchain",
    readingTime: "8 min read",
  },
  {
    title: "Modern Full Stack Architecture Patterns",
    excerpt: "Exploring scalable architecture patterns for modern web applications with Next.js and cloud services.",
    date: "2025-05-20",
    slug: "modern-full-stack-architecture",
    readingTime: "6 min read",
  },
  {
    title: "The Future of Agentic AI in Business",
    excerpt: "How agentic AI is transforming business operations and creating new opportunities.",
    date: "2025-04-10",
    slug: "future-agentic-ai-business",
    readingTime: "5 min read",
  },
];

export const certificates: Certificate[] = [
  {
    title: "Full Stack Web Development",
    issuer: "Pak Collegiate",
    date: "2024",
  },
  {
    title: "WordPress Development",
    issuer: "Codex Cue",
    date: "2024",
  },
];

export const achievements: Achievement[] = [
  {
    title: "Business Growth Achievement",
    description: "Successfully drove business development at 1MindSoft, contributing to company growth",
    year: "2025",
  },
  {
    title: "Full Stack Certification",
    description: "Completed comprehensive full stack development program",
    year: "2024",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Client",
    role: "Business Partner",
    content: "Yusra's ability to combine technical expertise with business understanding is remarkable. She delivers exceptional results every time.",
  },
  {
    name: "Colleague",
    role: "Team Member",
    content: "Working with Yusra was a great experience. Her dedication to quality and innovative approach sets her apart.",
  },
];

export const faqs: FAQ[] = [
  {
    question: "What services do you offer?",
    answer: "I offer a wide range of services including AI agent development, full-stack web development, cloud deployment, DevOps setup, UI/UX design, and business technology consulting.",
  },
  {
    question: "What technologies do you specialize in?",
    answer: "I specialize in Next.js, React, TypeScript, Node.js, Python, AI/ML integration, cloud services (AWS, GCP, Azure), Docker, and modern DevOps practices.",
  },
  {
    question: "How can I hire you?",
    answer: "You can reach out through the contact form on this website, email me at yusraateeq112@gmail.com, or connect on LinkedIn.",
  },
  {
    question: "Are you available for freelance projects?",
    answer: "Yes, I'm open to freelance opportunities and collaborations. Feel free to reach out with your project details.",
  },
  {
    question: "Do you offer ongoing maintenance?",
    answer: "Yes, I provide ongoing maintenance, support, and optimization services for projects I develop.",
  },
];
