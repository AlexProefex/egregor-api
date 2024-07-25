import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';


@Injectable()
export class StorageService {
  private readonly storage:Storage;
  constructor(){
    const Project_id = 'proyecto-egregor-test';
    const key_project ='key_project.json';
    this.storage = new Storage({
      projectId: Project_id,
      keyFilename: key_project
    })
  }
  


  async uploadFileGroup(path:any){
    const bucket_name = 'proyecto-egregor-test';
    const bucket = this.storage.bucket(bucket_name);
    const result = await bucket.upload(path);

  }
}
