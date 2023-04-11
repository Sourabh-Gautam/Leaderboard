import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProgramComponent } from './Components/add-program/add-program.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { EditProgramComponent } from './Components/edit-program/edit-program.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { ManageProfileComponent } from './Components/manage-profile/manage-profile.component';
import { ManageProgramComponent } from './Components/manage-program/manage-program.component';
import { ProgramTemplateComponent } from './Components/program-template/program-template.component';
import { ViewContributortypeComponent } from './Components/view-contributortype/view-contributortype.component';
import { ViewParticipantComponent } from './Components/view-participant/view-participant.component';
import { ViewProgramComponent } from './Components/view-program/view-program.component';
import { ViewParticipantContributionsComponent } from './Components/view-participant-contributions/view-participant-contributions.component';
import { ViewParticipnatByDesignationComponent } from './Components/view-participnat-by-designation/view-participnat-by-designation.component';
import { ViewParticipnatByBuComponent } from './Components/view-participnat-by-bu/view-participnat-by-bu.component';
import { ViewParticipnatByPsComponent } from './Components/view-participnat-by-ps/view-participnat-by-ps.component';
import { ViewParticipnatByRmComponent } from './Components/view-participnat-by-rm/view-participnat-by-rm.component';
import { UserDashboardComponent } from './Components/user-dashboard/user-dashboard.component';
import { HeaderComponent } from './Components/header/header.component';
import { MyContributionsComponent } from './Components/my-contributions/my-contributions.component';

export const routes: Routes = [
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
  },
  {
    path: 'program-template',
    component: ProgramTemplateComponent,
  },
  {
    path: 'add-program',
    component: AddProgramComponent,
  },
  {
    path: 'view-program',
    component: ViewProgramComponent,
  },

  {
    path: 'edit-program',
    component: EditProgramComponent,
  },

  {
    path: 'manage-program',
    component: ManageProgramComponent,
  },
  {
    path: 'manage-profile',
    component: ManageProfileComponent,
  },
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'view-participant',
    component: ViewParticipantComponent,
  },
  {
    path: 'view-contributortype',
    component: ViewContributortypeComponent,
  },
  {
    path: 'my-contributions',
    component: MyContributionsComponent,
  },
  {
    path: 'participant-contributions',
    component: ViewParticipantContributionsComponent,
  },
  {
    path: 'participant-by-designation',
    component: ViewParticipnatByDesignationComponent,
  },
  {
    path: 'participant-by-bu',
    component: ViewParticipnatByBuComponent,
  },
  {
    path: 'participant-by-ps',
    component: ViewParticipnatByPsComponent,
  },
  {
    path: 'participant-by-rm',
    component: ViewParticipnatByRmComponent,
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
  },
  {
    path: '*',
    component: HeaderComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
