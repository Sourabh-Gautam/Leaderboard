import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingPageComponent } from './landing-page.component';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize flag as true', () => {
    expect(component.flag).toBeTrue();
  });

  it('should toggle the flag property', () => {
    const initialFlagValue = component.flag;
    component.toggleFlag();
    expect(component.flag).not.toBe(initialFlagValue);
    component.toggleFlag();
    expect(component.flag).toBe(initialFlagValue);
  });

  it('should clear sessionStorage on initialization', () => {
    spyOn(sessionStorage, 'clear');
    component.ngOnInit();
    expect(sessionStorage.clear).toHaveBeenCalled();
  });
});

