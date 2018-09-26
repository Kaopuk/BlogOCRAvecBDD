import { Component, OnInit } from '@angular/core';
import {Post} from '../../models/Posts.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {PostsService} from '../../services/posts.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder,
              private postsService: PostsService,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.postsService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  onSavePost() {
    const title = this.postForm.get('title').value;
    const content = this.postForm.get('content').value;
    const author = firebase.auth().currentUser.email;
    const newPost = new Post(title, content, author);
    if (this.fileUrl && this.fileUrl !== '') {
      newPost.photo = this.fileUrl;
    }
    this.postsService.createNewPost(newPost);
    this.router.navigate(['/posts']);
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

}
