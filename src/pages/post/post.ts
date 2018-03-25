import { PostData } from './../../models/forum/postData.interface';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForumServiceProvider } from './../../providers/forum-service/forum-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';

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
    private alertCtrl: AlertController,
    private toastCtrl: ToastController

  ) {
    this.newPost = this.forumService.postState;
    this.postData = this.navParams.data
    console.log(JSON.stringify(this.postData));

    this.postForm = this.formBuilder.group({
      title: [this.newPost ? '' : 'NEJ', Validators.compose([Validators.maxLength(50), Validators.required])],
      body: [this.newPost ? '' : 'NEJ', Validators.compose([Validators.maxLength(255), Validators.required])],
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
    let loading = this.loadingCtrl.create({
      content: this.newPost ? 'Opretter indlæg' : 'Opdaterer indlæg'
    })
    loading.present();
    if(!this.postForm.valid) {
      loading.dismiss()
      this.submitAttempt = true;
      console.log('NOT VALID');
      return;
    } else {
      // TODO: handle either update or post, depending on state
      this.forumService.saveNewPost(Object.assign(this.postForm.value, {user_name: this.postData.name}))
        .then( result => {
          loading.dismiss();
          this.confirmedExit = true;
          let toast = this.toastCtrl.create({
            message: this.newPost ? 'Indlæg oprettet' : 'Indlæg opdateret',
            duration: 3000,
            position: 'top',
            showCloseButton: true,
            closeButtonText: 'Luk'
          });
          toast.present();
          this.navCtrl.pop()
        })
        .catch(err => {
          loading.dismiss();
          this.confirmedExit = true;
          let toast = this.toastCtrl.create({
            message: err.message,
            duration: 3000,
            position: 'top',
            showCloseButton: true,
            closeButtonText: 'Luk'
          });
          toast.present();
          this.navCtrl.pop();
        })
    }
    // TODO: create observable to subscribe on new/update post, in order to getNewPosts
    console.log(JSON.stringify(this.postData.name))
    console.log(this.postForm.value.title, this.postForm.value.body);
    console.log();
  }
  test($event) {
    console.log($event, $event.value);
  }
}
