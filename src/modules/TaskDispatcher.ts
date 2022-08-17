type Task = () => Promise<unknown>;

class TaskDispatcher {
  private queue: Task[];

  private workers: Promise<void>[];

  private readonly concurrency: number;

  /**
   * Main routine for a pooled promise.
   */
  private async promiseMain() {
    while (true) {
      const job = this.queue.shift();
      if (job === undefined) {
        break;
      }
      await job();
    }
  }

  public constructor(concurrency: number) {
    this.queue = [];
    this.workers = [];
    this.concurrency = concurrency;
  }

  /**
   * Add a task to the queue to run it later.
   * @param task task
   */
  public enqueue(task: Task): void {
    this.queue.push(task);
  }

  public async run(): Promise<unknown> {
    this.workers = [];
    for (let i = 0; i < this.concurrency; i++) {
      this.workers.push(this.promiseMain());
    }
    return Promise.all(this.workers);
  }
}

export default TaskDispatcher;
