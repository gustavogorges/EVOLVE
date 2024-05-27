import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDependeciasComponent } from './modal-dependecias.component';

describe('ModalDependeciasComponent', () => {
  let component: ModalDependeciasComponent;
  let fixture: ComponentFixture<ModalDependeciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDependeciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDependeciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
