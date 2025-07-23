interface Campaign {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  donationGoal: number;
  currentDonation: number;
  category: string;
  isFeatured: false;
  heroimage: string;
  organizer: organizer;
  daysLeft: number;
  shortDescription: string;
  volunteers: string;
  donatercount: string;
  isvolunteer: boolean;
}

interface organizer {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  avatar: string;
  verified: boolean;
  roles: string;
}

export type { Campaign, organizer };
