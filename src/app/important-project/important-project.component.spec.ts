import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantProjectComponent } from './important-project.component';

describe('ImportantProjectComponent', () => {
  let component: ImportantProjectComponent;
  let fixture: ComponentFixture<ImportantProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportantProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportantProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
