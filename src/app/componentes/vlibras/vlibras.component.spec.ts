import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VlibrasComponent } from './vlibras.component';

describe('VlibrasComponent', () => {
  let component: VlibrasComponent;
  let fixture: ComponentFixture<VlibrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VlibrasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VlibrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
