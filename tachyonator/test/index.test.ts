import { main } from '../src/index';
import config from '../config';

test('aaa', async () => {
  await main(config);
  expect(true).toBe(true);
});
