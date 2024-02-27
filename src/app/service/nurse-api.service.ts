import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NursePost } from '../interface/nursePost';
import { Nurse } from '../interface/nurse';

@Injectable({
  providedIn: 'root'
})
export class NurseApiService {

  constructor(private http:HttpClient) { }
  
  nurseApi:string='https://gdtc-training-api.azurewebsites.net/api/hospital/nurse';
  
  getAllNurse(){
    return  this.http.get(this.nurseApi);
  }

  postNurse(nurse:NursePost){
    return this.http.post(this.nurseApi,nurse)
  }

  putNurse(nurse:Nurse){
    return this.http.put(this.nurseApi,nurse)
  }

  deleteNurse(nurse:Nurse){
    return this.http.delete(this.nurseApi,{body:nurse})
  }
}
