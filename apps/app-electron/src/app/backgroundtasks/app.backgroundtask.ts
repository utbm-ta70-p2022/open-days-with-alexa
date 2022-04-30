import { ToadScheduler, AsyncTask, SimpleIntervalJob } from 'toad-scheduler';

export class AppBackgroundtask {
  private static instance: AppBackgroundtask;

  public static getInstance() {
    if (!AppBackgroundtask.instance) {
      AppBackgroundtask.instance = new AppBackgroundtask();
    }
    return this.instance;
  }

  private _scheduler: ToadScheduler;

  constructor() {
    this._scheduler = new ToadScheduler();
  }

  async initialize(): Promise<AppBackgroundtask> {
    this._scheduler.stop();
    this._scheduler = new ToadScheduler();

    return this;
  }

  public startWatching(item: any) {
    try {
      this._scheduler.removeById(item.id);
    } catch (error) {
      console.warn(error.message);
    }

    const handler = async () => {
      // TODO
    };

    const errorHandler = async (error: unknown) => {
      console.log(error);
    };

    this._scheduler.addSimpleIntervalJob(
      new SimpleIntervalJob(
        { seconds: item.healthCheckInterval, runImmediately: true },
        new AsyncTask(item.id, handler, errorHandler)
      )
    );
  }

  public stopWatching(item: any) {
    this._scheduler.removeById(item.id);
  }
}
