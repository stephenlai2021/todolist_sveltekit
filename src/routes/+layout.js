import { locale, loadTranslations } from '$lib/i18n/translations';

export const load = async ({ url }) => {
	const { pathname } = url;
	const defaultLocale = 'zh-TW'; 
	const initLocale = locale.get() || defaultLocale;
	await loadTranslations(initLocale, pathname);
	return {};
};
