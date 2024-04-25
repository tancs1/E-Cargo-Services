import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';
import { AgencyDashService } from '../../agency-dash-bord/agency-dash.service';
import { DriverCommonService } from '../auth/common.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { CommonService } from 'src/app/common.service';


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

  // map variable
  jobId: any;
  pickupdate: any;
  pickuptime: any;
  datePickup: any;
  timePickup: any;
  // userLoginData: any;
  trackingid: any;
  status: any;
  curentvalue: any;
  prof: any;
  sign: any;
  deliveryProf: any;
  ReciverSignature: any;
  show: boolean = false;
  src: any;
  pickuplocation: any;
  dropoffLocation: any;
  liveCoordinates$!: Observable<{ latitude: number, longitude: number } | undefined>;
  dropoffCoordinates$!: Observable<{ latitude: number, longitude: number } | undefined>;
  map!: L.Map;
  liveLocation: { latitude: number, longitude: number } | undefined;
  liveLocationlatitude: any;
  liveLocationlongitude: any;
  
  constructor(public commonservice:DriverCommonService,private coreservice:CoreService,private router:Router,private cityService:CommonService ) { }
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
  const userdata = localStorage.getItem('userdata');
  if (userdata) {
    debugger

    const data = JSON.parse(userdata);
    this.pickuplocation = data.pickupLocation;
    this.dropoffLocation = data.dropoffLocation;
    // Wrap the liveLocation value in an Observable
    this.liveCoordinates$ = of(this.liveLocation);
    console.log("    this.liveCoordinates$", this.liveCoordinates$);

    this.dropoffCoordinates$ = this.cityService.getCoordinates(this.dropoffLocation);
    console.log("this.dropoffCoordinates$ ", this.dropoffCoordinates$);

  }
  this.initMap();
  this.getLiveLocation()
this.drawRoute()
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
  
  // map logic
  



private initMap(): void {
  this.map = L.map('map').setView([0, 0], 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(this.map);
  
  debugger

  



  this.dropoffCoordinates$.subscribe(coordinates => {
    if (coordinates) {
      debugger
      console.log("drop", coordinates);

      L.marker([coordinates.latitude, coordinates.longitude]).addTo(this.map)
        .bindPopup('Drop-off Location').openPopup();
    }
  });
}



onClick(imageType: string): void {
  if (imageType === 'prof') {
    this.src = this.deliveryProf;
    this.show = true
  } else if (imageType === 'sign') {
    this.src = this.ReciverSignature;
  }


}
getLiveLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("position", position);

        const latitude = position.coords.latitude;
        this.liveLocationlatitude = latitude
        console.log("latitude", typeof latitude);

        const longitude = position.coords.longitude;
        console.log("longitude", longitude);

        this.liveLocationlongitude = longitude
        this.liveLocation = { latitude, longitude };
        console.log('Live location:', this.liveLocation);
        if (this.liveLocationlatitude) {
          L.marker([this.liveLocationlatitude, this.liveLocationlongitude]).addTo(this.map).bindPopup('Pick-up Location').openPopup();
        }
      },
      (error) => {
        console.error('Error getting live location:', error.message);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
}
drawRoute(): void {

    this.dropoffCoordinates$.subscribe(dropoffCoordinates => {
      if (dropoffCoordinates) {
        
        if(this.liveLocation && this.liveLocation.latitude && this.liveLocation.longitude && this.dropoffCoordinates$){
          const pickUpLatLng = L.latLng(this.liveLocation.latitude, this.liveLocation.longitude);
          const dropOffLatLng = L.latLng(dropoffCoordinates.latitude, dropoffCoordinates.longitude);
          

        // Clear previous routes if any
        if (this.map) {
          this.map.eachLayer((layer:any) => {
            if (layer instanceof (L as any).Routing.Control) {
              this.map.removeControl(layer);
            }
          });
        }

        // Create a routing control and add it to the map
        (L as any).Routing.control({
          waypoints: [pickUpLatLng, dropOffLatLng],
          routeWhileDragging: true
        }).addTo(this.map);
        }
      }
    });
  
}}


