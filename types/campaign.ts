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
  userProfile: userProfile;
  daysLeft: number;
  shortDescription: string;
  volunteers: string;
  donatercount: string;
  isvolunteer: boolean;
}

interface userProfile {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  avatar: string;
  verified: boolean;
  roles: string;
}

export type { Campaign, userProfile };
