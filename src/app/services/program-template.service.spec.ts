import { TestBed } from '@angular/core/testing';

import { ProgramTemplateService } from './program-template.service';

describe('ProgramTemplateService', () => {
  let service: ProgramTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
