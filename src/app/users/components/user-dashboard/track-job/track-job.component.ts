import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashCommonService } from '../dash-common.service';
import 'leaflet-routing-machine'

import { NzImageService } from 'ng-zorro-antd/image';
import { CommonService } from 'src/app/common.service';


import * as L from 'leaflet';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-track-job',
  templateUrl: './track-job.component.html',
  styleUrls: ['./track-job.component.css']
})
export class TrackJobComponent implements OnInit {
  jobId: any;
  pickupdate: any;
  pickuptime: any;
  datePickup: any;
  timePickup: any;
  userLoginData: any;
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
  constructor(private route: ActivatedRoute, private commonservice: DashCommonService, private nzImageService: NzImageService, private cityService: CommonService) { }
  ngOnInit() {
    debugger
    this.route.paramMap.subscribe(params => {
      // Retrieve the ID from the route parameters
      this.jobId = params.get('id');
      console.log('Job ID:', this.jobId);
      this.commonservice.getmanageCargo(this.jobId);
      this.commonservice.getUserBookingReacodByID(this.jobId);

    });
    // Assuming you want to display the date and time of the first element in managecargodata



    this.commonservice.managecargodata.forEach((element: {
      trackingId: any;
      id: any;
    }) => {

      // this.cargoId=element.id; 
      this.trackingid = element.trackingId
      // alert(this.cargoId); 


    });
    if (this.trackingid === this.jobId) {
      const element = this.commonservice.managecargodata[0]; // Get the first element

      const date = new Date(element.currentDate);
      const time = new Date(element.pickuptime);
      this.datePickup = date.toLocaleDateString('en-US');
      this.timePickup = time.toLocaleTimeString('en-US');
      this.deliveryProf = element.deliveryProof
      console.log(this.deliveryProf);
      this.ReciverSignature = element.reciverSignature
      console.log(this.ReciverSignature);
      this.status = element.cargoStatus
      if (this.status === 'Processing') {
        this.curentvalue = 3
      } else if (this.status === 'On the Way') {
        this.curentvalue = 4
      } else if (this.status === 'Delivered') {
        this.curentvalue = 7
      } else {
        this.curentvalue = 1
      }
    }


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

  }


  private initMap(): void {
    this.map = L.map('map').setView([0, 0], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
    
    debugger

    if (this.liveLocationlatitude) {


      L.marker([this.liveLocationlatitude, this.liveLocationlongitude]).addTo(this.map)
        .bindPopup('Pick-up Location').openPopup();
    }



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
            L.marker([this.liveLocationlatitude, this.liveLocationlongitude]).addTo(this.map)
              .bindPopup('Pick-up Location').openPopup();
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

}
