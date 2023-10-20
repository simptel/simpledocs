import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRepoComponent } from './input-repo.component';

describe('InputRepoComponent', () => {
  let component: InputRepoComponent;
  let fixture: ComponentFixture<InputRepoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputRepoComponent]
    });
    fixture = TestBed.createComponent(InputRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
