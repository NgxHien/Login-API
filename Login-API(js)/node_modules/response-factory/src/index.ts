import CodeMap, { ResponseCodeItem } from './codemap';
import I18n, { I18nList } from './i18n';

type Response = Pick<ResponseCodeItem, 'code' | 'data' | 'msg'>;

export default class ResponseFactory {
  private codeMap: CodeMap;
  private i18nMap: I18n;

  public constructor() {
    this.codeMap = new CodeMap();
    this.i18nMap = new I18n();
  }

  public setMap(codeList: ResponseCodeItem[]): void {
    this.codeMap.install(codeList);
  }

  public i18n(i18nList: I18nList): void {
    this.i18nMap.install(i18nList);
  }

  public get(key: string | number, langCode?: string): Response | undefined {
    if (!this.codeMap.has(key)) {
      // 匹配不到
      return void 0;
    }
    let { code, alias, data, msg } = this.codeMap.get(key) as ResponseCodeItem;

    if (alias && langCode) {
      let langMsg = this.i18nMap.get(alias, langCode);
      langMsg && (msg = langMsg);
    }
    return { code, data, msg };
  }
}
