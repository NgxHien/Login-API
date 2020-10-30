export interface ResponseCodeItem {
  code: number;
  alias?: string;
  data: unknown;
  msg: string;
}

export default class CodeMap {
  private mapper: Map<number | string, ResponseCodeItem>;

  public constructor() {
    this.mapper = new Map();
  }

  public install(codeList: ResponseCodeItem[]): void {
    for (let item of codeList) {
      const { code, alias } = item;
      this.mapper.set(code, item);
      if (alias) {
        this.mapper.set(alias, item);
      }
    }
  }

  public get(key: number | string): ResponseCodeItem | undefined {
    return this.mapper.get(key);
  }

  public has(key: number | string): boolean {
    return this.mapper.has(key);
  }
}
