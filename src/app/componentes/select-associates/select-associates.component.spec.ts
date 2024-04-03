import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAssociatesComponent } from './select-associates.component';

describe('SelectAssociatesComponent', () => {
  let component: SelectAssociatesComponent;
  let fixture: ComponentFixture<SelectAssociatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectAssociatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectAssociatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
