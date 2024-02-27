import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoomPost } from '../interface/roomPost';
import { Room } from '../interface/room';

@Injectable({
  providedIn: 'root'
})
export class RoomApiService {

  constructor(private http:HttpClient) { }
  
  roomApi:string='https://gdtc-training-api.azurewebsites.net/api/hospital/room';
  
  getAllRoom(){
    return  this.http.get<Room[]>(this.roomApi);
  }

  postRoom(room:RoomPost){
    return this.http.post(this.roomApi,room)
  }

  putRoom(room:Room){
    return this.http.put(this.roomApi,room)
  }

  deleteRoom(room:Room){
    return this.http.delete(this.roomApi,{body:room})
  }
}
