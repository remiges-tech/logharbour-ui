import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowactivityLogComponent } from './showactivity-log.component';

describe('ShowactivityLogComponent', () => {
  let component: ShowactivityLogComponent;
  let fixture: ComponentFixture<ShowactivityLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowactivityLogComponent]
    });
    fixture = TestBed.createComponent(ShowactivityLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
