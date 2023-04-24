import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewContributortypeComponent } from './view-contributortype.component';
import { ContributorService } from 'src/app/services/contributor.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

describe('ViewContributortypeComponent', () => {
  let component: ViewContributortypeComponent;
  let fixture: ComponentFixture<ViewContributortypeComponent>;
  // let contributorService: ContributorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewContributortypeComponent,HeaderComponent,FooterComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [ContributorService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewContributortypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // contributorService = TestBed.inject(ContributorService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should set contributorTypeList when initialized', async () => {
    const mockData = [{ contributerType: 'Type 1', points: 10 }];
    const contributorService = TestBed.inject(ContributorService);
    spyOn(contributorService, 'getAllContributorTypes').and.returnValue(Promise.resolve(mockData));

    await component.ngOnInit();

    expect(contributorService.getAllContributorTypes).toHaveBeenCalled();
    expect(component.contributorTypeList).toEqual(mockData);
  });

  it('should set addPopup to true when handleAddContributorType is called', () => {
    component.handleAddContributorType();
    expect(component.addPopup).toBeTrue();
  });

  it('should handle adding a new contributor type', () => {
    component.handleAddContributorType();
    expect(component.addPopup).toBeTrue();
  });

  it('should handle exporting contributor type data', () => {
    spyOn(window, 'open');
    component.contributorTypeList = [{ id: 1, name: 'Contributor 1' }];
    component.handleContributorTypeExport();
    expect(window.open).toHaveBeenCalledTimes(0);
  });

  it('should handle editing a contributor type', () => {
    const contributortype = { id: 1, name: 'Contributor 1', points: 10 };
    component.handleEditContributortype(contributortype);
    expect(component.editPopup).toBeTrue();
    expect(component.contributortype).toEqual(contributortype);
  });

  it('should handle deleting a contributor type', async () => {
    spyOn(component, 'getAllContributorTypes').and.stub();
    spyOn(component.contributorService, 'deleteContributorTypes').and.returnValue(
      Promise.resolve()
    );
    const event = {
      currentTarget: { nextSibling: { value: 1 } },
    };
    await component.handleDeleteContributortype(event);
    expect(component.contributorService.deleteContributorTypes).toHaveBeenCalledWith(1);
    expect(component.getAllContributorTypes).toHaveBeenCalled();
  });

  it('should set editPopup to false when closeEditPopUp is called', () => {
    component.closeEditPopUp();
    expect(component.editPopup).toBeFalse();
  });

  it('should set addPopup to false when closeAddPopUp is called', () => {
    component.closeAddPopUp();
    expect(component.addPopup).toBeFalse();
  });

  it('should set addPopup to true when handleAddContributortype is called', () => {
    component.handleAddContributorType();
    expect(component.addPopup).toBeTrue();
  });
});
