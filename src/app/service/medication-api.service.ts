import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MedicationPost } from '../interface/medicationPost';
import { Medication } from '../interface/medication';

@Injectable({
  providedIn: 'root'
})
export class MedicationApiService {

  constructor(private http:HttpClient) { }
  
  medicationApi:string='https://gdtc-training-api.azurewebsites.net/api/hospital/medication';
  
  getAllMedication(){
    return  this.http.get(this.medicationApi);
  }

  postMedication(medication:MedicationPost){
    return this.http.post(this.medicationApi,medication)
  }

  putMedication(medication:Medication){
    return this.http.put(this.medicationApi,medication)
  }

  deleteMedication(medication:Medication){
    return this.http.delete(this.medicationApi,{body:medication})
  }

}
