export type Orphan = {
  id: string;
  name: string;
  age: number;
  status: "Sponsored" | "Partially Funded" | "Awaiting Sponsor";
  urgency: "Low" | "Medium" | "High";
  needs: string[];
  monthlyCost: number;
  raised: number;
  image: string;
  story: string;
  location: string;
};

export type Campaign = {
  id: string;
  name: string;
  description: string;
  goal: number;
  raised: number;
  category: "Ramadan" | "Education" | "Medical" | "Emergency";
  endsAt: string;
};

export type Donation = {
  id: string;
  amount: number;
  date: string;
  type: "Sponsorship" | "Campaign" | "One-time";
  target: string;
  status: "Completed" | "Upcoming" | "Pending";
};

export type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  unread?: boolean;
};
