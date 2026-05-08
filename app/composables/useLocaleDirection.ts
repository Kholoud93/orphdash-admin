import { useI18n } from 'vue-i18n';

type LocaleItem = string | { code: string; dir?: 'rtl' | 'ltr' };
type UseLocaleDirectionOptions = { syncHtmlAttrs?: boolean };

export function useLocaleDirection(options: UseLocaleDirectionOptions = {}) {
    const syncHtmlAttrs = options.syncHtmlAttrs ?? true;
    const { locale, locales } = useI18n();

    const activeLocale = computed(() => (locales.value as LocaleItem[]).find((l: LocaleItem) => (typeof l === 'string' ? l === locale.value : l.code === locale.value)));

    const direction = computed<'rtl' | 'ltr'>(() => (activeLocale.value && typeof activeLocale.value !== 'string' && activeLocale.value.dir === 'rtl' ? 'rtl' : 'ltr'));

    const isRtl = computed(() => direction.value === 'rtl');

    const iconByDirection = <T>(rtlValue: T, ltrValue: T) => computed(() => (isRtl.value ? rtlValue : ltrValue));

    const localeLang = computed(() => locale.value);

    if (syncHtmlAttrs) {
        useHead({
            htmlAttrs: {
                dir: direction,
                lang: localeLang,
            },
        });
    }

    return {
        direction,
        isRtl,
        iconByDirection,
        localeLang,
    };
}
