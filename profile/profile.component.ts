import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Users } from '../../models/users';
import { DataService } from '../../services/data.service';
import { throwError } from 'rxjs';
// import * as alertify from 'alertify.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  // used as a flag to display or hide form
  editProfile = false;
  userDetails;
  updateMyDetails : any = {};
  editProfileForm: FormGroup;
  userImg = './../../assets/user.jpg';
  mobileErrMsg = 'You must enter a valid mobile number';
  emailErrMsg = 'You must enter a valid Email ID';
  locationErrMsg = 'You must enter the location';
    userId :string;
  constructor(private dataService: DataService) { 

  }

  ngOnInit() {

    // add necessary validators
    // username should be disabled. it should not be edited

    this.editProfileForm = new FormGroup({
     userName: new FormControl({ value: '',disabled:true},[Validators.required]),
      mobile: new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      location: new FormControl('',[Validators.required])
    });
    
    // get profile details and display it
   // this.userId=localStorage.getItem('id');
    this.getProfileDetails();
  }
get f() { return this.editProfileForm.controls; }
  getProfileDetails() {

    // retrieve user details from service using userId
this.dataService.getUserDetails().subscribe(res=>this.userDetails=res,error=>throwError(error));
  }

  changeMyProfile() {

    // if successfully changed the profile it should display new details hiding the form
let res;
      this.userDetails.user_email=this.editProfileForm.controls['email'].value;
     this.userDetails.location=this.editProfileForm.controls['location'].value;
     this.userDetails.user_mobile=this.editProfileForm.controls['mobile'].value;
    this.dataService.updateProfile(localStorage.getItem('id'),this.userDetails).subscribe
    (
      res1=>{
        res=res1
      if(res){
this.discardEdit();
  this.getProfileDetails();
}
      
      },
      
      error=>{});
    // if successfully changed the profile it should display new details hiding the form

  }

  editMyProfile() {

    // change editProfile property value appropriately
this.editProfile=true;
this.editProfileForm.controls['userName'].setValue(this.userDetails.user_name);
this.editProfileForm.controls['mobile'].setValue(this.userDetails.user_mobile);
this.editProfileForm.controls['email'].setValue(this.userDetails.user_email);
this.editProfileForm.controls['location'].setValue(this.userDetails.location);
  }

  discardEdit() {

    // change editProfile property value appropriately
this.editProfile=false;
  }

}
