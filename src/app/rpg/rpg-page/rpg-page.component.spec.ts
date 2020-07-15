import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgPageComponent } from './rpg-page.component';

describe('RpgPageComponent', () => {
  let component: RpgPageComponent;
  let fixture: ComponentFixture<RpgPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpgPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpgPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
