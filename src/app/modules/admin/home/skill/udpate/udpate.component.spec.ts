import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdpateComponent } from './udpate.component';

describe('UdpateComponent', () => {
  let component: UdpateComponent;
  let fixture: ComponentFixture<UdpateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UdpateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UdpateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
