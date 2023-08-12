import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AskPage } from './ask.page';

describe('AskPage', () => {
  let component: AskPage;
  let fixture: ComponentFixture<AskPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
