import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { DashSidebarComponent } from './dash-sidebar/dash-sidebar.component';
import { DashHeaderComponent } from './dash-header/dash-header.component';
import { FormsModule } from '@angular/forms';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ManageReviewsComponent } from './manage-reviews/manage-reviews.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { BookedJobComponent } from './booked-job/booked-job.component';
import { CompletedJobComponent } from './completed-job/completed-job.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [DashboardComponent,DashSidebarComponent,DashHeaderComponent,ManageReviewsComponent,MainDashboardComponent,BookedJobComponent,CompletedJobComponent,FooterComponent ],
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
    NzButtonModule
  ],
  exports:[DashboardComponent,DashSidebarComponent,DashHeaderComponent,ManageReviewsComponent,MainDashboardComponent,BookedJobComponent,CompletedJobComponent,FooterComponent]
})
export class UserDashboardModule { }