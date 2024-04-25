import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighpriLogComponent } from './highpri-log.component';

describe('HighpriLogComponent', () => {
  let component: HighpriLogComponent;
  let fixture: ComponentFixture<HighpriLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HighpriLogComponent]
    });
    fixture = TestBed.createComponent(HighpriLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
