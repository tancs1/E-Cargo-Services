import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { DashSidebarComponent } from './dash-sidebar/dash-sidebar.component';
import { DashHeaderComponent } from './dash-header/dash-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ManageReviewsComponent } from './manage-reviews/manage-reviews.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { BookedJobComponent } from './booked-job/booked-job.component';
import { CompletedJobComponent } from './completed-job/completed-job.component';

import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { TrackJobComponent } from './track-job/track-job.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { EditProfileComponent } from './Edit-profile/Edit-profile.component';
import { CancelJobsComponent } from './cancelJobs/cancelJobs.component';
import { DashCommonService } from './dash-common.service';

import { NzSelectModule } from 'ng-zorro-antd/select';
import { AuthService } from 'src/app/users/userAuth.service';
import { NzImageModule } from 'ng-zorro-antd/image';
import { SpinerComponent } from './spiner/spiner.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { UserDashFooterComponent } from './user-dash-footer/user-dash-footer.component';

@NgModule({
  declarations: [DashboardComponent,DashSidebarComponent,DashHeaderComponent,ManageReviewsComponent,MainDashboardComponent,BookedJobComponent,CompletedJobComponent,TrackJobComponent,EditProfileComponent,CancelJobsComponent,SpinerComponent,UserDashFooterComponent ],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    NzIconModule,
    NzMenuModule,
    NzLayoutModule,
    NzSwitchModule,FormsModule,
    NzCollapseModule,
    NzAvatarModule,
    NzDropDownModule,
    NzButtonModule,
    NzBadgeModule,
    NzStepsModule,
    NzInputModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzImageModule,
    NzSpinModule,
    NzModalModule
  ],
  exports:[DashboardComponent,DashSidebarComponent,DashHeaderComponent,ManageReviewsComponent,MainDashboardComponent,BookedJobComponent,CompletedJobComponent,TrackJobComponent,EditProfileComponent,CancelJobsComponent,UserDashFooterComponent],
  providers: [DashCommonService,AuthService]
})
export class UserDashboardModule { }
