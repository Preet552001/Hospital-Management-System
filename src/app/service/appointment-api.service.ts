import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppointmentPost } from '../interface/appointmentPost';
import { Appointment } from '../interface/appointment';
@Injectable({
  providedIn: 'root'
})
export class AppointmentApiService {

  constructor(private http:HttpClient) { }
  
  appointmentApi:string='https://gdtc-training-api.azurewebsites.net/api/hospital/appointment';
  
  getAllAppointment(){
    return  this.http.get(this.appointmentApi);
  }
  getAppointment(appointmentId:number){
    return this.http.get(`${this.appointmentApi}/${appointmentId}`)
  }
  getAppointmentByOncallId(OncallId:number){
    return this.http.get(`${this.appointmentApi}/oncall/${OncallId}`)
  }
  postAppointment(appointment:AppointmentPost){
    return this.http.post(this.appointmentApi,appointment)
  }

  putAppointment(appointment:Appointment){
    return this.http.put(this.appointmentApi,appointment)
  }

  deleteAppointment(appointment:Appointment){
    return this.http.delete(this.appointmentApi,{body:appointment})
  }

}
