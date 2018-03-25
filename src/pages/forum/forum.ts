import { PostResponse } from './../../models/forum/postResponse.interface';
import { Post } from './../../models/forum/post.interface';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { CategoryResponse } from './../../models/forum/categoryResponse.interface';
import { ForumServiceProvider } from './../../providers/forum-service/forum-service';
import { Category } from './../../models/forum/category.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import * as daLocale from 'date-fns/locale/da/index.js'

@IonicPage()
@Component({
  selector: 'page-forum',
  templateUrl: 'forum.html',
})
export class ForumPage {

  public forumPosts = [];
  public categories: Category[];
  public activePosts: Post[];
  public selectedCategory: string;
  public i18nOptions = {
    locale: daLocale
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private forumService: ForumServiceProvider,
    private authService: AuthServiceProvider,
    private storageService: StorageServiceProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
  }
  ionViewDidLoad() {
    this.getCategories();
  }
  getCategories() {
    let loading = this.loadingCtrl.create({
      content: 'Henter Forum'
    });
    loading.present();
    this.forumService.getCategories().then( CategoryResponse => {
      this.categories = CategoryResponse.categories;
      this.selectedCategory = CategoryResponse.categories[0].title;
      this.getNewPosts(CategoryResponse.categories[0].category_id);
      loading.dismiss();
    })
    .catch(err => {
      loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Fejl ved indlæsning',
          message: JSON.stringify(err.message),
          buttons: ['Prøv igen']
        });
        alert.present();
    })
  }
  onSegmentChange(categoryTitle) {
    this.selectedCategory = categoryTitle;
    this.setActivePosts(categoryTitle);
  }

  getNewPosts(categoryId) {
    this.forumService.getPostsByCategoryId(categoryId).then(PostResponse => {
      this.activePosts = PostResponse.posts;
    })
    this.categories.forEach( category => {
      this.forumService.getPostsByCategoryId(category.category_id).then(PostResponse => {
        const obj = {};
        const catTitle = category.title;
        const posts = PostResponse.posts;
        obj[catTitle] = posts;
        this.forumPosts.push(obj)
      })
      .catch(err => console.log(JSON.stringify(err)));
    })
  }
  goToPostDetails(postId, post) {
    let postIndex = this.activePosts.findIndex(post => {
      return post.post_id == postId;
    });
    console.log(post);
    this.navCtrl.push('SinglePostPage', this.activePosts[postIndex]);
  }
  setActivePosts(categoryTitle) {
    let posts = this.forumPosts.find(value => {
      return value.hasOwnProperty(categoryTitle);
    });
    this.activePosts = posts[categoryTitle];
  }
  addNewPost() {
    this.forumService.postState = true;
    this.navCtrl.push('PostPage', Object.assign(this.authService.getUser(), {categories: this.categories}));
  }
  async updateForum(refresher) {
    await this.getCategories();
    refresher.complete()
  }

}
