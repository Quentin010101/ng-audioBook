import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IhomeComponent } from './ihome.component';

describe('IhomeComponent', () => {
  let component: IhomeComponent;
  let fixture: ComponentFixture<IhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IhomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
