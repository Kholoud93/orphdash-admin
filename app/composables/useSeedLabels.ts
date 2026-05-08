import type { Campaign, Donation, Orphan } from '~/types/orphan';

const KNOWN_DONATION_TARGET_IDS = new Set(['general_fund']);

export function useSeedLabels() {
    const { t, te, locale } = useI18n();

    function translateWithFallback(key: string, fallback: string) {
        if (!key || !te(key)) return fallback;
        return t(key);
    }

    function formatShortDate(iso: string) {
        const d = new Date(iso);
        if (Number.isNaN(d.getTime())) return iso;

        return d.toLocaleDateString(locale.value === 'ar' ? 'ar' : 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    }

    function orphanStatus(status: Orphan['status']) {
        return translateWithFallback(`seed.orphan_status.${status}`, status);
    }

    function urgency(u: Orphan['urgency']) {
        return translateWithFallback(`seed.urgency.${u}`, u);
    }

    function campaignCategory(c: Campaign['category']) {
        return translateWithFallback(`seed.campaign_category.${c}`, c);
    }

    function donationType(d: Donation['type']) {
        return translateWithFallback(`seed.donation_type.${d}`, d);
    }

    function need(id: Orphan['needs'][number]) {
        return translateWithFallback(`seed.need.${id}`, id);
    }

    function donationTarget(target: string) {
        if (KNOWN_DONATION_TARGET_IDS.has(target)) {
            return translateWithFallback(`seed.donation_target.${target}`, target);
        }
        return target;
    }

    function notificationField(id: string, field: 'title' | 'body' | 'time', fallback: string) {
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
