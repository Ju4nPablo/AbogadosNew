import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadParametrizableComponent } from './actividad-parametrizable.component';

describe('ActividadParametrizableComponent', () => {
  let component: ActividadParametrizableComponent;
  let fixture: ComponentFixture<ActividadParametrizableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadParametrizableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadParametrizableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
