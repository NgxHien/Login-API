import ResponseFactory from '../src/index';
import { codeList, i18nList } from './test-demo';

describe('index.test.ts', () => {
  const responseFactory = new ResponseFactory();
  responseFactory.setMap(codeList);
  responseFactory.i18n(i18nList);
  test('ResponseFactory.prototype.get', () => {
    // no codemap
    expect(responseFactory.get(4)).toBeUndefined();
    // no alias
    expect(responseFactory.get(1)).toStrictEqual({
      code: codeList[0].code,
      msg: codeList[0].msg,
      data: codeList[0].data
    });
    // not use langCode
    expect(responseFactory.get(2)).toStrictEqual({
      code: codeList[1].code,
      msg: codeList[1].msg,
      data: codeList[1].data
    });
    // use langCode(cn)
    expect(responseFactory.get(1, 'cn')).toStrictEqual({
      code: codeList[0].code,
      msg: i18nList.cn['testError1'],
      data: codeList[0].data
    });
    // use langCode(ru)
    expect(responseFactory.get(1, 'ru')).toStrictEqual({
      code: codeList[0].code,
      msg: i18nList.ru['testError1'],
      data: codeList[0].data
    });
    // use langCode(ru) but no i18n
    expect(responseFactory.get(3, 'ru')).toStrictEqual({
      code: codeList[2].code,
      msg: codeList[2].msg,
      data: codeList[2].data
    });
  });
});
