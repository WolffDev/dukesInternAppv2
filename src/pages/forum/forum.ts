import { PostResponse } from './../../models/forum/postResponse.interface';
import { Post } from './../../models/forum/post.interface';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { CategoryResponse } from './../../models/forum/categoryResponse.interface';
import { ForumServiceProvider } from './../../providers/forum-service/forum-service';
import { Category } from './../../models/forum/category.interface';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-forum',
  templateUrl: 'forum.html',
})
export class ForumPage implements OnInit {

  categories: Category[];
  activePosts: Post[];
  public selectedCategory: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private forumService: ForumServiceProvider,
    private authService: AuthServiceProvider,
    private storageService: StorageServiceProvider,
  ) {
    this.getCategories();
  }
  ngOnInit() {
  }
  
  ionViewWillEnter(){
    console.log(JSON.stringify(this.categories));
  }
  ionViewDidEnter(){
  }
  ionViewDidLoad() {
    console.log(JSON.stringify(this.categories));
  }

  getCategories() {
    this.forumService.getCategories().then( CategoryResponse => {
      this.categories = CategoryResponse.categories;
      this.selectedCategory = CategoryResponse.categories[0].title;
      this.authService.setToken(CategoryResponse.token);
      this.storageService.setToken(CategoryResponse.token);
      this.getNewPosts(CategoryResponse.categories[0].category_id)
    })
  }
  onSegmentChange($event, index) {
    this.selectedCategory = this.categories[index].title;
    this.getNewPosts(this.categories[index].category_id);
  }

  getNewPosts(categoryId) {
    this.forumService.getPostsByCategoryId(categoryId).then(PostResponse => {
      this.activePosts = PostResponse.posts;
    })
    .catch(err => console.log(JSON.stringify(err)));
  }
  showPosts() {
    console.log(JSON.stringify(this.activePosts));
  }

}
