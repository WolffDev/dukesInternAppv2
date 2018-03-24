import { ForumServiceProvider } from './../../providers/forum-service/forum-service';
import { PostComment } from './../../models/forum/postComment.interface';
import { Post } from './../../models/forum/post.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-single-post',
  templateUrl: 'single-post.html',
})

export class SinglePostPage {
  
  public postData: Post;
  public comments: PostComment[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public forumService: ForumServiceProvider
  ) {
  }
  
  ionViewDidLoad() {
    this.postData = this.navParams.data;
    this.forumService.getPostComments(this.postData.post_id)
    console.log('ionViewDidLoad SinglePostPage');
  }

}
