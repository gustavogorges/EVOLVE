import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStatusComponent } from './select-status.component';

describe('SelectStatusComponent', () => {
  let component: SelectStatusComponent;
  let fixture: ComponentFixture<SelectStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
