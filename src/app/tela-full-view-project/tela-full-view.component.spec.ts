import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaFullViewComponent } from './tela-full-view.component';

describe('TelaFullViewComponent', () => {
  let component: TelaFullViewComponent;
  let fixture: ComponentFixture<TelaFullViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaFullViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaFullViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
