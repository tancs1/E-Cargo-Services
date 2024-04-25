import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';
import { AgencyDashService } from '../../agency-dash-bord/agency-dash.service';
import { CommonService } from '../auth/common.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-driverDash',
  templateUrl: './driverDash.component.html',
  styleUrls: ['./driverDash.component.css']
})
export class DriverDashComponent implements OnInit {
  username: any;
  userLoginData: any;
  jobcount: any;
  selectedCartItem: any;
  jobproc: any;
  jobontheway: any;
  jobdelv: any;
  driverId: any;
  data: any[]=[];

  constructor(public commonservice:CommonService,private coreservice:CoreService,private router:Router ) { }
  ngOnInit() {
  debugger
  const loginUser=localStorage.getItem('LoginDriver')
  if(loginUser) {
  this.userLoginData=JSON.parse(loginUser)
  this.userLoginData.forEach((element: {
    id: any; fullName: any; 
}) => {
    this.username=element.fullName
this.driverId=element.id
    // this.commonservice.getuserrecord(element.id)
  });
  console.log(this.username);
  
  }
 this.getallJobs()

  // this.commonservice.jobAcceptcountData$.subscribe(data => {
  // this.jobcount = data
  // })
  // this.commonservice.jobProcessingcount$.subscribe(data => {
  // this.jobproc = data
  // })
  // this.commonservice.jobonthewaycount$.subscribe(data => {
  // this.jobontheway = data
  // })
  // this.commonservice.jobDeliverCount$.subscribe(data => {
  // this.jobdelv = data
  // })
   
  }
  async getallJobs(){

    this.data=  await this.coreservice.getOrderAssignToDriverBydriverId(this.driverId).toPromise()
    
  }
  // drawer
  visible = false;
  size: 'large'  = 'large';

  get title(): string {
    return `Job Details`;
  }
 
 

  showLarge(item:any): void {
    this.selectedCartItem =item
    this.size = 'large';
    this.open();
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  
}
