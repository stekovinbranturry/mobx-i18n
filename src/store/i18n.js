import { observable, action } from 'mobx';
import { getLocale } from '../i18n';

class i18nStore {
  @observable dict = {};

  @action setLocale(lang = 'zh') {
    this.dict = getLocale(lang);
    this.locale = lang;
  }

  t(key, params) {
    const RegEx = /#{(\w+)}/g;
    let value = this.dict[key];
    if (!value) {
      return '';
    }
    if (!params) {
      return value;
    }
    value = value.replace(RegEx, (a, match) => {
      const v = params[match];
      if (v) {
        return v;
      }
      return '';
    });
    return value;
  }
}

export default new i18nStore();
