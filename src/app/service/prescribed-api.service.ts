import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrescribedPost } from '../interface/prescribedPost';
import { Prescribed } from '../interface/prescribed';

@Injectable({
  providedIn: 'root'
})
export class PrescribedApiService {

  constructor(private http:HttpClient) { }
  
  prescribedApi:string='https://gdtc-training-api.azurewebsites.net/api/hospital/prescribed';
  
  getAllPrescribed(){
    return  this.http.get(this.prescribedApi);
  }

  getPrescribed(prescribedId:number){
    return  this.http.get(`${this.prescribedApi}/${prescribedId}`);
  }

  getPrescribedByAppointmentId(appointmentId:number){
    return  this.http.get(`${this.prescribedApi}/appointment/${appointmentId}`);
  }

  postPrescribed(prescribed:PrescribedPost){
    return this.http.post(this.prescribedApi,prescribed)
  }

  putPrescribed(prescribed:Prescribed){
    return this.http.put(this.prescribedApi,prescribed)
  }

  deletePrescribed(prescribed:Prescribed){
    return this.http.delete(this.prescribedApi,{body:prescribed})
  }
}
