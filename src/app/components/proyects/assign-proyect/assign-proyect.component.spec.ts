import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignProyectComponent } from './assign-proyect.component';

describe('AssignProyectComponent', () => {
  let component: AssignProyectComponent;
  let fixture: ComponentFixture<AssignProyectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignProyectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignProyectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
