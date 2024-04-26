import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnusualIpComponent } from './unusual-ip.component';

describe('UnusualIpComponent', () => {
  let component: UnusualIpComponent;
  let fixture: ComponentFixture<UnusualIpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnusualIpComponent]
    });
    fixture = TestBed.createComponent(UnusualIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
