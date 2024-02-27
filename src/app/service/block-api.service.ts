import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlockPost } from '../interface/blockPost';
import { Block } from '../interface/block';

@Injectable({
  providedIn: 'root'
})
export class BlockApiService {

  constructor(private http:HttpClient) { }
  
  blockApi:string='https://gdtc-training-api.azurewebsites.net/api/hospital/block';
  
  getAllBlock(){
    return  this.http.get(this.blockApi);
  }
  getBlock(blockId:number){
    return this.http.get(`${this.blockApi}/${blockId}`)
  }
  postBlock(block:BlockPost){
    return this.http.post(this.blockApi,block)
  }

  putBlock(block:Block){
    return this.http.put(this.blockApi,block)
  }

  deleteBlock(block:Block){
    return this.http.delete(this.blockApi,{body:block})
  }
}
