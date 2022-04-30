import { closeSync, existsSync, openSync, mkdirSync } from 'fs';
import { dirname } from 'path';

export class FilesystemHelper {
  public static createFileIfNotExists(path: string): boolean {
    if (existsSync(path)) {
      return false;
    }

    if (!existsSync(dirname(path))) {
      mkdirSync(dirname(path), { recursive: true });
    }

    closeSync(openSync(path, 'w'));
    return true;
  }
}
