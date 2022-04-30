import { appendFile, copyFile, readdir, readFile, stat } from 'fs';
import { ensureFile } from 'fs-extra';
import { injectable } from 'inversify';
import { basename, join } from 'path';
import { IManageFilesystem } from '@libraries/lib-electron';

@injectable()
export class FilesystemService implements IManageFilesystem {
  public async copy(source: string, destination: string): Promise<void> {
    return await new Promise((resolve, reject) => {
      copyFile(source, join(destination, basename(source)), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(null);
        }
      });
    });
  }

  public async readFileAsString(path: string): Promise<string> {
    return await new Promise((resolve, reject) => {
      readFile(path, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.toString());
        }
      });
    });
  }

  public async retrievefileSize(path: string): Promise<number> {
    return await new Promise((resolve, reject) => {
      stat(path, (err, stats) => {
        if (err) {
          reject(err);
        } else {
          resolve(stats.size);
        }
      });
    });
  }

  public async isFile(path: string): Promise<boolean> {
    return await new Promise<boolean>((resolve, reject) => {
      stat(path, (err, stats) => {
        if (err) {
          reject(err);
        } else {
          resolve(stats.isFile());
        }
      });
    });
  }

  public async retrieveFilePathsInDirectory(path: string): Promise<string[]> {
    const filePahts = new Array<string>();

    const fileNames = await new Promise<string[]>((resolve, reject) => {
      readdir(path, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files);
        }
      });
    });

    for (const fileName of fileNames) {
      if (this.isFile(join(path, fileName))) {
        filePahts.push(join(path, fileName));
      }
    }

    return filePahts;
  }

  async appendToFile(text: string, path: string): Promise<void> {
    return await new Promise((resolve, reject) => {
      ensureFile(path, (err) => {
        if (err) {
          reject(err);
        }
        appendFile(path, text, { encoding: 'utf-8', flag: 'a+' }, (err) => {
          if (err) {
            reject(err);
          }
          resolve(null);
        });
      });
    });
  }
}
