import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashCommonService } from '../dash-common.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';


import { NzImageService } from 'ng-zorro-antd/image';
import { CommonService } from 'src/app/common.service';


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
  private locationUpdateInterval: any;
  dropoffCoordinates: any;
  mangcargoData: any;
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

    // const trackingData = this.commonservice.managecargodata // Get the first element
    const dataForTracking= localStorage.getItem('trackingdata')
    if(dataForTracking){
      this.mangcargoData=JSON.parse(dataForTracking)
    }
    
    this.mangcargoData.forEach((element: {
      trackingId: any;
      id: any;
    }) => {
      
      // this.cargoId=element.id; 
      this.trackingid = element.trackingId
      // alert(this.cargoId); 
      
      
    });
    if (this.trackingid === this.jobId) {
      const trackingData = this.mangcargoData[0]; // Get the first element
      

      const date = new Date(trackingData.currentDate);
      const time = new Date(trackingData.pickuptime);
      this.datePickup = date.toLocaleDateString('en-US');
      this.timePickup = time.toLocaleTimeString('en-US');
      this.deliveryProf = trackingData.deliveryProof
      console.log(this.deliveryProf);
      this.ReciverSignature = trackingData.reciverSignature
      console.log(this.ReciverSignature);
      this.status = trackingData.cargoStatus
      
      if (this.status === 'Processing') {
        this.curentvalue = 3
      } else if (this.status === 'On the Way') {
        this.curentvalue = 4
      } else if (this.status === 'Delivered') {
        this.curentvalue = 7
      } else {
        this.curentvalue = 1
      }
      this.map = L.map('map').setView([0, 0], 10);
      this.refresh()
    }

    // this.startLiveLocationUpdates()
   
    // this.initMap();
 // Schedule the function to run automatically every five seconds
 
  // this.startLiveLocationUpdates()


    // this.getLiveLocation()
// this.drawRoute()
  }
  refresh(){
    this.getmapData()
    this.initMap();
    console.log('setinterval call');
    
    // this.getLiveLocation()
    this.drawRoute()
   }
  getmapData(){
    const userdata = localStorage.getItem('userdata');
    if (userdata) {
      debugger

      const data = JSON.parse(userdata);
      this.pickuplocation = data.pickupLocation;
      this.dropoffLocation = data.dropoffLocation;
      // Wrap the liveLocation value in an Observable
      const trackingdata=this.mangcargoData.find((filter:any)=>filter.trackingId ===data.id)
      this.liveCoordinates$ = of(trackingdata.driverLocation);
      console.log("    this.liveCoordinates$", this.liveCoordinates$);
this.liveCoordinates$.subscribe((driverData)=>{
console.log('driverData', driverData);
this.liveLocation=driverData

})
      this.dropoffCoordinates$ = this.cityService.getCoordinates(this.dropoffLocation);
      this.dropoffCoordinates$.subscribe(data=>{
        console.log('dropData',data);
        this.dropoffCoordinates=data
        
      })
      // console.log("this.dropoffCoordinates$ ", this.dropoffCoordinates$);

    }
  }



 
  private initMap(): void {
    var drivericon = L.icon({
      iconUrl: '../../../../../assets/imges/8221800-removebg-preview.png',
      // shadowUrl: 'leaf-shadow.png',
  
      iconSize:     [70, 80], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      // shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
  var greenIcon = L.icon({
    iconUrl: '../../../../../assets/imges/46831-removebg-preview.png',
    // shadowUrl: 'leaf-shadow.png',

    iconSize:     [70, 80], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
   

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
    
    debugger

    



    this.dropoffCoordinates$.subscribe(coordinates => {
      if (coordinates) {
        debugger
        console.log("drop", coordinates);

        L.marker([coordinates.latitude, coordinates.longitude],{icon: greenIcon}).addTo(this.map)
          .bindPopup('Drop-off Location').openPopup();
      }
    });
    this.liveCoordinates$.subscribe(coordinates => {
      if (coordinates) {
        debugger
        console.log("driver", coordinates);

        L.marker([coordinates.latitude, coordinates.longitude],{icon: drivericon}).addTo(this.map)
          .bindPopup('Driver Location').openPopup();
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
  // getLiveLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         console.log("position", position);

  //         const latitude = position.coords.latitude;
  //         this.liveLocationlatitude = latitude
  //         console.log("latitude", typeof latitude);

  //         const longitude = position.coords.longitude;
  //         console.log("longitude", longitude);

  //         this.liveLocationlongitude = longitude
  //         this.liveLocation = { latitude, longitude };
  //         console.log('Live location:', this.liveLocation);
  //         if (this.liveLocationlatitude) {
  //           L.marker([this.liveLocationlatitude, this.liveLocationlongitude]).addTo(this.map)
  //             .bindPopup('Pick-up Location').openPopup();
  //         }
  //       },
  //       (error) => {
  //         console.error('Error getting live location:', error.message);
  //       }
  //     );
  //   } else {
  //     console.error('Geolocation is not supported by this browser.');
  //   }
  // // }
  // drawRoute(): void {
  // debugger
  // this.dropoffCoordinates$.subscribe(coordinates=>{
    
  // })
  // console.log();
  
  //     this.dropoffCoordinates$.subscribe(coordinates => {
  //       if (coordinates) {
          
  //         if(this.liveLocation && this.liveLocation.latitude && this.liveLocation.longitude && this.dropoffCoordinates$){
  //           const pickUpLatLng = L.latLng(this.liveLocation.latitude, this.liveLocation.longitude);
  //           const dropOffLatLng = L.latLng(coordinates.latitude, coordinates.longitude);
            
  
  //         // Clear previous routes if any
  //         if (this.map) {
  //           this.map.eachLayer((layer:any) => {
  //             if (layer instanceof (L as any).Routing.Control) {
  //               this.map.removeControl(layer);
  //             }
  //           });
  //         }
  
  //         // Create a routing control and add it to the map
  //         (L as any).Routing.control({
  //           waypoints: [pickUpLatLng, dropOffLatLng],
  //           routeWhileDragging: true
  //         }).addTo(this.map);
  //         }
  //       }
  //     });
    
  // }
  drawRoute(): void {
    this.dropoffCoordinates$.subscribe(dropoffCoordinates => {
      if (this.dropoffCoordinates && this.liveLocation && this.liveLocation.latitude && this.liveLocation.longitude) {
        const pickUpLatLng = L.latLng(this.liveLocation.latitude, this.liveLocation.longitude);
        const dropOffLatLng = L.latLng(this.dropoffCoordinates.latitude, this.dropoffCoordinates.longitude);
  
        // Clear previous routes if any
        if (this.map) {
          this.map.eachLayer((layer: any) => {
            if (layer instanceof (L as any).Routing.Control) {
              this.map.removeControl(layer);
            }
          });
        }
  
        // Create a routing control and add it to the map
        const control = (L as any).Routing.control({
          waypoints: [
            L.latLng(this.liveLocation.latitude, this.liveLocation.longitude),
            L.latLng(this.dropoffCoordinates.latitude, this.dropoffCoordinates.longitude)
          ],
          routeWhileDragging: true,
          
          
        }).addTo(this.map);
  
        // Fit the map bounds to the route
        const bounds = L.latLngBounds([pickUpLatLng, dropOffLatLng]);
        this.map.fitBounds(bounds);
      }
    });
  }
  
  
  

}
