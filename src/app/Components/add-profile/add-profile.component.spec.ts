import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfileComponent } from './add-profile.component';
import { FormsModule } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
declare let window: any;
describe('AddProfileComponent', () => {
  let component: AddProfileComponent;
  let fixture: ComponentFixture<AddProfileComponent>;
  let mockProfileService;
  beforeEach(async () => {
    mockProfileService = jasmine.createSpyObj([
      'getAllResourceManager',
      'getAllDesignation',
      'getAllSkill',
      'getAllSubSkill',
      'getAllBusinessUnit',
      'addProfile',
    ]);
    const modalMock = {
      show: jasmine.createSpy('show'),
      hide: jasmine.createSpy('hide'),
    };
    window.bootstrap = {
      Modal: jasmine.createSpy('Modal').and.returnValue(modalMock),
    };
    await TestBed.configureTestingModule({
      declarations: [AddProfileComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: ProfileService,
          useValue: mockProfileService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProfileComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get designations on init', async () => {
    const mockData = [
      { id: '1', designation: 'Developer' },
      { id: '2', designation: 'Manager' },
    ];
    const skills = [
      { id: '1', skills: 'Developer' },
      { id: '2', skills: 'Manager' },
    ];
    const resourceManagerName = [
      { id: '1', resourceManagerName: 'sneka' },
      { id: '2', resourceManagerName: 'sreedevi itta' },
    ];
    const businessUnitName = [
      { id: '1', businessUnitName: 'NAD' },
      { id: '2', businessUnitName: 'NAKM' },
    ];
    const subSkillName = [
      { id: '1', subSkillName: 'java' },
      { id: '2', subSkillName: 'python' },
    ];
    mockProfileService.getAllDesignation.and.returnValue(
      Promise.resolve(mockData)
    );

    mockProfileService.getAllSkill.and.returnValue(Promise.resolve(skills));
    mockProfileService.getAllResourceManager.and.returnValue(
      Promise.resolve(resourceManagerName)
    );
    mockProfileService.getAllBusinessUnit.and.returnValue(
      Promise.resolve(businessUnitName)
    );
    mockProfileService.getAllSubSkill.and.returnValue(
      Promise.resolve(subSkillName)
    );
    await component.ngOnInit();

    expect(component.designations).toEqual(mockData);
    expect(mockProfileService.getAllDesignation).toHaveBeenCalled();
    expect(mockProfileService.getAllSkill).toHaveBeenCalled();
    expect(component.ResourceManager).toEqual(resourceManagerName);
    expect(mockProfileService.getAllResourceManager).toHaveBeenCalled();
    expect(component.BusinessUnit).toEqual(businessUnitName);
    expect(mockProfileService.getAllBusinessUnit).toHaveBeenCalled();
    expect(component.subSkill).toEqual(subSkillName);
    expect(mockProfileService.getAllSubSkill).toHaveBeenCalled();
  });
  // it('should handle add profile', async () => {
  //   const formValue = [
  //     {
  //       name: 'John Doe',

  //       designation: 'sofware devloper',
  //       isAdmin: 'true',
  //       primarySkill: 'java',
  //       businessUnit: 'NACD',
  //       rmName: 'sneka',
  //       email: 'Sneka_P@epam.com',
  //       id: 1,
  //     },
  //   ];
  //   mockProfileService.addProfile.and.returnValue(
  //     Promise.resolve({ status: 201 })
  //   );
  //   spyOn(Swal, 'fire');

  //   await component.handleAddProfile(formValue);

  //   expect(mockProfileService.addProfile).toHaveBeenCalledWith(formValue);
  //   spyOn(component, 'handleClosePopup');

  //   const closeButton = fixture.nativeElement.querySelector('.close');
  //   closeButton.click();
  //   expect(Swal.fire).toHaveBeenCalledWith('Added');
  //   expect(component.handleClosePopup).toHaveBeenCalled();
  // });

  it('should call addProfile and handle success response', async () => {
    const formData = {
      name: 'John Doe',
      subSkill: [
        { subSkillName: 'Sub Skill 1' },
        { subSkillName: 'Sub Skill 2' },
      ],
      designation: 'sofware devloper',
      isAdmin: 'true',
      primarySkill: 'java',
      businessUnit: 'NACD',
      rmName: 'sneka',
      email: 'Sneka_P@epam.com',
      id: 1,
    };

    mockProfileService.addProfile.and.returnValue(
      Promise.resolve({ status: 201 })
    );
    spyOn(Swal, 'fire').and.stub();
    spyOn(component, 'handleClosePopup').and.stub();

    await component.handleAddProfile(formData);

    expect(mockProfileService.addProfile).toHaveBeenCalledWith(formData);
    expect(Swal.fire).toHaveBeenCalledWith('Added');
    expect(component.handleClosePopup).toHaveBeenCalled();
  });

  it('should call addProfile and handle error response', async () => {
    const formData = {
      name: 'John Doe',
      subSkill: [
        { subSkillName: 'Sub Skill 1' },
        { subSkillName: 'Sub Skill 2' },
      ],
      designation: 'sofware devloper',
      isAdmin: 'true',
      primarySkill: 'java',
      businessUnit: 'NACD',
      rmName: 'sneka',
      email: 'Sneka_P@epam.com',
      id: 1,
    };

    mockProfileService.addProfile.and.returnValue(Promise.reject());
    spyOn(Swal, 'fire').and.stub();

    await component.handleAddProfile(formData);
    expect(mockProfileService.addProfile).toHaveBeenCalledWith(formData);

    expect(Swal.fire).toHaveBeenCalledWith('Something went wrong !');
  });
  it('should call addProfile and handle error response for enter the wrong data', async () => {
    const formData = {
      name: 'John Doe',
      subSkill: [
        { subSkillName: 'Sub Skill 1' },
        { subSkillName: 'Sub Skill 2' },
      ],
      designation: 'sofware devloper',
      isAdmin: 'true',
      primarySkill: 'java',
      businessUnit: 'NACD',
      rmName: 'sneka',
      email: 'Sneka_P@epam.com',
      id: 1,
    };

    mockProfileService.addProfile.and.returnValue(
      Promise.resolve({ status: 500 })
    );
    spyOn(Swal, 'fire').and.stub();

    await component.handleAddProfile(formData);
    expect(mockProfileService.addProfile).toHaveBeenCalledWith(formData);

    expect(Swal.fire).toHaveBeenCalledWith('Something went wrong !');
  });
});
