import { Badge } from "./ui/badge";
import {
  UtensilsCrossed,
  Pill,
  CreditCard,
  HeartPulse,
  ShoppingBasket,
  ShoppingBag,
  Smartphone,
  Plug,
  Banknote,
  Cpu,
  GraduationCap,
  PlayCircle,
  Car,
  Wrench,
  Plane,
  Globe2,
  BedDouble,
  CircleHelp,
  LucideIcon
} from "lucide-react";

export const categoryIcons: Record<string, LucideIcon> = {
  "Food & Dining": UtensilsCrossed,
  "Health & Pharmacy": Pill,
  "Credit Card": CreditCard,
  "Health & Wellness": HeartPulse,
  "Groceries": ShoppingBasket,
  "Retail & Shopping": ShoppingBag,
  "Digital Payments": Smartphone,
  "Utilities": Plug,
  "Financial Services": Banknote,
  "Digital Services": Cpu,
  "Education & Learning": GraduationCap,
  "Entertainment & Subscriptions": PlayCircle,
  "Transportation": Car,
  "Automative": Wrench,
  "Travel / Airlines": Plane,
  "Travel & Leisure": Globe2,
  "Hotels & Lodging": BedDouble,
};

function getCategoryIcon(category: string): LucideIcon {
  return categoryIcons[category] ?? CircleHelp;
}

export const CategoryBadge = ({ text }: { text: string }) => {
  const Icon = getCategoryIcon(text);

  return (
    <Badge variant='outline'>
      <Icon />
      {text}
    </Badge>
  )
}
