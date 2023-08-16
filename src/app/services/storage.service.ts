import { Injectable } from '@angular/core';
import { Preferences } from "@capacitor/preferences";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageKey = 'favorites';

  constructor() { }


  async add(articleId: string | null): Promise<void> {
    const favoriteIds = await this.get();
    if (articleId && !favoriteIds.includes(articleId)) {
      favoriteIds.push(articleId);
      await this.set(favoriteIds);
    }
  }

  async remove(articleId: string | null): Promise<void> {
    const favoriteIds = await this.get();
    if (articleId != null) {
      const index = favoriteIds.indexOf(articleId);
      if (index !== -1) {
        favoriteIds.splice(index, 1);
        await this.set(favoriteIds);
      }
    }
  }

  async check(articleId: string | null): Promise<boolean> {
    const favoriteIds = await this.get();
    return favoriteIds.includes(<string>articleId);
  }

  async get(): Promise<string[]> {
    const { value } = await Preferences.get({ key: this.storageKey });
    return value ? JSON.parse(value) : [];
  }

  async set(favoriteIds: string[]): Promise<void> {
    await Preferences.set({ key: this.storageKey, value: JSON.stringify(favoriteIds) });
  }

}
