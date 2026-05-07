import type { Campaign, Donation, Notification, Orphan } from "~/types/orphan";
import { seedCampaigns, seedDonations, seedNotifications, seedOrphans } from "~/utils/orphanSeed";

export function useOrphanyStore() {
  const orphans = useState<Orphan[]>("orphany-orphans", () => structuredClone(seedOrphans));
  const campaigns = useState<Campaign[]>("orphany-campaigns", () => structuredClone(seedCampaigns));
  const donations = useState<Donation[]>("orphany-donations", () => structuredClone(seedDonations));
  const notifications = useState<Notification[]>(
    "orphany-notifications",
    () => structuredClone(seedNotifications),
  );

  return {
    orphans,
    campaigns,
    donations,
    notifications,
  };
}
