import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PhysicianPost } from '../interface/physicianPost';
import { Physician } from '../interface/physician';

@Injectable({
  providedIn: 'root'
})
export class PhysicianApiService {

  constructor(private http:HttpClient) { }
  
  physicianApi:string='https://gdtc-training-api.azurewebsites.net/api/hospital/physician';
  
  getAllPhysician(){
    return  this.http.get(this.physicianApi);
  }

  getPhysician(physicianId:number){
    return  this.http.get(`${this.physicianApi}/${physicianId}`);
  }
  postPhysician(physician:PhysicianPost){
    return this.http.post(this.physicianApi,physician)
  }

  putPhysician(physician:Physician){
    return this.http.put(this.physicianApi,physician)
  }

  deletePhysician(physician:Physician){
    return this.http.delete(this.physicianApi,{body:physician})
  }
}
