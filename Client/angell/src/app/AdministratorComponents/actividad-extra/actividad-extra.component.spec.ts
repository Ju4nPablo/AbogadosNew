import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadExtraComponent } from './actividad-extra.component';

describe('ActividadExtraComponent', () => {
  let component: ActividadExtraComponent;
  let fixture: ComponentFixture<ActividadExtraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadExtraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
