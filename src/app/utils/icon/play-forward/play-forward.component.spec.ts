import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayForwardComponent } from './play-forward.component';

describe('PlayForwardComponent', () => {
  let component: PlayForwardComponent;
  let fixture: ComponentFixture<PlayForwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayForwardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayForwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
