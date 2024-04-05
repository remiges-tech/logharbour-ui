import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatachangeLogComponent } from './datachange-log.component';

describe('DatachangeLogComponent', () => {
  let component: DatachangeLogComponent;
  let fixture: ComponentFixture<DatachangeLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatachangeLogComponent]
    });
    fixture = TestBed.createComponent(DatachangeLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
