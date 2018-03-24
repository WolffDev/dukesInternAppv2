import { PostData } from './../../models/forum/postData.interface';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForumServiceProvider } from './../../providers/forum-service/forum-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  public newPost: boolean = false;
  postData: PostData;
  postForm: FormGroup;
  submitAttempt: boolean = false;
  confirmedExit: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private forumService: ForumServiceProvider,
    public formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private authService: AuthServiceProvider,
    private alertCtrl: AlertController

  ) {
    this.newPost = this.forumService.postState;
    this.postData = this.navParams.data
    console.log(JSON.stringify(this.postData));

    this.postForm = this.formBuilder.group({
      title: [this.newPost ? '' : 'NEJ', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      body: [this.newPost ? '' : 'NEJ', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      category_id: [this.newPost ? '' : '1', Validators.required]
    })
  }

  ionViewDidLoad() {
  }
  ionViewCanLeave() {
    if(!this.confirmedExit) {
      if(this.postForm.value.title.length === 0 && this.postForm.value.body.length === 0) {
        this.exitPage();
      } else {
        let alert = this.alertCtrl.create({
          title: 'Ikke gemt',
          message: 'Du har endnu ikke gemt dette indlæg. Er du sikker på at du vil forlade siden?',
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                this.exitPage();
                this.navCtrl.pop();
                return true;
              }
            },
            {
              text: 'Nej',
              handler: () => {
                alert.dismiss();
                return false;
              }
            }
          ]
        });
        alert.present();
        return false;
      }
    }
  }
  exitPage() {
    this.confirmedExit = true;
    // this.navCtrl.pop();
  }

  handlePost() {
    // let loading = this.loadingCtrl.create({
    //   content: this.newPost ? 'Opretter indlæg' : 'Opdaterer indlæg'
    // })
    // loading.present();
    // if(!this.postForm.valid) {
    //   loading.dismiss()
    //   this.submitAttempt = true;
    //   console.log('NOT VALID');
    //   return;
    // }
    // TODO: create observable to subscribe on new/update post, in order to getNewPosts
    console.log(JSON.stringify(this.postData.name))
    console.log(this.postForm.value.title, this.postForm.value.body);
    console.log(Object.assign(this.postForm.value, {user_name: this.postData.name}));
  }
  test(){
    console.log(this.postForm.value.title.length);
  }

}
