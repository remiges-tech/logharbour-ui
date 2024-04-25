import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugLogComponent } from './debug-log.component';

describe('DebugLogComponent', () => {
  let component: DebugLogComponent;
  let fixture: ComponentFixture<DebugLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebugLogComponent]
    });
    fixture = TestBed.createComponent(DebugLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
