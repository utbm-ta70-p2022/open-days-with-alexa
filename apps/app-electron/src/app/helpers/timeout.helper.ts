export class TimeoutHelper {
  public static async wait(milliseconds: number): Promise<void> {
    return await new Promise((resolve, reject) => {
      if (milliseconds < 1) {
        reject(new Error('Timeout should be a strictly positive number'));
      }
      setTimeout(() => resolve(), milliseconds);
    });
  }
}
