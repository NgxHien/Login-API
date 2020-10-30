import I18n from '../src/i18n';
import { i18nList } from './test-demo';

describe('i18n.test.ts', () => {
  const i18n = new I18n();
  i18n.install(i18nList);
  test('I18n.prototype.get', () => {
    expect(i18n.get('testError1', 'cn')).toEqual(i18nList.cn.testError1);
    expect(i18n.get('testError3', 'cn')).toEqual(i18nList.cn.testError3);
    expect(i18n.get('testError1', 'ru')).toEqual(i18nList.ru.testError1);
    expect(i18n.get('testError3', 'ru')).toBeUndefined();
  });
});
