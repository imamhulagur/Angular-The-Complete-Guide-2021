import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  private userSub: Subscription;
  isAuthenticated = false;
  constructor(
      private dataStorageService: DataStorageService,
      private authService: AuthService
      ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(
      user=> {
        this.isAuthenticated = !user ? false: true;//!!user
      }
    );
  }
  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
