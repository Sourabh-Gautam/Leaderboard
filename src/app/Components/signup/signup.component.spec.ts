import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize registerForm with empty values', () => {
    expect(component.registerForm.value).toEqual({
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  });

  it('should emit toggleFlag event when onClick is called', () => {
    spyOn(component.toggleFlag, 'emit');
    component.onClick();
    expect(component.toggleFlag.emit).toHaveBeenCalled();
  });

  it('should set submitted to true and save data to localStorage when signUpHandler is called with valid form data', () => {
    spyOn(localStorage, 'setItem');
    spyOn(window, 'alert');
    const form = {
      value: {
        userName: 'Test User',
        email: '',
        password: '',
        confirmPassword: '',
      },
      invalid: false,
    };
    component.signUpHandler(form);
    expect(component.submitted).toBeTrue();
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    expect(window.alert).toHaveBeenCalledTimes(0);
  });

  it('should show error message when signUpHandler is called with invalid form data', () => {
    spyOn(localStorage, 'setItem');
    spyOn(window, 'alert');
    const form = {
      value: {
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      invalid: true,
    };
    component.signUpHandler(form);
    expect(component.submitted).toBeTrue();
    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(window.alert).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledTimes(0);
  });
});
