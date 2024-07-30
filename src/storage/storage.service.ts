import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { Credentials, EgregorName } from 'src/util/constants';

@Injectable()
export class StorageService {
  private readonly storage:Storage;
  constructor(){
    const Project_id = EgregorName;
    this.storage = new Storage({
      projectId: Project_id,
      keyFilename: Credentials
    })
  }

  async removeBucketCors() {
    await this.storage.bucket(EgregorName).setCorsConfiguration([]);
  }

  async getLinks(file) {
    const [url]= await this.storage
    .bucket(EgregorName)
    .file(file)
    .getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + 36 * 60 * 60 * 1000,
    });
    return url;
  }

  async uploadFileGroup(path:any) {
    try {
      await this.removeBucketCors()
      const bucket_name = EgregorName;
      const bucket = this.storage.bucket(bucket_name);
      const result = await bucket.upload(path);
      console.log(result)
      return await result[0]?.name
    } catch(err){
      console.log(err)
      return false
    }
  }
}