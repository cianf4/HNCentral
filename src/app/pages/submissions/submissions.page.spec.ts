import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubmissionsPage } from './submissions.page';

describe('SubmissionsPage', () => {
  let component: SubmissionsPage;
  let fixture: ComponentFixture<SubmissionsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SubmissionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
