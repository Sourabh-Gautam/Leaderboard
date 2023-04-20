// // import { ComponentFixture, TestBed } from '@angular/core/testing';

// // import { MyContributionsComponent } from './my-contributions.component';

// // describe('MyContributionsComponent', () => {
// //   let component: MyContributionsComponent;
// //   let fixture: ComponentFixture<MyContributionsComponent>;

// //   beforeEach(async () => {
// //     await TestBed.configureTestingModule({
// //       declarations: [ MyContributionsComponent ]
// //     })
// //     .compileComponents();

// //     fixture = TestBed.createComponent(MyContributionsComponent);
// //     component = fixture.componentInstance;
// //     fixture.detectChanges();
// //   });

// //   it('should create', () => {
// //     expect(component).toBeTruthy();
// //   });
// // });

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { of } from 'rxjs';

// import { MyContributionsComponent } from './my-contributions.component';
// import { ParticipantService } from 'src/app/services/participant.service';

// describe('MyContributionsComponent', () => {
//   let component: MyContributionsComponent;
//   let fixture: ComponentFixture<MyContributionsComponent>;
//   let participantService: ParticipantService;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [MyContributionsComponent],
//       imports: [HttpClientTestingModule],
//       providers: [ParticipantService]
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(MyContributionsComponent);
//     component = fixture.componentInstance;
//     participantService = TestBed.inject(ParticipantService);
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize participantDetails if there are contributions for the user', async () => {
//     spyOn(sessionStorage, 'getItem').and.returnValue('test@test.com');
//     const participantDetails = [
//       { id: 1, title: 'Contribution 1' },
//       { id: 2, title: 'Contribution 2' }
//     ];
//     spyOn(participantService, 'getParticipantByEmail').and.returnValue(of(participantDetails));

//     await component.ngOnInit();

//     expect(component.zeroContribution).toBeFalsy();
//     expect(component.participantDetails).toEqual(participantDetails);
//   });

//   it('should set zeroContribution to true if there are no contributions for the user', async () => {
//     spyOn(sessionStorage, 'getItem').and.returnValue('test@test.com');
//     spyOn(participantService, 'getParticipantByEmail').and.returnValue(([]));

//     await component.ngOnInit();

//     expect(component.zeroContribution).toBeTruthy();
//     expect(component.participantDetails).toBeUndefined();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyContributionsComponent } from './my-contributions.component';
import { ParticipantService } from 'src/app/services/participant.service';
// import { of } from 'rxjs';

describe('MyContributionsComponent', () => {
  let component: MyContributionsComponent;
  let fixture: ComponentFixture<MyContributionsComponent>;
  let participantServiceSpy: jasmine.SpyObj<ParticipantService>;

  beforeEach(async () => {
    participantServiceSpy = jasmine.createSpyObj('ParticipantService', ['getParticipantByEmail']);

    await TestBed.configureTestingModule({
      declarations: [MyContributionsComponent],
      providers: [{ provide: ParticipantService, useValue: participantServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyContributionsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

//   describe('when participant service returns an empty array', () => {
//     beforeEach(() => {
//       participantServiceSpy.getParticipantByEmail.and.returnValue(of([]));
//       fixture.detectChanges();
//     });

//     it('should set zeroContribution to true', () => {
//       expect(component.zeroContribution).toBeTrue();
//     });
//   });

//   describe('when participant service returns a non-empty array', () => {
//     beforeEach(() => {
//       participantServiceSpy.getParticipantByEmail.and.returnValue(
//         of([{ id: 1, name: 'Test Contribution' }])
//       );
//       fixture.detectChanges();
//     });

//     it('should set participantDetails to the returned array', () => {
//       expect(component.participantDetails).toEqual([{ id: 1, name: 'Test Contribution' }]);
//     });
//   });
});

