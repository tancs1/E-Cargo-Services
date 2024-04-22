import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';
import { AgencyDashService } from '../agency-dash.service';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-AgencyDashBord',
  templateUrl: './AgencyDashBord.component.html',
  styleUrls: ['./AgencyDashBord.component.css']
})
export class AgencyDashBordComponent implements OnInit {
  username: any;
  userLoginData: any;
  jobcount: any;
  selectedCartItem: any;
  jobproc: any;
  jobontheway: any;
  jobdelv: any;
singleValue: any;
drivers:any=[]
  driverForm: FormGroup;
  constructor(public commonservice:AgencyDashService,private coreservice:CoreService,private fb: FormBuilder ) {
    this.driverForm = this.fb.group({
    // Require selection of goods type
      selectedDriver: ['None'] // Optional selection of helper
    });
   }
  ngOnInit() {
  debugger
  const loginUser=localStorage.getItem('LoginAgency')
  if(loginUser) {
  this.userLoginData=JSON.parse(loginUser)
  this.userLoginData.forEach((element: {
    id: any; fullname: any; 
}) => {
    this.username=element.fullname

    this.commonservice.getuserrecord(element.id)
  });
  console.log(this.username);
  
  }
  this.commonservice.jobAcceptcountData$.subscribe(data => {
  this.jobcount = data
  })
  this.commonservice.jobProcessingcount$.subscribe(data => {
  this.jobproc = data
  })
  this.commonservice.jobonthewaycount$.subscribe(data => {
  this.jobontheway = data
  })
  this.commonservice.jobDeliverCount$.subscribe(data => {
  this.jobdelv = data
  })

  this.coreservice.getDriverRecord().subscribe(driverRecord => {
    this.drivers= driverRecord 
    console.log(driverRecord);
    console.log(this.drivers);
    
    
})
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
  

  //modal
  isVisible = false;

  showModal(): void {
    this.isVisible = true;

 
  }

  handleOk(id:any): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
    console.log(this.driverForm.value.selectedDriver);
    console.log("job Id",id);
    this.coreservice.getOrderAcceptRecordByIdonly(id).subscribe(data=>{
      const alljobRecod=data
      console.log(data);
      
    })
    
    
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  // drop down
 
}
