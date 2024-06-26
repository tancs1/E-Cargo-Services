import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/common.service';
import { UserCommonService } from '../../user-common.service';

import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { concatMap } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchForm!: FormGroup;
  pickupSuggestedCities$: Observable<any[]> | undefined;
  dropoffSuggestedCities$: Observable<any[]> | undefined;
  isAgency: any;
  loading:boolean=false
  constructor(
    private fb: FormBuilder,
    private cityService: CommonService,
    public userCommonService:UserCommonService,
   private router: ActivatedRoute,
   private route:Router,
   private message: NzMessageService
  ) {}

  ngOnInit() {
    this.userCommonService.spinner()
    this.searchForm = this.fb.group({
      pickupLocation: ['',Validators.required],
      dropoffLocation: ['',Validators.required],
    });
    this.isAgency = this.isAgencyRoute();
  
  }
isAgencyRoute(): boolean {
    // Get the current URL
    const segments = this.router.snapshot.url.map(segment => segment.path);

    // Check if the URL contains "agency" segment
    return segments.includes('agency');
  }
  search(type: 'pickup' | 'dropoff'): void {
    const searchTerm = type === 'pickup' ? this.searchForm.value.pickupLocation : this.searchForm.value.dropoffLocation;
    const suggestedCities$ = type === 'pickup' ? 'pickupSuggestedCities$' : 'dropoffSuggestedCities$';
    this[suggestedCities$] = this.cityService.getSuggestedCities(searchTerm);
  }

  selectSuggestion(cityName: string, type: 'pickup' | 'dropoff'): void {
    const controlName = type === 'pickup' ? 'pickupLocation' : 'dropoffLocation';
    this.searchForm.get(controlName)?.setValue(cityName); // Update form control value with selected city name
    const suggestedCities$ = type === 'pickup' ? 'pickupSuggestedCities$' : 'dropoffSuggestedCities$';
    this[suggestedCities$] = undefined; // Clear suggestion list
  }

  onSubmit(): void {
    this.loading = true;
this.createBasicMessage()
    debugger
   if(this.searchForm.valid){
    const pickupLocation = this.searchForm.value.pickupLocation;
    const dropoffLocation = this.searchForm.value.dropoffLocation;

    this.cityService.getCoordinates(pickupLocation).subscribe(pickupCoordinates => {
      if (pickupCoordinates) {
        this.cityService.getCoordinates(dropoffLocation).subscribe(dropoffCoordinates => {
          if (dropoffCoordinates) {
            const distance = this.userCommonService.calculateDistance(
              pickupCoordinates.latitude,
              pickupCoordinates.longitude,
              dropoffCoordinates.latitude,
              dropoffCoordinates.longitude,
              pickupLocation,
              dropoffLocation
            );

            console.log('Distance between pickup and drop-off locations:', distance.toFixed(2), 'km');
          } else {
            console.error('Failed to get coordinates for drop-off location:', dropoffLocation);
          }
        });
      } else {
        console.error('Failed to get coordinates for pickup location:', pickupLocation);
      }
    });
    setTimeout(() => {
      // Data loading complete

      this.route.navigate(['vehicles-and-goods-info'])
    }, 2000);

   }
  }
  createBasicMessage(): void {
    this.message
      .loading('Action in progress', { nzDuration: 1800 })
      .onClose!.pipe(
        concatMap(() => this.message.success('Calculating Distance', { nzDuration: 1800 }).onClose!),
        concatMap(() => this.message.info('Calculating Distance successfully', { nzDuration: 1800 }).onClose!)
      )
      .subscribe(() => {
        console.log('All completed!');
      });
  }



  // services logic
  currentSetIndex = 0;
  totalSets = 3; // Assuming you have 3 sets of cards

  next() {
    if (this.currentSetIndex < this.totalSets - 1) {
      this.currentSetIndex++;
    } else {
      this.currentSetIndex = 0;
    }
  }

  previous() {
    if (this.currentSetIndex > 0) {
      this.currentSetIndex--;
    } else {
      this.currentSetIndex = this.totalSets - 1;
    }
  }
  //frequent ask question 
  expandIconPosition: 'left' | 'right' = 'left';
  activePanelIndex: number = -1; // Initially no panel is active

  setActivePanel(index: number) {
    this.activePanelIndex = index === this.activePanelIndex ? -1 : index;
  }
  panels = [
    {
      active: true,
      name: 'How do I get a price?',
      disabled: false
    },
    {
      active: false,
      disabled: false,
      name: 'How do I pay for my delivery?'
    },
    {
      active: false,
      disabled: false,
      name: 'How do I contact the driver?'
    },
    {
      active: false,
      disabled: false,
      name: 'How can I track my job?'
    }

  ];

  array = [1, 2, 3];
}