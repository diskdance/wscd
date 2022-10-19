import { test, expect, vi } from 'vitest';
import ConnectivityChecker from '../src/modules/ConnectivityChecker';

function getMockedResponse(obj: Record<string, unknown>) {
  return {
    json() {
      return obj;
    },
  };
}

test('ConnectivityCheck', async () => {
  const perDomainCheckStarted = vi.fn();
  const perDomainFinished = vi.fn();

  const mockedFetch = vi.fn(async (url: string) => {
    switch (url) {
      case 'https://test.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&meta=userinfo&uiprop=blockinfo&origin=*':
        return getMockedResponse({
          query: {
            userinfo: {
              id: 1,
              name: '127.0.0.1',
              anon: true,
              blockid: 1,
            },
          },
        });
      case `https://test2.wikipedia.org/favicon.ico?wscd=${APP_VERSION}&nocache=1`:
        return null;
      case 'https://test.wikidata.org/w/api.php?action=query&format=json&formatversion=2&meta=userinfo&uiprop=blockinfo&origin=*':
        return getMockedResponse({
          query: {
            userinfo: {
              id: 1,
              name: '127.0.0.1',
              anon: true,
            },
          },
        });
      case 'https://test.wikidata.org/w/api.php?action=query&list=globalblocks&bgip=127.0.0.1&bgprop=address&format=json&formatversion=2&origin=*':
        return getMockedResponse({
          query: {
            globalblocks: [
              {
                address: '127.0.0.1',
              },
            ],
          },
        });
      case 'https://private.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&meta=userinfo&uiprop=blockinfo&origin=*':
        return getMockedResponse({
          whatever: 'lol this is a private wiki',
        });
      default:
        throw new Error('You should not be here!');
    }
  });

  vi.stubGlobal('fetch', mockedFetch);
  vi.useFakeTimers().setSystemTime(new Date(1));

  const checker = new ConnectivityChecker(
    [
      ['test.wikipedia.org', true],
      ['test2.wikipedia.org', false],
      ['test.wikidata.org', true],
      ['private.wikipedia.org', true],
    ],
    perDomainCheckStarted,
    perDomainFinished,
    1,
  );

  await checker.check();

  expect(perDomainCheckStarted).toBeCalledTimes(4);

  expect(perDomainFinished).toBeCalledTimes(4);

  expect(mockedFetch).nthCalledWith(
    1,
    'https://test.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&meta=userinfo&uiprop=blockinfo&origin=*',
    {
      method: 'GET',
      cache: 'no-store',
      headers: { 'Api-User-Agent': `wscd/${APP_VERSION}` },
      signal: expect.any(AbortSignal),
    },
  );

  expect(mockedFetch).nthCalledWith(
    2,
    'https://test2.wikipedia.org/favicon.ico',
    {
      method: 'GET',
      cache: 'no-store',
      headers: { 'Api-User-Agent': `wscd/${APP_VERSION}` },
      mode: 'no-cors',
      signal: expect.any(AbortSignal),
    },
  );

  expect(mockedFetch).nthCalledWith(
    3,
    'https://test.wikidata.org/w/api.php?action=query&format=json&formatversion=2&meta=userinfo&uiprop=blockinfo&origin=*',
    {
      method: 'GET',
      cache: 'no-store',
      headers: { 'Api-User-Agent': `wscd/${APP_VERSION}` },
      signal: expect.any(AbortSignal),
    },
  );

  expect(mockedFetch).nthCalledWith(
    4,
    'https://test.wikidata.org/w/api.php?action=query&list=globalblocks&bgip=127.0.0.1&bgprop=address&format=json&formatversion=2&origin=*',
    {
      method: 'GET',
      cache: 'no-store',
      headers: { 'Api-User-Agent': `wscd/${APP_VERSION}` },
      signal: expect.any(AbortSignal),
    },
  );

  expect(mockedFetch).nthCalledWith(
    5,
    'https://private.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&meta=userinfo&uiprop=blockinfo&origin=*',
    {
      method: 'GET',
      cache: 'no-store',
      headers: { 'Api-User-Agent': `wscd/${APP_VERSION}` },
      signal: expect.any(AbortSignal),
    },
  );
});
