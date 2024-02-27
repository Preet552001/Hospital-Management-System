import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {TotalNumberService} from '../service/total-number.service'
import { NgxSpinnerService } from "ngx-spinner";
import{Chart, registerables} from 'node_modules/chart.js'
Chart.register(...registerables)

@Component({
  selector: 'app-hospital-dashboard',
  templateUrl: './hospital-dashboard.component.html',
  styleUrls: ['./hospital-dashboard.component.css']
})
export class HospitalDashboardComponent {

  constructor(private activeRoute:ActivatedRoute, private dialog: MatDialog,private totalNumber:TotalNumberService  ,   private spinner: NgxSpinnerService,
    ){
      this.spinner.show();
    }

  panelOpenState = false;

  showFiller = false;

  lable:any[]=[]
  data:any[]=[]  
  numBlock:number
  numRoom:number
  numNurse:number
  numPatient:number
  numPhysician:number
  numTreatment:number

  ngOnInit(){
    this.totalNumber.setData()
    // this.data=[this.numNurse,this.numPatient,this.numPhysician]
    this.activeRoute.fragment.subscribe((data)=>// console.log(data)
    // console.log(data)
    this.jumpToSection(data))
    this.totalNumber.numTreatment$.asObservable().subscribe((data)=>{
      this.numTreatment=data
      this.spinner.hide();
    })
    this.totalNumber.numBlock$.asObservable().subscribe((data)=>{
      this.numBlock=data
      this.spinner.hide();

    })
    this.totalNumber.numNurse$.asObservable().subscribe((data)=>{
      this.numNurse=data
      this.spinner.hide();

    })
    this.totalNumber.numPatient$.asObservable().subscribe((data)=>{
      this.numPatient=data
      this.spinner.hide();

    })
    this.totalNumber.numPhysician$.asObservable().subscribe((data)=>{
      this.numPhysician=data
      this.spinner.hide();
    })
    this.totalNumber.numRoom$.asObservable().subscribe((data)=>{
      this.numRoom=data
      this.spinner.hide();
    })
    this.totalNumber.pieChart$.asObservable().subscribe((data)=>{
      this.lable=[]
      this.data=[]
      data.forEach(element=>{
        this.lable.push(element.lable)
        this.data.push(element.data)
      })
      this.RenderChar(this.lable,this.data)
    })

    this.RenderChar(this.lable,this.data)
  }

  jumpToSection(section: string){
    document.getElementById(section)?.scrollIntoView({behavior:'smooth'})
  }
  RenderChar(_label,_data){
    const existingChart = Chart.getChart('piechart'); 
    if (existingChart) {
      existingChart.destroy();
    }
    const myChart =new Chart('piechart', {
      type: 'doughnut',
      data: {
        labels: _label,
        datasets: [{
          label: 'My Dataset',
          data: _data,
        }]
      },
      options: {
        // plugins: {
        //   legend: {
        //     maxHeight: 20,
        //     position: 'right',
        //   labels: {
        //     boxHeight: 10,
        //   }
        //   }
        // },
        maintainAspectRatio: false,
        responsive: true,
        aspectRatio: 1, 
    }
    });
  }
}
