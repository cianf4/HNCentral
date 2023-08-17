import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LoadingController} from "@ionic/angular";
import {NewsService} from "../../services/news.service";
import {StorageService} from "../../services/storage.service";
import {Share} from "@capacitor/share";

@Component({
  selector: 'app-story',
  templateUrl: './story.page.html',
  styleUrls: ['./story.page.scss'],
})
export class StoryPage implements OnInit {
  story: any = null;
  storyId: string | null = this.route.snapshot.paramMap.get('storyId');
  isFavorite: boolean | undefined;
  showFullText: { [commentId: string]: boolean } = {};
  maxLength: number = 400;

  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private storyService: NewsService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.loadStory();
    this.updateFavoriteStatus();
  }

  async loadStory() {
    const loading = await this.loadingController.create({
      spinner: 'circular',
    });
    await loading.present();
    this.storyService.getArticle(this.storyId).subscribe((story) => {
      loading.dismiss();
      this.story = story;
      console.log(story);
    });
  }

  async updateFavoriteStatus() {
    this.isFavorite = await this.storageService.check(this.storyId);
  }

  async onFavoriteButtonClick() {
    if (this.isFavorite) {
      await this.storageService.remove(this.storyId);
      this.isFavorite = false;
    } else {
      await this.storageService.add(this.storyId);
      this.isFavorite = true;
    }
  }

  openArticle() {
    window.open(this.story.url);
  }

  toggleText(commentId: string | number) {
    this.showFullText[commentId] = !this.showFullText[commentId];
  }

  async shareViaCapacitor() {
    const shareOptions = {
      title: this.story.title,
      text: this.story.description,
      url: this.story.url,
      dialogTitle: 'Condividi con ',
    };
    await Share.share(shareOptions);
  }

  async shareOnWhatsApp() {
    const shareUrl = encodeURIComponent(this.story.url);
    const whatsappUrl = `whatsapp://send?text=${shareUrl}`;
    window.open(whatsappUrl, '_system');
  }

  async shareOnFacebook() {
    const shareUrl = encodeURIComponent(this.story.url);
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
    window.open(facebookUrl, '_blank');
  }

  async shareOnLinkedIn() {
    const shareUrl = encodeURIComponent(this.story.url);
    const linkedinUrl = `https://www.linkedin.com/shareArticle?url=${shareUrl}`;
    window.open(linkedinUrl, '_blank');
  }


}
