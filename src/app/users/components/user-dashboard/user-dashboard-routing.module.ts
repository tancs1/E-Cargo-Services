import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageReviewsComponent } from './manage-reviews/manage-reviews.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { BookedJobComponent } from './booked-job/booked-job.component';
import { CompletedJobComponent } from './completed-job/completed-job.component';
import { InoviceComponent } from './inovice/inovice.component';
import { TrackJobComponent } from './track-job/track-job.component';
import { EditProfileComponent } from './Edit-profile/Edit-profile.component';

import { CancelJobsComponent } from './cancelJobs/cancelJobs.component';
import { AuthGuard } from 'src/app/users/UserAuthGuard/userAuth.guard';




const routes: Routes = [
  {path:'', component: MainDashboardComponent ,  canActivate: [AuthGuard], 
  children:[
    { path: '', redirectTo: 'user-dashboard', pathMatch: 'full' },
    {path:'user-dashboard',component:DashboardComponent},
    {path:'manage-reviews',component:ManageReviewsComponent},
    {path:'booked-job',component:BookedJobComponent},
    {path:'completed-job',component:CompletedJobComponent},
    {path:'payment-history',component:InoviceComponent},
    {path:'track-job/:id',component:TrackJobComponent},
    {path:'edit-profile',component:EditProfileComponent},
    {path:'canceled-jobs',component:CancelJobsComponent},
    
  ]

},
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDashboardRoutingModule { }
