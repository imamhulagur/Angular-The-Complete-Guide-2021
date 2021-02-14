import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostsServices } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSubs: Subscription;

  constructor(private http: HttpClient,
      private postsService: PostsServices) {}

  ngOnInit() {
    //listening to the subject
    this.errorSubs = this.postsService.errorMessage.subscribe(errorMessage=> {
      this.error = errorMessage;
    })
    //this.fetchPosts();
    this.isFetching = true;//before sending request
    this.postsService.fetchPosts().subscribe(posts=> {
      this.isFetching = false;//after done with request
      this.loadedPosts=posts;//store the posts into loadedPosts
    },error => {
      this.error = error.message;
      console.log(error);
    });
  }

  onCreatePost(postData: Post) {
    // Send Http request
    //console.log(postData);
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    //this.fetchPosts();
    this.isFetching = true;//before sending request
    this.postsService.fetchPosts().subscribe(posts=> {
        this.isFetching = false;//after done with request
        this.loadedPosts=posts;//store the posts into loadedPosts
      }, error => {
        this.isFetching = false;
        this.error = error.message;
        console.log(error);
      }
    );
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(()=>{
      //i dont really care about the response/fag here
      this.loadedPosts = [];//make all the loaded posts array empty
    }, error => {
      this.error = error.message;
    })
  }

  //separate functionality because it is involved connect related data
  // private fetchPosts() {
  //   this.isFetching = true;
    
  // }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.errorSubs.unsubscribe();
  }
}
