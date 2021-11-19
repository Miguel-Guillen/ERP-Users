import { TestBed } from '@angular/core/testing';

import { AssignProyectService } from './assign-proyect.service';

describe('AssignProyectService', () => {
  let service: AssignProyectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignProyectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
