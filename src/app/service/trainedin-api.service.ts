import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrainedIn } from '../interface/trainedin';
import { TrainedInPost } from '../interface/trainedinPost';


@Injectable({
  providedIn: 'root'
})
export class TrainedInApiService {

  constructor(private http:HttpClient) { }
  
  trainedinApi:string='https://gdtc-training-api.azurewebsites.net/api/hospital/trainedin';
  
  getAllTrainedInOfPhysician(physicianId:number){
    return this.http.get(`${this.trainedinApi}/physician/${physicianId}`)
  }

  getTrainedIn(trainedinId:number){
    return this.http.get(`${this.trainedinApi}/${trainedinId}`)
  }

  postTrainedIn(trainedin:TrainedInPost){
    return this.http.post(this.trainedinApi,trainedin)
  }

  putTrainedIn(trainedin:TrainedIn){
    return this.http.put(this.trainedinApi,trainedin)
  }

  deleteTrainedIn(trainedin:TrainedIn){
    return this.http.delete(this.trainedinApi,{body:trainedin})
  }
}
