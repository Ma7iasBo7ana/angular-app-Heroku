import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamionerosComponent } from './camioneros.component';

describe('CamionerosComponent', () => {
  let component: CamionerosComponent;
  let fixture: ComponentFixture<CamionerosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamionerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamionerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
