import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { unlinkSync, writeFileSync } from 'fs';
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
      return await result[0]?.name
    } catch(err){
      console.log(err)
      return false
    }
  }

  async upload(file){
      try {
          let path = null 
          let success = null
          const base64Data = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""), 'base64');
          const name = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
          let mimeType2 = file.match(/[^:/]\w+(?=;|,)/)[0];
          writeFileSync(`public/${name}.${mimeType2}`, base64Data)
          path = `public/${name}.${mimeType2}`    
          success = await this.uploadFileGroup(path);
          if(success){
            unlinkSync(path)
          }
          return success
      }
      catch(err){
        console.log(err)
          return null;
      }
  }

  async uploadPfd(file){
    try {
        let path = null
        let success = null
        const base64Data = Buffer.from(file.replace(/^data:application\/pdf;base64,/, ""), 'base64');
        const name = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
        let mimeType2 = file.match(/[^:/]\w+(?=;|,)/)[0];
        writeFileSync(`public/${name}.${mimeType2}`, base64Data)
        path = `public/${name}.${mimeType2}`    
        success = await this.uploadFileGroup(path);
        if(success){
          unlinkSync(path)
        }
        return success
    }
    catch(err){
      console.log(err)
        return null;
    }
  }

  

  async remove(file){
    try {
        let path = null 
        let success = null
        const bucket_name = EgregorName;
        success =  await this.storage.bucket(bucket_name).file(file).delete()
    } catch(err){
      console.log(err)
        return null;
    }
}
}