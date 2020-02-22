import en from './en';
import zh from './zh';

export const getLocale = lang => (lang.startsWith('zh') ? zh : en);
