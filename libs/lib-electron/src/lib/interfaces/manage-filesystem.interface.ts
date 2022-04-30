export interface IManageFilesystem {
  copy(source: string, destination: string): Promise<void>;
  readFileAsString(path: string): Promise<string>;
  retrievefileSize(path: string): Promise<number>;
  isFile(path: string): Promise<boolean>;
  retrieveFilePathsInDirectory(path: string): Promise<string[]>;
  appendToFile(text: string, path: string): Promise<void>;
}
