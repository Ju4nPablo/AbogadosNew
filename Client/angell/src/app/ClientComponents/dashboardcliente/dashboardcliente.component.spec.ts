import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardclienteComponent } from './dashboardcliente.component';

describe('DashboardclienteComponent', () => {
  let component: DashboardclienteComponent;
  let fixture: ComponentFixture<DashboardclienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardclienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
