import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../services/posts.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {Post} from '../models/Posts.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[];
  postsSubcription: Subscription;

  constructor(private postsService: PostsService,
              private router: Router) {
  }

  ngOnInit() {
    this.postsSubcription = this.postsService.postsSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postsService.getPosts();
  }

  onNewPost() {
    this.router.navigate(['/posts', 'new']);
  }

  onDeletePost(post: Post) {
    this.postsService.removePost(post);
  }

  onViewPost(id: number) {
    this.router.navigate(['/posts', 'view', id]);
  }

  ngOnDestroy() {
    this.postsSubcription.unsubscribe();
  }

  onLove(id: number) {

    this.posts[id].loveIts = this.posts[id].loveIts + 1;
    this.postsService.updateLoveIts(this.posts);
  }

  outLove(id: number) {
    this.posts[id].loveIts = this.posts[id].loveIts - 1;
    this.postsService.updateLoveIts(this.posts);
  }
}
