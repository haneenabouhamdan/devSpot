export interface ICloudStorageAPI {
  getSignedReadUrl(filePath: string): Promise<string>;

  getFileContents(filePath: string): any;
}
