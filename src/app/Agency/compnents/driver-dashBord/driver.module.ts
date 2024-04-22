import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverRoutingModule } from './driver-routing.module';
import { DriverLoginComponent } from './driverLogin/driverLogin.component';

import { DriverDashComponent } from './driverDash/driverDash.component';
import { DriverHeaderComponent } from './DriverHeader/DriverHeader.component';
import { DriverSideBarComponent } from './DriverSideBar/DriverSideBar.component';
import { DriverMainDashComponent } from './driverMainDash/driverMainDash.component';


import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

import { NzSpaceModule } from 'ng-zorro-antd/space';

import { NzSelectModule } from 'ng-zorro-antd/select';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { DriverFooterComponent } from './driver-footer/driver-footer.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CommonService } from './auth/common.service';


@NgModule({
  declarations: [DriverLoginComponent,DriverMainDashComponent,DriverDashComponent,DriverHeaderComponent,DriverSideBarComponent,DriverFooterComponent],
  exports:[DriverLoginComponent,DriverMainDashComponent,DriverDashComponent,DriverHeaderComponent,DriverSideBarComponent,DriverFooterComponent],
  imports: [
    CommonModule,
    DriverRoutingModule,
    ReactiveFormsModule,

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
   
    NzSelectModule,
    NzDrawerModule,
    NzSpaceModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzSpinModule,
    NzTableModule,
    NzPopconfirmModule
  ],providers:[CommonService]
})
export class DriverModule { }
