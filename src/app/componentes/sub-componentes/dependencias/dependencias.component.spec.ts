import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenciasComponent } from './dependencias.component';

describe('DependenciasComponent', () => {
  let component: DependenciasComponent;
  let fixture: ComponentFixture<DependenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DependenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DependenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
