import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOptionFullViewComponent } from './modal-option-full-view.component';

describe('ModalOptionFullViewComponent', () => {
  let component: ModalOptionFullViewComponent;
  let fixture: ComponentFixture<ModalOptionFullViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOptionFullViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalOptionFullViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
