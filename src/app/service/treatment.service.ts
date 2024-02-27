import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Treatment } from '../interface/treatment';
import { TreatmentPost } from '../interface/treatmentPost';


@Injectable({
  providedIn: 'root'
})
export class TreatmentApiService {

  constructor(private http:HttpClient) { }
  
  treatmentApi:string='https://gdtc-training-api.azurewebsites.net/api/hospital/procedure';
  
  getAllTreatment(){
    return  this.http.get(this.treatmentApi);
  }

  getTreatmentById(treatmentId:number){
    return  this.http.get(`${this.treatmentApi}/${treatmentId}`);
  }
  

  postTreatment(treatment:TreatmentPost){
    return this.http.post(this.treatmentApi,treatment)
  }

  putTreatment(treatment:Treatment){
    return this.http.put(this.treatmentApi,treatment)
  }

  deleteTreatment(treatment:Treatment){
    return this.http.delete(this.treatmentApi,{body:treatment})
  }
}
