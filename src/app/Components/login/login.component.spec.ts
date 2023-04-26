import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';
import { ParticipantService } from 'src/app/services/participant.service';
import { ProfileService } from 'src/app/services/profile.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockParticipantService: Partial<ParticipantService>;
  let mockProfileService: Partial<ProfileService>;

  beforeEach(async(() => {
    mockParticipantService = {
      // mock ParticipantService methods here if needed
    };

    // mockProfileService = {
    //   getProfileByEmail: () => of({ data: { admin: true, email: 'test@test.com', name: 'Test User' } }),
    //   // mock other ProfileService methods here if needed
    // };

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: ParticipantService, useValue: mockParticipantService },
        { provide: ProfileService, useValue: mockProfileService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit toggleFlag when onClick is called', () => {
    spyOn(component.toggleFlag, 'emit');
    component.onClick();
    expect(component.toggleFlag.emit).toHaveBeenCalled();
  });

  it('should initialize loginForm with email and password fields', () => {
    expect(component.loginForm.get('email')).toBeTruthy();
    expect(component.loginForm.get('password')).toBeTruthy();
  });

  //   it('should not submit form when it is invalid', () => {
  //     spyOn(component.profileService, 'getProfileByEmail').and.returnValue(of({ data: {} }));
  //     component.submitted = true;
  //     component.handleLogin();
  //     expect(component.profileService.getProfileByEmail).not.toHaveBeenCalled();
  //   });

  // it('should navigate to admin dashboard if user is admin', async(() => {
  //   spyOn(component.router, 'navigate');
  //   component.loginForm.setValue({ email: 'bhargavi@epam.com', password: 'password' });
  //   component.handleLogin();
  //   fixture.whenStable().then(() => {
  //     expect(component.router.navigate).toHaveBeenCalledWith(['admin-dashboard']);
  //   });
  // }));

  //   it('should navigate to user dashboard if user is not admin', async(() => {
  //     spyOn(component.router, 'navigate');
  //     spyOn(mockProfileService, 'getProfileByEmail').and.returnValue(of({ data: { admin: false } }));
  //     component.loginForm.setValue({ email: 'test@test.com', password: 'password' });
  //     component.handleLogin();
  //     fixture.whenStable().then(() => {
  //       expect(component.router.navigate).toHaveBeenCalledWith(['user-dashboard']);
  //     });
  //   }));

  it('should show alert when email or password is wrong', async(() => {
    spyOn(window, 'alert');
    component.loginForm.setValue({ email: '', password: '' });
    component.handleLogin();
    fixture.whenStable().then(() => {
      expect(window.alert).toHaveBeenCalledWith('Wrong data');
    });
  }));
});
