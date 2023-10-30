import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IlibraryComponent } from './ilibrary.component';

describe('IlibraryComponent', () => {
  let component: IlibraryComponent;
  let fixture: ComponentFixture<IlibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IlibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IlibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
