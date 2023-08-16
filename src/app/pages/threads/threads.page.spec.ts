import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThreadsPage } from './threads.page';

describe('ThreadsPage', () => {
  let component: ThreadsPage;
  let fixture: ComponentFixture<ThreadsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ThreadsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
