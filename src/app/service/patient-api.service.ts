import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PatientPost } from '../interface/patientPost';
import { Patient } from '../interface/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientApiService {

  constructor(private http:HttpClient) { }
  
  patientApi:string='https://gdtc-training-api.azurewebsites.net/api/hospital/patients';
  
  getAllPatient(){
    return  this.http.get(this.patientApi);
  }

  postPatient(patient:PatientPost){
    return this.http.post(this.patientApi,patient)
  }

  putPatient(patient:Patient){
    return this.http.put(this.patientApi,patient)
  }

  deletePatient(patient:Patient){
    return this.http.delete(this.patientApi,{body:patient})
  }
}
