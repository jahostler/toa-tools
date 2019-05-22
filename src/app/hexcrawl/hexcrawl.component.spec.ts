import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HexcrawlComponent } from './hexcrawl.component';

describe('HexcrawlComponent', () => {
  let component: HexcrawlComponent;
  let fixture: ComponentFixture<HexcrawlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HexcrawlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexcrawlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
