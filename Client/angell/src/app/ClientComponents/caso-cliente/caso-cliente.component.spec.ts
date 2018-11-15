import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasoClienteComponent } from './caso-cliente.component';

describe('CasoClienteComponent', () => {
  let component: CasoClienteComponent;
  let fixture: ComponentFixture<CasoClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasoClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
