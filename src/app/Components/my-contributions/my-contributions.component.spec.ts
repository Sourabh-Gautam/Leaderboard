import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyContributionsComponent } from './my-contributions.component';
import { ParticipantService } from 'src/app/services/participant.service';
import { FooterComponent } from '../footer/footer.component';
// import { of } from 'rxjs';

describe('MyContributionsComponent', () => {
  let component: MyContributionsComponent;
  let fixture: ComponentFixture<MyContributionsComponent>;
  let participantServiceSpy: jasmine.SpyObj<ParticipantService>;

  beforeEach(async () => {
    participantServiceSpy = jasmine.createSpyObj('ParticipantService', ['getParticipantByEmail']);

    await TestBed.configureTestingModule({
      declarations: [MyContributionsComponent, FooterComponent],
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

