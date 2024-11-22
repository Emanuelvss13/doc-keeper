export interface IStorage {
  upload(filename: string, filepath: string): Promise<void>;
  delete(filepath: string): Promise<void>;
}
