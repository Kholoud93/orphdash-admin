export type OrphanStatus = 'sponsored' | 'partially_funded' | 'awaiting_sponsor';
export type OrphanUrgency = 'low' | 'medium' | 'high';
export type OrphanNeed = 'education' | 'clothing' | 'medical' | 'food';
export type CampaignCategory = 'ramadan' | 'education' | 'medical' | 'emergency';
export type DonationType = 'sponsorship' | 'campaign' | 'one_time';
export type DonationStatus = 'completed' | 'upcoming' | 'pending';

export type Orphan = {
    id: string;
    name: string;
    age: number;
    status: OrphanStatus;
    urgency: OrphanUrgency;
    needs: OrphanNeed[];
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
    category: CampaignCategory;
    endsAt: string;
};

export type Donation = {
    id: string;
    amount: number;
    date: string;
    type: DonationType;
    target: string;
    status: DonationStatus;
};

export type Notification = {
    id: string;
    title: string;
    body: string;
    time: string;
    unread?: boolean;
};
