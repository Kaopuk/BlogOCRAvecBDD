import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    var config = {
      apiKey: 'AIzaSyBqLNViH57Ods__Qa6DR0u6yeMU4nzt4Pw',
      authDomain: 'blog-kaopuk.firebaseapp.com',
      databaseURL: 'https://blog-kaopuk.firebaseio.com',
      projectId: 'blog-kaopuk',
      storageBucket: 'blog-kaopuk.appspot.com',
      messagingSenderId: '300442427583'
    };
    firebase.initializeApp(config);
  }
}

