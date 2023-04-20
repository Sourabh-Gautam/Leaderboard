/* eslint-disable @typescript-eslint/no-explicit-any */
// import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AddContributortypeComponent } from './add-contributortype.component';
import { ContributorService } from 'src/app/services/contributor.service';
import Swal from 'sweetalert2';
declare let window: any;
describe('AddContributortypeComponent', () => {
  let component: AddContributortypeComponent;
  let fixture: ComponentFixture<AddContributortypeComponent>;
  let mockContributorService;

  beforeEach(async () => {
    mockContributorService = jasmine.createSpyObj(['addContributorTypes']);
    const modalMock = {
      show: jasmine.createSpy('show'),
      hide: jasmine.createSpy('hide'),
    };
    window.bootstrap = {
      Modal: jasmine.createSpy('Modal').and.returnValue(modalMock),
    };
    await TestBed.configureTestingModule({
      declarations: [AddContributortypeComponent],
      imports: [FormsModule],
      providers: [
        { provide: ContributorService, useValue: mockContributorService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContributortypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call contributorService.addContributorTypes with the form value on handleAddcontributortype', async () => {
    const formValue = { contributerType: 'type', points: '10' };
    mockContributorService.addContributorTypes.and.returnValue(
      Promise.resolve({ status: 201 })
    );
    spyOn(Swal, 'fire');

    await component.handleAddcontributortype(formValue);

    expect(mockContributorService.addContributorTypes).toHaveBeenCalledWith(
      formValue
    );
    spyOn(component, 'handleClosePopup');

    const closeButton = fixture.nativeElement.querySelector('.close');
    closeButton.click();
    expect(Swal.fire).toHaveBeenCalledWith('Added');
    expect(component.handleClosePopup).toHaveBeenCalled();
  });

  it('should show error message if adding contributor type fails', async () => {
    const formValue = { contributerType: 'type', points: '10' };
    mockContributorService.addContributorTypes.and.returnValue(
      Promise.resolve({ status: 500 })
    );
    spyOn(Swal, 'fire');

    await component.handleAddcontributortype(formValue);

    expect(mockContributorService.addContributorTypes).toHaveBeenCalledWith(
      formValue
    );
    expect(Swal.fire).toHaveBeenCalledWith('Something went wrong !');
  });
  it('should show error message if adding contributor type with invalide data ', async () => {
    const formValue = { contributerType: 'type', points: '10' };
    mockContributorService.addContributorTypes.and.returnValue(
      Promise.reject()
    );
    spyOn(Swal, 'fire');

    await component.handleAddcontributortype(formValue);

    expect(mockContributorService.addContributorTypes).toHaveBeenCalledWith(
      formValue
    );
    expect(Swal.fire).toHaveBeenCalledWith('Something went wrong !');
  });

  it('should call handleClosePopup when handleClosePopup is called', () => {
    spyOn(component.closePopup, 'emit');

    component.handleClosePopup();

    expect(component.add.hide).toHaveBeenCalled();
    expect(component.closePopup.emit).toHaveBeenCalled();
  });
});

