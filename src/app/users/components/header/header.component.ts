import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UserCommonService } from '../../user-common.service';
import { CoreService } from 'src/app/core/core.service';
import { CommonService } from 'src/app/common.service';
import { AuthService } from 'src/app/users/userAuth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
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
  switchValue = false
  darkMode: boolean = false;
  authstatus: any;
  
  constructor(public userAuthService:AuthService,private router:Router,public commonservice:UserCommonService, private coreservice:CoreService, private mainCommonService:CommonService,private message:NzMessageService) { }
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
       
        this.orderSuccessful = false;
      }
    );
  }
  
  ngOnInit() {
    this.userAuthService.authStatus$.subscribe(status => {
      this.authstatus = status;
     
    
    })
    const loginUser=localStorage.getItem('LoginUser')
    if(loginUser) {
    this.userLoginData=JSON.parse(loginUser)
    this.userLoginData.forEach((element: {
      _id: any; fullname: any; 
}) => {
      this.username=element.fullname
      this.getuserrecord(element._id)
    });
    console.log(this.username);
    
    }
   
  }
  
  toggleDarkMode(): void {
    this.mainCommonService.toggleDarkMode();
  }

  setDarkModeClass() {
    if (this.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }


  isNavHidden = false;

  toggleNav(): void {
    this.isNavHidden = !this.isNavHidden;
  }
  logout(){
    localStorage.setItem('LoginUser','')
  
    this.userAuthService.updateAuthStatus(false);
   
    localStorage.removeItem('isAuthenticated');
    this.message.create('info','Logout Successfully')
    this.router.navigate(['/']);
  }
}
