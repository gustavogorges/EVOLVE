import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaChatComponent } from './tela-chat.component';

describe('TelaChatComponent', () => {
  let component: TelaChatComponent;
  let fixture: ComponentFixture<TelaChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
