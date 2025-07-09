import { Tag, Target, ImageIcon, Quote } from "lucide-react";

const steps = [
  { id: 1, title: "Category", description: "Choose campaign type", icon: Tag },
  { id: 2, title: "Basic Info", description: "Campaign details", icon: Target },
  {
    id: 3,
    title: "Media & Options",
    description: "Image & volunteers",
    icon: ImageIcon,
  },
  { id: 4, title: "Description", description: "Rich content", icon: Quote },
];

const categoriesWithDetails = [
  {
    id: "medical",
    name: "Medical & Health",
    description: "Medical treatments, surgeries, and health emergencies",
    icon: "🏥",
    color: "bg-red-50 border-red-200 hover:bg-red-100",
    iconBg: "bg-red-100",
  },
  {
    id: "education",
    name: "Education",
    description: "School fees, educational programs, and learning resources",
    icon: "🎓",
    color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    iconBg: "bg-blue-100",
  },
  {
    id: "emergency",
    name: "Emergency & Disaster Relief",
    description: "Natural disasters, accidents, and urgent situations",
    icon: "🚨",
    color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
    iconBg: "bg-orange-100",
  },
  {
    id: "community",
    name: "Community & Social",
    description: "Community projects, social causes, and local initiatives",
    icon: "🤝",
    color: "bg-green-50 border-green-200 hover:bg-green-100",
    iconBg: "bg-green-100",
  },
  {
    id: "arts",
    name: "Arts & Culture",
    description: "Creative projects, cultural events, and artistic endeavors",
    icon: "🎨",
    color: "bg-pink-50 border-pink-200 hover:bg-pink-100",
    iconBg: "bg-pink-100",
  },
  {
    id: "environment",
    name: "Environment",
    description: "Environmental protection, conservation, and sustainability",
    icon: "🌱",
    color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
    iconBg: "bg-emerald-100",
  },
  {
    id: "technology",
    name: "Technology",
    description: "Tech projects, innovation, and digital solutions",
    icon: "💻",
    color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100",
    iconBg: "bg-indigo-100",
  },
  {
    id: "other",
    name: "Other",
    description: "Unique projects that don't fit other categories",
    icon: "✨",
    color: "bg-gray-50 border-gray-200 hover:bg-gray-100",
    iconBg: "bg-gray-100",
  },
];

export { steps, categoriesWithDetails };
