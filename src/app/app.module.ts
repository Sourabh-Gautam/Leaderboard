import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { HeaderComponent } from './Components/header/header.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { ManageProgramComponent } from './Components/manage-program/manage-program.component';

import { LoginHeaderComponent } from './Components/login-header/login-header.component';
import { EditProgramComponent } from './Components/edit-program/edit-program.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgramTemplateComponent } from './Components/program-template/program-template.component';
import { AddProgramTemplateComponent } from './Components/add-program-template/add-program-template.component';
import { ViewProgramTemplateComponent } from './Components/view-program-template/view-program-template.component';
import { EditProgramTemplateComponent } from './Components/edit-program-template/edit-program-template.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ManageProfileComponent } from './Components/manage-profile/manage-profile.component';
import { ViewProfileComponent } from './Components/view-profile/view-profile.component';
import { AddProfileComponent } from './Components/add-profile/add-profile.component';
import { ViewParticipantComponent } from './Components/view-participant/view-participant.component';
import { EditParticipantComponent } from './Components/edit-participant/edit-participant.component';
import { ViewContributortypeComponent } from './Components/view-contributortype/view-contributortype.component';
import { AddContributortypeComponent } from './Components/add-contributortype/add-contributortype.component';
import { EditContributortypeComponent } from './Components/edit-contributortype/edit-contributortype.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './Components/footer/footer.component';
import { AdminService } from './services/admin.service';
import { AddParticipantComponent } from './Components/add-participant/add-participant.component';
import { AddProgramComponent } from './Components/add-program/add-program.component';
import { ViewProgramComponent } from './Components/view-program/view-program.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { ViewParticipantContributionsComponent } from './Components/view-participant-contributions/view-participant-contributions.component';
// import 'ag-grid-enterprise';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    ManageProgramComponent,
    AddProgramComponent,
    AdminDashboardComponent,
    LoginHeaderComponent,
    EditProgramComponent,
    ProgramTemplateComponent,
    AddProgramTemplateComponent,
    ViewProgramTemplateComponent,
    EditProgramTemplateComponent,
    ViewProgramComponent,
    ManageProfileComponent,
    ViewProfileComponent,

    AddProfileComponent,
    ViewParticipantComponent,
    AddParticipantComponent,
    EditParticipantComponent,
    ViewContributortypeComponent,
    AddContributortypeComponent,
    EditContributortypeComponent,
    EditProfileComponent,
    FooterComponent,
    ViewParticipantContributionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AgGridModule,
    HttpClientModule,
  ],
  providers: [AdminService],
  bootstrap: [AppComponent],
})
export class AppModule {}
