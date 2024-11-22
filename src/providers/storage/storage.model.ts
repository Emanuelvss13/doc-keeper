export interface IStorage {
  getSignedUrl(filename: string): Promise<string>;
  upload(filename: string, filepath: string): Promise<void>;
  delete(filepath: string): Promise<void>;
}
