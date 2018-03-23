import { PostResponse } from './../../models/forum/postResponse.interface';
import { Post } from './../../models/forum/post.interface';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { CategoryResponse } from './../../models/forum/categoryResponse.interface';
import { ForumServiceProvider } from './../../providers/forum-service/forum-service';
import { Category } from './../../models/forum/category.interface';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import * as daLocale from 'date-fns/locale/da/index.js'

@IonicPage()
@Component({
  selector: 'page-forum',
  templateUrl: 'forum.html',
})
export class ForumPage implements OnInit {

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
  ngOnInit() {
  }
  
  ionViewWillEnter(){
  }
  ionViewDidEnter(){
  }
  ionViewDidLoad() {
    this.getCategories();
    console.log('#### FORUM VIEW LOADED ####');
  }

  getCategories() {
    let loading = this.loadingCtrl.create({
      content: 'Henter Forum'
    });
    loading.present();
    this.forumService.getCategories().then( CategoryResponse => {
      this.categories = CategoryResponse.categories;
      this.selectedCategory = CategoryResponse.categories[0].title;
      this.getNewPosts(CategoryResponse.categories[0].category_id)
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
  goToPostDetails(postId) {
    console.log(postId);
  }

}
