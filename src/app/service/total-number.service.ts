import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TreatmentApiService } from '../service/treatment.service';
import { RoomApiService } from '../service/room-api.service';
import { PhysicianApiService } from '../service/physician-api.service';
import { PatientApiService } from '../service/patient-api.service';
import { NurseApiService } from '../service/nurse-api.service';
import { BlockApiService } from '../service/block-api.service';
import { chartData } from '../interface/chartData'
@Injectable({
  providedIn: 'root',
})
export class TotalNumberService {
  constructor(
    private treatmentGetAllApi: TreatmentApiService,
    private roomGetAllApi: RoomApiService,
    private physicianGetAllApi: PhysicianApiService,
    private patientGetAllApi: PatientApiService,
    private nurseGetAllApi: NurseApiService,
    private blockGetAllApi: BlockApiService,
  ) {}

  numBlock$: BehaviorSubject<number> = new BehaviorSubject(0);
  numRoom$: BehaviorSubject<number> = new BehaviorSubject(0);
  numNurse$: BehaviorSubject<number> = new BehaviorSubject(0);
  numPatient$: BehaviorSubject<number> = new BehaviorSubject(0);
  numPhysician$: BehaviorSubject<number> = new BehaviorSubject(0);
  numTreatment$: BehaviorSubject<number> = new BehaviorSubject(0);
  pieChart$: BehaviorSubject<chartData[]> = new BehaviorSubject([]);
  pieChart:chartData[]
  setData() {
    this.pieChart=[{lable: 'nurse', data:0},{lable: 'patient', data: 0},{lable:'physician',data:0}]
    
    this.treatmentGetAllApi.getAllTreatment().subscribe((data: any) => {
      this.numTreatment$.next(data.length);
    });
    this.roomGetAllApi.getAllRoom().subscribe((data) => {
      this.numRoom$.next(data.length);
    });
    this.physicianGetAllApi.getAllPhysician().subscribe((data: any) => {
      this.pieChart[2].data=data.length
      this.numPhysician$.next(data.length);
      this.pieChart$.next(this.pieChart)
    });
    this.patientGetAllApi.getAllPatient().subscribe((data:any) => {
      this.pieChart[1].data=data.length
      this.numPatient$.next(data.length)
      this.pieChart$.next(this.pieChart)
    })
    this.nurseGetAllApi.getAllNurse().subscribe((data:any) => {
      this.pieChart[0].data=data.length
      this.numNurse$.next(data.length)
      this.pieChart$.next(this.pieChart)
    })
    this.blockGetAllApi.getAllBlock().subscribe((data:any) => {
      this.numBlock$.next(data.length)
    })
  }
}
