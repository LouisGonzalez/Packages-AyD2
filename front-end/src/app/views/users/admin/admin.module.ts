import { NgModule } from '@angular/core';
import {
  NbRadioModule,
  NbButtonModule,
  NbLayoutModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
  NbInputModule,
  NbCheckboxModule,
  NbMenuModule,
  NbActionsModule,
  NbSpinnerModule,
  NbToggleModule,
  NbSearchModule,
  NbPopoverModule,
  NbSidebarModule
} from '@nebular/theme';
import { ListDestinationsComponent } from './list-destinations/list-destinations.component';
import { EditDestinationComponent } from './edit-destination/edit-destination.component';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../../@theme/theme.module';
import { RoutesModule } from './routes/routes.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { RatesComponent } from './rates/rates.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateDestinationComponent } from './create-destination/create-destination.component';
import { EditCheckpointComponent } from './edit-checkpoint/edit-checkpoint.component';
import { UpdateAssignamentOperatorCheckpointComponent } from './update-assignament-operator-checkpoint/update-assignament-operator-checkpoint.component';
import { CheckpointListComponent } from './checkpoint-list/checkpoint-list.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { CreateCheckpointComponent } from './create-checkpoint/create-checkpoint.component';
import { ActivateUsersComponent } from './activate-users/activate-users.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { RouteListComponent } from './route-list/route-list.component';

@NgModule({
  declarations: [
    AdminComponent,
    RatesComponent,
    CreateDestinationComponent,
    RegisterUserComponent,
    ListUsersComponent,
    CreateCheckpointComponent,
    ActivateUsersComponent,
    UpdateUserComponent,
    CheckpointListComponent,
    EditCheckpointComponent,
    UpdateAssignamentOperatorCheckpointComponent,
    ListDestinationsComponent,
    EditDestinationComponent,
    RouteListComponent
  ],
  imports: [
    CommonModule,
    NbRadioModule,
    AdminRoutingModule,
    NbMenuModule,
    ThemeModule,
    RoutesModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbButtonModule,
    NbActionsModule,
    NbLayoutModule,
    NbCardModule,
    NbProgressBarModule,
    NbTabsetModule,
    NbUserModule,
    NbIconModule,
    NbSelectModule,
    NbListModule,
    NbInputModule,
    NbSearchModule,
    NbPopoverModule,
    NbCheckboxModule,
    NbSidebarModule,
    Ng2SmartTableModule,
    HttpClientModule,
    NbIconModule,
    NbListModule,
    NbSpinnerModule,
    NbCardModule,
    NbListModule,
    NbToggleModule,
    RoutesModule
  ]
})

export class AdminModule { }