import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../userAuth.service';
import { Router } from '@angular/router';
import { UserCommonService } from '../../user-common.service';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userLoginData: any
  username: any;
  data: any;
  orderSuccessful:boolean=false
  constructor(public userAuthService:UserAuthService,private router:Router,public commonservice:UserCommonService, private coreservice:CoreService) { }
  getuserrecord(userId: any): void {
    this.coreservice.getUserBookingReacod(userId).subscribe(
      (response) => {
        if (response && Object.keys(response).length > 0) {
          this.data = response;
         
          this.orderSuccessful = true;
        } else {
           this.orderSuccessful = false;
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
        alert('Error fetching data');
        this.orderSuccessful = false;
      }
    );
  }
  
  ngOnInit() {
  debugger
    const loginUser=localStorage.getItem('LoginUser')
    if(loginUser) {
    this.userLoginData=JSON.parse(loginUser)
    this.userLoginData.forEach((element: {
      id: any; fullname: any; 
}) => {
      this.username=element.fullname
      this.getuserrecord(element.id)
    });
    console.log(this.username);
    
    }
  
  }
  
  isNavHidden = false;

  toggleNav(): void {
    this.isNavHidden = !this.isNavHidden;
  }
  logout(){
    localStorage.setItem('LoginUser','')
    this.userAuthService.Athenticate=false;
    alert('user logged out')
    this.router.navigate(['/']);
  }
}
