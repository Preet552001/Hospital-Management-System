import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OncallPost } from '../interface/oncallPost';
import { Oncall } from '../interface/oncall';

@Injectable({
  providedIn: 'root'
})
export class OncallApiService {

  constructor(private http:HttpClient) { }
  
  oncallApi:string='https://gdtc-training-api.azurewebsites.net/api/hospital/oncall';
  
  getAllOncall(){
    return  this.http.get(this.oncallApi);
  }

  getOncallByNurseId(nurseId:number){
    return this.http.get(`${this.oncallApi}/${nurseId}`)
  }
  
  postOncall(oncall:OncallPost){
    return this.http.post(this.oncallApi,oncall)
  }

  putOncall(oncall:Oncall){
    return this.http.put(this.oncallApi,oncall)
  }

  deleteOncall(oncall:Oncall){
    return this.http.delete(this.oncallApi,{body:oncall})
  }
}
