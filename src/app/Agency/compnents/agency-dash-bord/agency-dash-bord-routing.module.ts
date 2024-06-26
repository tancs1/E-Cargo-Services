import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { agencyAuthGuardGuard } from '../../agencyAuthGard/agency-auth-guard.guard';
import { AgencyDashBordComponent } from './AgencyDashBord/AgencyDashBord.component';
import { AgencyMainDashBordComponent } from './agencyMainDashBord/agencyMainDashBord.component';
import { ManageReviewsComponent } from './manageReviews/manageReviews.component';
import { AcceptedJobsComponent } from './Accepted-jobs/Accepted-jobs.component';
import { InProcessJobsComponent } from './InProcessJobs/InProcessJobs.component';
import { CompletedJobsComponent } from './CompletedJobs/CompletedJobs.component';
import { JobTrackingComponent } from './JobTracking/JobTracking.component';
import { OnTheWayComponent } from './on-the-way/on-the-way.component';
import { AgencyProfileEditComponent } from './agencyProfileEdit/agencyProfileEdit.component';
import { ManageDriverComponent } from './manage-driver/manage-driver.component';

const routes: Routes = [
  {path:'', component: AgencyMainDashBordComponent ,
  canActivate: [agencyAuthGuardGuard], 
  children:[
    { path: '', redirectTo: 'agency-dashbord', pathMatch: 'full' },
    {path:'agency-dashbord',component:AgencyDashBordComponent,
  
    },
    {path:'reviews',component:ManageReviewsComponent},
    {path:'AcceptedJobs',component:AcceptedJobsComponent},
    {path:'onTheWay',component:OnTheWayComponent},
    {path:'InProcessJobs',component:InProcessJobsComponent},
    {path:'CompletedJobs',component:CompletedJobsComponent},
    {path:'agency-profile-edit',component:AgencyProfileEditComponent},
    {path:'jobTracking/:id',component:JobTrackingComponent},
  {path:'manage-driver',component:ManageDriverComponent}
    
  ]}
]


  


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyDashBordRoutingModule { }
