import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { PostCommentsResponse } from './../../models/forum/postCommentsResponse.interface';
import { ForumServiceProvider } from './../../providers/forum-service/forum-service';
import { PostComment } from './../../models/forum/postComment.interface';
import { Post } from './../../models/forum/post.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import * as daLocale from 'date-fns/locale/da/index.js'

@IonicPage()
@Component({
  selector: 'page-single-post',
  templateUrl: 'single-post.html',
})

export class SinglePostPage {
  
  public searching: boolean = false;
  public maxWordCount: number = 100;
  public wordCount: number = 100;
  public newComment: string;
  public postingNewComment: boolean = false;

  public postData: Post;
  public comments: PostComment[];

  public i18nOptions = {
    locale: daLocale
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public forumService: ForumServiceProvider,
    private authService: AuthServiceProvider,
    private toastCtrl: ToastController
  ) {
    this.postData = this.navParams.data;
  }
  
  ionViewDidLoad() {
    this.getComments();
  }

  getComments() {
    this.searching = true;
    this.forumService.getPostComments(this.postData.post_id)
      .then(PostCommentsResponse => {
        this.comments = PostCommentsResponse.comments;
        this.searching = false;
      })
      .catch(err => console.log(err));
  }

  postNewComment() {
    this.postingNewComment = true;
    let user = this.authService.getUser();
    let comment = Object.assign({}, {
      text: this.newComment,
      user_name: user.name
    });
    this.newComment = '';
    this.forumService.postNewComment(this.postData.post_id, comment)
      .then(result => {
        this.postingNewComment = false;
        this.getComments();
        let toast = this.toastCtrl.create({
          message: 'Kommentar oprettet',
          duration: 3000,
          position: 'top',
          showCloseButton: true,
          closeButtonText: 'Luk'
        });
        toast.present();
      })
      .catch(err => console.log(err))
  }
  doWordCount(value) {
    this.wordCount = this.maxWordCount - value.length;
  }

}
