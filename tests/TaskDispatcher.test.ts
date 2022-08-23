import { expect, test, vi } from 'vitest';
import TaskDispatcher from '../src/modules/TaskDispatcher';
import { resolveAfter } from '../src/modules/utils';

test('TestDispatcher', () => {
  const concurrency = 5;
  const taskDispatcher = new TaskDispatcher(concurrency);
  const mock = vi.fn(() => resolveAfter(5000));
  for (let i = 0; i < concurrency * 2; i++) {
    taskDispatcher.enqueue(mock);
  }
  taskDispatcher.run(); // Do not await
  expect(mock).toBeCalledTimes(concurrency);
});
