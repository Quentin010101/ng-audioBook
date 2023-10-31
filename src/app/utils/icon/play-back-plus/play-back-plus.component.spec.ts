import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayBackPlusComponent } from './play-back-plus.component';

describe('PlayBackPlusComponent', () => {
  let component: PlayBackPlusComponent;
  let fixture: ComponentFixture<PlayBackPlusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayBackPlusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayBackPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
