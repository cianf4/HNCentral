import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user: any = null;
  userId: string | null = this.route.snapshot.paramMap.get('userId');

  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  async loadUser() {
    const loading = await this.loadingController.create({
      spinner: 'circular',
    });
    await loading.present();
    this.userService.getUser(this.userId).subscribe((user) => {
      loading.dismiss();
      this.user = user;
      console.log(user);
    });
  }

}
