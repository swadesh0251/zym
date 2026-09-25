export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export type ClassCategory = 'All' | 'Hyrox & Conditioning' | 'Olympic Lifting' | 'Power & Strength' | 'Recovery & Mobility' | 'Boxing Athletic';

export interface ClassSession {
  id: string;
  title: string;
  category: 'Hyrox & Conditioning' | 'Olympic Lifting' | 'Power & Strength' | 'Recovery & Mobility' | 'Boxing Athletic';
  day: DayOfWeek;
  startTime: string;
  durationMinutes: number;
  instructor: string;
  instructorAvatar: string;
  location: string;
  capacity: number;
  enrolled: number;
  intensityScore: 1 | 2 | 3 | 4 | 5;
  description: string;
  prerequisites?: string;
}

export interface Trainer {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  certifications: string[];
  experienceYears: number;
  personalRecord: string;
  bio: string;
  image: string;
  availability: string;
}

export interface FacilityZone {
  id: string;
  name: string;
  subtitle: string;
  sqft: string;
  description: string;
  highlights: string[];
  equipment: string[];
  image: string;
  specTag: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPricePerMonth: number;
  tagline: string;
  isPopular?: boolean;
  features: string[];
  highlightBadge?: string;
}

export interface Booking {
  id: string;
  classId: string;
  classTitle: string;
  day: string;
  time: string;
  instructor: string;
  userName: string;
  userEmail: string;
  createdAt: string;
  bookingCode: string;
}

export interface PRRecord {
  id: string;
  lift: 'Back Squat' | 'Deadlift' | 'Bench Press' | 'Overhead Press';
  weight: number;
  unit: 'kg' | 'lbs';
  reps: number;
  estimated1RM: number;
  date: string;
}

export interface TrialPass {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  visitDate: string;
  fitnessGoal: string;
  passCode: string;
  createdAt: string;
}
