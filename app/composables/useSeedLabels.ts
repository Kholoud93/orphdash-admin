import type { Campaign, Donation, Orphan } from "~/types/orphan";

const orphanStatusKey: Record<Orphan["status"], string> = {
  Sponsored: "seed.orphanStatus.sponsored",
  "Partially Funded": "seed.orphanStatus.partiallyFunded",
  "Awaiting Sponsor": "seed.orphanStatus.awaitingSponsor",
};

const urgencyKey: Record<Orphan["urgency"], string> = {
  Low: "seed.urgency.low",
  Medium: "seed.urgency.medium",
  High: "seed.urgency.high",
};

const campaignCategoryKey: Record<Campaign["category"], string> = {
  Ramadan: "seed.campaignCategory.ramadan",
  Education: "seed.campaignCategory.education",
  Medical: "seed.campaignCategory.medical",
  Emergency: "seed.campaignCategory.emergency",
};

const donationTypeKey: Record<Donation["type"], string> = {
  Sponsorship: "seed.donationType.sponsorship",
  Campaign: "seed.donationType.campaign",
  "One-time": "seed.donationType.oneTime",
};

function needKey(label: string): string {
  const map: Record<string, string> = {
    Education: "seed.need.education",
    Clothing: "seed.need.clothing",
    Medical: "seed.need.medical",
    Food: "seed.need.food",
  };
  return map[label] ?? "";
}

const donationTargetKey: Record<string, string> = {
  "General Fund": "seed.donationTarget.generalFund",
};

export function useSeedLabels() {
  const { t, te, locale } = useI18n();

  function translateWithFallback(key: string, fallback: string) {
    if (!key || !te(key)) return fallback;
    return t(key);
  }

  function translateEnum<T extends string>(map: Record<T, string>, value: T) {
    return translateWithFallback(map[value], value);
  }

  function formatShortDate(iso: string) {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;

    return d.toLocaleDateString(locale.value === "ar" ? "ar" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function orphanStatus(status: Orphan["status"]) {
    return translateEnum(orphanStatusKey, status);
  }

  function urgency(u: Orphan["urgency"]) {
    return translateEnum(urgencyKey, u);
  }

  function campaignCategory(c: Campaign["category"]) {
    return translateEnum(campaignCategoryKey, c);
  }

  function donationType(d: Donation["type"]) {
    return translateEnum(donationTypeKey, d);
  }

  function need(label: string) {
    const k = needKey(label);
    return translateWithFallback(k, label);
  }

  function donationTarget(target: string) {
    const k = donationTargetKey[target];
    return k ? translateWithFallback(k, target) : target;
  }

  function notificationField(id: string, field: "title" | "body" | "time", fallback: string) {
    return translateWithFallback(`seed.notification.${id}.${field}`, fallback);
  }

  return {
    orphanStatus,
    urgency,
    campaignCategory,
    donationType,
    need,
    donationTarget,
    notificationField,
    formatShortDate,
  };
}