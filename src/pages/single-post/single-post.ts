import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { PostCommentsResponse } from './../../models/forum/postCommentsResponse.interface';
import { ForumServiceProvider } from './../../providers/forum-service/forum-service';
import { PostComment } from './../../models/forum/postComment.interface';
import { Post } from './../../models/forum/post.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import * as daLocale from 'date-fns/locale/da/index.js'

@IonicPage()
@Component({
  selector: 'page-single-post',
  templateUrl: 'single-post.html',
})

export class SinglePostPage {

  public loggedInUser;
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
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.postData = this.navParams.data;
    this.loggedInUser = this.authService.getUser();
  }
  
  ionViewDidLoad() {
    this.getComments();
  }

  getComments() {
    this.searching = true;
    this.comments = [];
    this.forumService.getPostComments(this.postData.post_id)
      .then(PostCommentsResponse => {
        this.comments = PostCommentsResponse.comments;
        this.searching = false;
      })
      .catch(err => console.log(err));
  }

  postNewComment() {
    this.postingNewComment = true;
    let comment = Object.assign({}, {
      text: this.newComment,
      user_name: this.loggedInUser.name
    });
    this.newComment = '';
    this.forumService.postNewComment(this.postData.post_id, comment)
      .then(result => {
        this.postingNewComment = false;
        this.getComments();
        this.doToast('Kommentar oprettet');
      })
      .catch(err => {
        this.doToast('Noget gik galt, prøv igen');
        console.log(err);
      })
  }
  doWordCount(value) {
    this.wordCount = this.maxWordCount - value.length;
  }
  onRemoveCommentClick(commentId) {
    let alert = this.alertCtrl.create({
      title: 'Fjern kommentar',
      message: 'Er du sikker? Kan ikke fortrydes.',
      buttons: [
        {
          text: 'Ja',
          handler: () => {
            // alert.dismiss();
            this.removeComment(commentId)
          }
        },
        {
          text: 'Nej',
          handler: () => {
            // alert.dismiss();
          }
        }
      ]
    })
    alert.present();
  }
  removeComment(commentId) {
    this.forumService.removeComment(commentId)
    .then(result => {
      this.getComments();
      this.doToast('Kommentar fjernet')
    })
    .catch(err => {
      this.doToast('Noget gik galt, prøv igen')
      console.log(err);
    })
  }

  doToast(message: string, duration: number = 3000, position: string = 'top') {
    let toast = this.toastCtrl.create({
      message,
      duration,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Luk'
    });
    toast.present();
  }


}
