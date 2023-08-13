import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AskDetailsPage } from './ask-details.page';

describe('AskDetailsPage', () => {
  let component: AskDetailsPage;
  let fixture: ComponentFixture<AskDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AskDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
