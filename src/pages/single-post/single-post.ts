import { PostCommentsResponse } from './../../models/forum/postCommentsResponse.interface';
import { ForumServiceProvider } from './../../providers/forum-service/forum-service';
import { PostComment } from './../../models/forum/postComment.interface';
import { Post } from './../../models/forum/post.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as daLocale from 'date-fns/locale/da/index.js'

@IonicPage()
@Component({
  selector: 'page-single-post',
  templateUrl: 'single-post.html',
})

export class SinglePostPage {
  
  public maxWordCount: number = 150;
  public wordCount: number = 150;
  public newComment: string;
  public postData: Post;
  public comments: PostComment[];

  public i18nOptions = {
    locale: daLocale
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public forumService: ForumServiceProvider
  ) {
    this.postData = this.navParams.data;
  }
  
  ionViewDidLoad() {
    this.getComments();
  }

  getComments() {
    this.forumService.getPostComments(this.postData.post_id)
      .then(PostCommentsResponse => {
        this.comments = PostCommentsResponse.comments;
      })
      .catch(err => console.log(err));
  }

  test() {
    console.log(this.newComment);
  }
  doWordCount(value) {
    this.wordCount = this.maxWordCount - value.length;
  }

}
