import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardabogadoComponent } from './dashboardabogado.component';

describe('DashboardabogadoComponent', () => {
  let component: DashboardabogadoComponent;
  let fixture: ComponentFixture<DashboardabogadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardabogadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardabogadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
