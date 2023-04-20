// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { FooterComponent } from './footer.component';

// describe('FooterComponent', () => {
//   let component: FooterComponent;
//   let fixture: ComponentFixture<FooterComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [FooterComponent],
//     }).compileComponents();

//     fixture = TestBed.createComponent(FooterComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FooterComponent } from './footer.component';

// describe('FooterComponent', () => {
//   let component: FooterComponent;
//   let fixture: ComponentFixture<FooterComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [FooterComponent],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(FooterComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should display the current year in the template', () => {
//     const element = fixture.nativeElement;
//     const expectedText = new Date().getFullYear().toString();
//     const actualText = element.querySelector('.year').textContent;
//     expect(actualText).toContain(expectedText);
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should display the current year', () => {
  //   const footerElement: HTMLElement = fixture.nativeElement;
  //   const yearElement = footerElement.querySelector('.year');
  //   expect(yearElement?.textContent).toContain(new Date().getFullYear());
  // });
});

