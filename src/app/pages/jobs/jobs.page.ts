import { Component, OnInit } from '@angular/core';
import {JobsService} from "../../services/jobs.service";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit {
  jobsIds: number[] = [];
  jobs: any[] = [];

  constructor(
      private jobService: JobsService,
      private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.loadJobsStories();
  }

  async loadJobsStories() {
    const loading = await this.loadingController.create({
      spinner: 'circular',
    });
    await loading.present();
    this.jobService.getJobsStories().subscribe(response => {
      loading.dismiss();
      this.jobsIds = response;
      console.log(response);
      this.jobsIds.forEach(jobId => {
        this.jobService.getJob(jobId).subscribe((job) => {
          this.jobs.push(job);
        });
      });
    });
  }

}
