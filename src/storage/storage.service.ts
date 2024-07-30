import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { Credentials, EgregorName } from 'src/util/constants';
import { options } from 'src/util/expiration';


@Injectable()
export class StorageService {
  private readonly storage:Storage;
  constructor(){
    const Project_id = EgregorName;
   // const key_project = Credentials;
    this.storage = new Storage({
      projectId: Project_id,
      keyFilename: Credentials
    })
  }




  async uploadFileGroup(path:any){
    try {
      const bucket_name = EgregorName;
      const bucket = this.storage.bucket(bucket_name);
      const result = await bucket.upload(path);
      const [url]= await this.storage
      .bucket(EgregorName)
      .file(result[0]?.name)
      .getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        contentType: 'application/octet-stream',
      });


      console.log(result[0]?.name)
      console.log(url)

      return true
    }catch(err){
      console.log(err)
      return false
    }

  }
}
