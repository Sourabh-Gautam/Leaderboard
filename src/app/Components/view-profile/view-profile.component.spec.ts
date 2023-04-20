// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ViewProfileComponent } from './view-profile.component';
// import { ProfileService } from 'src/app/services/profile.service';

// describe('ViewProfileComponent', () => {
//   let component: ViewProfileComponent;
//   let fixture: ComponentFixture<ViewProfileComponent>;
//   let mockProfileService: jasmine.SpyObj<ProfileService>;

//   beforeEach(async () => {
//     mockProfileService = jasmine.createSpyObj('ProfileService', [
//       'getAllProfiles',
//       'getAllSubSkill',
//       'deleteProfile',
//     ]);

//     await TestBed.configureTestingModule({
//       declarations: [ViewProfileComponent],
//       providers: [{ provide: ProfileService, useValue: mockProfileService }],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ViewProfileComponent);
//     component = fixture.componentInstance;
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   describe('getAllProfiles', () => {
//     it('should fetch all profiles and set the data and total records properties', async () => {
//       const mockProfiles = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }];
//       mockProfileService.getAllProfiles.and.returnValue(Promise.resolve(mockProfiles));

//       await component.getAllProfiles();

//       expect(mockProfileService.getAllProfiles).toHaveBeenCalled();
//       expect(component.profiles).toEqual(mockProfiles);
//       expect(component.data).toEqual(mockProfiles);
//       expect(component.totalRecords).toBe(mockProfiles.length);
//     });
//   });

//   describe('getAllSubSkills', () => {
//     it('should fetch all sub-skills and set the subSkillData property', async () => {
//       const mockSubSkills = [{ id: 1, name: 'JavaScript' }, { id: 2, name: 'TypeScript' }];
//       mockProfileService.getAllSubSkill.and.returnValue(Promise.resolve(mockSubSkills));

//       await component.getAllSubSkills();

//       expect(mockProfileService.getAllSubSkill).toHaveBeenCalled();
//       expect(component.subSkill).toEqual(mockSubSkills);
//       expect(component.subSkillData).toEqual(mockSubSkills);
//     });
//   });

//   describe('handleAddProfile', () => {
//     it('should set the addPopup property to true', () => {
//       component.handleAddProfile();

//       expect(component.addPopup).toBeTrue();
//     });
//   });

//   describe('handleProfileExport', () => {
//     it('should call the dataExport function with the profiles data and a filename', () => {
//       const mockProfiles = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }];
//       component.profiles = mockProfiles;
//       spyOn(window, 'open');

//       component.handleProfileExport();

//       expect(window.open).toHaveBeenCalledWith(`data:text/csv;charset=utf-8,${encodeURI(JSON.stringify(mockProfiles))}`, 'profile-data.csv');
//     });
//   });

//   describe('handleEditProfile', () => {
//     it('should set the profile property and editPopup property to true', () => {
//       const mockProfile = { id: 1, name: 'John Doe' };
//       component.handleEditProfile(mockProfile);

//       expect(component.profile).toBe(mockProfile);
//       expect(component.editPopup).toBeTrue();
//     });
//   });

//   describe('handleDeleteProfile', () => {
//     it('should call the deleteProfile function and fetch all profiles again', async () => {
//       const mockProfileId = 1;
//       spyOn(component, 'getAllProfiles');
//       mockProfileService.deleteProfile.and.returnValue(Promise.resolve());

//       await component.handleDeleteProfile(mockProfileId);
//     });
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewProfileComponent } from './view-profile.component';
import { ProfileService } from 'src/app/services/profile.service';
import { NgxPaginationModule } from 'ngx-pagination';


describe('ViewProfileComponent', () => {
  let component: ViewProfileComponent;
  let fixture: ComponentFixture<ViewProfileComponent>;
  let profileServiceSpy: jasmine.SpyObj<ProfileService>;

  beforeEach(async () => {
    profileServiceSpy = jasmine.createSpyObj('ProfileService', ['getAllProfiles', 'getAllSubSkill', 'deleteProfile']);
    await TestBed.configureTestingModule({
        
      declarations: [ ViewProfileComponent ],
      imports: [NgxPaginationModule],
      providers: [
        { provide: ProfileService, useValue: profileServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProfileComponent);
    component = fixture.componentInstance;
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

  // it('should call getAllSubSkills when handleAddProfile is called', async () => {
  //   profileServiceSpy.getAllSubSkill.and.returnValue(Promise.resolve([]));
  //   await component.handleAddProfile();
  //   expect(profileServiceSpy.getAllSubSkill).toHaveBeenCalled();
  //   expect(component.subSkill).toEqual([]);
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
  // describe('handleProfileExport', () => {
  //       it('should call the dataExport function with the profiles data and a filename', () => {
  //         const mockProfiles = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }];
  //         component.profiles = mockProfiles;
  //         spyOn(window, 'open');
    
  //         component.handleProfileExport();
    
  //         expect(window.open).toHaveBeenCalledWith(`data:text/csv;charset=utf-8,${encodeURI(JSON.stringify(mockProfiles))}`, 'profile-data.csv');
  //       });
  //     });

       it('should set editPopup to false when closeEditPopUp is called', () => {
    component.closeEditPopUp();
    expect(component.editPopup).toBeFalse();
  });

  it('should set addPopup to false when closeAddPopUp is called', () => {
    component.closeAddPopUp();
    expect(component.addPopup).toBeFalse();
  });
    
});
