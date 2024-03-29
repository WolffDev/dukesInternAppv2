import { Post } from './../../models/forum/post.interface';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { ForumServiceProvider } from './../../providers/forum-service/forum-service';
import { Category } from './../../models/forum/category.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import * as daLocale from 'date-fns/locale/da/index.js'

@IonicPage()
@Component({
  selector: 'page-forum',
  templateUrl: 'forum.html',
})
export class ForumPage {

  public loggedInUser;
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
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    this.loggedInUser = this.authService.getUser()
    this.forumService.refresh.subscribe(value => {
      if(value) this.getCategories();
    })
  }
  ionViewDidLoad() {
    this.getCategories();
  }
  getCategories() {
    this.categories = [];
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
    this.forumPosts = [];
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
  goToPostDetails(postId, event) {
    event.stopPropagation();
    let postIndex = this.activePosts.findIndex(post => {
      return post.post_id == postId;
    });
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
  onEditPostClick(post: Post, event) {
    event.stopPropagation();
    this.editPost(post)
  }
  editPost(post: Post) {
    this.forumService.postState = false;
    this.navCtrl.push('PostPage', Object.assign(post, {categories: this.categories}))
  }
  onRemovePostClick(post: Post, event) {
    event.stopPropagation();
    let alert = this.alertCtrl.create({
      title: 'Fjern indlæg',
      message: 'Er du sikker? Kan ikke fortrydes.',
      buttons: [
        {
          text: 'Ja',
          handler: () => {
            this.removePost(post)
          }
        },
        {
          text: 'Nej',
          handler: () => {}
        }
      ]
    })
    alert.present();
  }
  removePost(post: Post) {
    this.forumService.removePost(post.post_id)
      .then(result => {
        this.getCategories();
        this.doToast('Indlæg slettet');
      })
      .catch(err => {
        console.log(err.error);
        this.doToast('Noget gik galt. Prøv igen')
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
