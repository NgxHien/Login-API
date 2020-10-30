interface LangDatas {
  [alias: string]: string;
}
export interface I18nList {
  [langCode: string]: LangDatas;
}
export default class I18n {
  private mapper: Map<string, string>;

  public constructor() {
    this.mapper = new Map();
  }

  public install(i18nList: I18nList): void {
    for (let [langCode, langDatas] of Object.entries(i18nList)) {
      for (let [alias, lang] of Object.entries(langDatas)) {
        let key = `${alias}_${langCode}`;
        this.mapper.set(key, lang);
      }
    }
  }

  public get(alias: string, langCode: string): string | undefined {
    return this.mapper.get(`${alias}_${langCode}`);
  }
}
