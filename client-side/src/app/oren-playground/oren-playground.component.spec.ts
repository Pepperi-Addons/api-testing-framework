import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrenPlaygroundComponent } from './oren-playground.component';

describe('OrenPlaygroundComponent', () => {
  let component: OrenPlaygroundComponent;
  let fixture: ComponentFixture<OrenPlaygroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrenPlaygroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrenPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
