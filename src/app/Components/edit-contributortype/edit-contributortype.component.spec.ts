import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EditContributortypeComponent } from './edit-contributortype.component';
import { FormsModule } from '@angular/forms';
import { ContributorService } from 'src/app/services/contributor.service';
import Swal from 'sweetalert2';
declare let window: any;
describe('EditContributortypeComponent', () => {
  let component: EditContributortypeComponent;
  let fixture: ComponentFixture<EditContributortypeComponent>;

  let mockContributorService;
  beforeEach(async () => {
    mockContributorService = jasmine.createSpyObj(['editContributorTypes']);
    const modalMock = {
      show: jasmine.createSpy('show'),
      hide: jasmine.createSpy('hide'),
    };
    window.bootstrap = {
      Modal: jasmine.createSpy('Modal').and.returnValue(modalMock),
    };
    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [EditContributortypeComponent],
      providers: [
        { provide: ContributorService, useValue: mockContributorService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditContributortypeComponent);
    component = fixture.componentInstance;
    component.contributortype = {
      id: 1,
      contributerType: 'type',
      points: '10',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call  contributorService.editContributorTypes with the form value on handleeditcontributortype', async () => {
    const formValue = { id: '1', contributerType: 'type', points: '10' };
    mockContributorService.editContributorTypes.and.returnValue(
      Promise.resolve({ status: 202 })
    );
    spyOn(Swal, 'fire');

    await component.handleEditcontributorType(formValue);

    expect(mockContributorService.editContributorTypes).toHaveBeenCalledWith(
      formValue,
      component.contributortype.id
    );
    spyOn(component, 'handleClosePopup');

    const closeButton = fixture.nativeElement.querySelector('.close');
    closeButton.click();
    expect(Swal.fire).toHaveBeenCalledWith('Updated');
    expect(component.handleClosePopup).toHaveBeenCalled();
  });

  it('should show error message if edit contributor type fails', async () => {
    const formValue = { id: '1', contributerType: 'type', points: '10' };
    mockContributorService.editContributorTypes.and.returnValue(
      Promise.resolve({ status: 500 })
    );
    spyOn(Swal, 'fire');

    await component.handleEditcontributorType(formValue);

    expect(mockContributorService.editContributorTypes).toHaveBeenCalledWith(
      formValue,
      component.contributortype.id
    );
    expect(Swal.fire).toHaveBeenCalledWith('Something went wrong');
  });
  it('should show error message if edit contributor type with invalide data ', async () => {
    const formValue = { contributerType: 'type', points: '10' };
    mockContributorService.editContributorTypes.and.returnValue(
      Promise.reject()
    );
    spyOn(Swal, 'fire');

    await component.handleEditcontributorType(formValue);
    expect(mockContributorService.editContributorTypes).toHaveBeenCalledWith(
      formValue,
      component.contributortype.id
    );
    expect(Swal.fire).toHaveBeenCalledWith('Something went wrong');
  });

  it('should call handleClosePopup when handleClosePopup is called', () => {
    spyOn(component.closePopup, 'emit');

    component.handleClosePopup();

    expect(component.edit.hide).toHaveBeenCalled();
    expect(component.closePopup.emit).toHaveBeenCalled();
  });
});
