import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewProfileComponent } from './view-profile.component';
import { ProfileService } from 'src/app/services/profile.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from 'ag-grid-community/dist/lib/components/framework/componentTypes';

describe('ViewProfileComponent', () => {
  let component: ViewProfileComponent;
  let fixture: ComponentFixture<ViewProfileComponent>;
  let profileServiceSpy: jasmine.SpyObj<ProfileService>;

  beforeEach(async () => {
    profileServiceSpy = jasmine.createSpyObj('ProfileService', [
      'getAllProfiles',
      'getAllSubSkill',
      'deleteProfile',
    ]);
    await TestBed.configureTestingModule({
      declarations: [ViewProfileComponent],
      imports: [NgxPaginationModule],
      providers: [{ provide: ProfileService, useValue: profileServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call getAllProfiles on initialization', async () => {
  //   profileServiceSpy.getAllProfiles.and.returnValue(Promise.resolve([]));
  //   await fixture.detectChanges();
  //   expect(profileServiceSpy.getAllProfiles).toHaveBeenCalled();
  //   expect(component.profiles).toEqual([]);
  // });

  it('should call deleteProfile and getAllProfiles when handleDeleteProfile is called', async () => {
    profileServiceSpy.deleteProfile.and.returnValue(Promise.resolve());
    profileServiceSpy.getAllProfiles.and.returnValue(Promise.resolve([]));
    await component.handleDeleteProfile(1);
    expect(profileServiceSpy.deleteProfile).toHaveBeenCalledWith(1);
    expect(profileServiceSpy.getAllProfiles).toHaveBeenCalled();
    expect(component.profiles).toEqual([]);
  });

  it('should set editPopup to true and set profile when handleEditProfile is called', async () => {
    const testProfile = { id: 1, name: 'Test' };
    await component.handleEditProfile(testProfile);
    expect(component.editPopup).toBeTrue();
    expect(component.profile).toEqual(testProfile);
  });

  it('should set addPopup to true when handleAddProfile is called', async () => {
    await component.handleAddProfile();
    expect(component.addPopup).toBeTrue();
  });
  describe('handleProfileExport', () => {
    it('should call the dataExport function with the profiles data and a filename', () => {
      const mockProfiles = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
      ];
      component.profiles = mockProfiles;
      spyOn(window, 'open');

      component.handleProfileExport();
    });
  });

  it('should set editPopup to false when closeEditPopUp is called', () => {
    component.closeEditPopUp();
    expect(component.editPopup).toBeFalse();
  });

  it('should set addPopup to false when closeAddPopUp is called', () => {
    component.closeAddPopUp();
    expect(component.addPopup).toBeFalse();
  });
});
