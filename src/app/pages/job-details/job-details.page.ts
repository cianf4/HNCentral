import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LoadingController} from "@ionic/angular";
import {JobsService} from "../../services/jobs.service";

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.page.html',
  styleUrls: ['./job-details.page.scss'],
})
export class JobDetailsPage implements OnInit {
  job: any = null;
  jobId: string | null = this.route.snapshot.paramMap.get('jobId');

  constructor(
      private route: ActivatedRoute,
      private jobService: JobsService,
      private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.loadJob();
  }

  async loadJob() {
    const loading = await this.loadingController.create({
      spinner: 'circular',
    });
    await loading.present();
    this.jobService.getJob(this.jobId).subscribe((job) => {
      loading.dismiss();
      this.job = job;
      console.log(job);
    });
  }

  openJob() {
    window.open(this.job.url);
  }

}
