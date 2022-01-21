import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Patient } from '../../models/patient';
import { DataService } from '../../services/data.service';
// import * as alertify from 'alertify.js';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [DatePipe]
})
export class FormComponent implements OnInit {

  complexForm: FormGroup;
  patientDetails = new Patient;
  result;

  today: string;

  noRecordsFound = 'No patient records found in the list. Click on Register New Patient to add Patient details.';

  emptyName = 'You must include a name.';
  minlengthName = 'Your name must be at least 3 characters long.';
  maxlengthName = 'Your name cannot exceed 20 characters.';
  noGender = 'You must select a gender.';
  noDob = 'You must select a valid date of birth.';
  noMobile = 'You must include mobile number.';
  numberMobile = 'You must enter a valid 10 digit mobile number.';
  maxlengthMobile = 'Your mobile number should not exceed 10 digits.';
  patternEmail = 'You must enter a valid Email ID.';

  ngOnInit() {
    this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }

  constructor( fb: FormBuilder,private datePipe: DatePipe,private route: Router, private dataService: DataService){
    // add necessary validators
    this.complexForm = fb.group({
      'name' : ['',[
      Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      'gender' : [null,[Validators.required]],
      'dob' : [null,[Validators.required]],
      'mobile' : ['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10,}$"),Validators.maxLength(10)]],
      'email' : ['',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    })
  }
get f(){
  return this.complexForm.controls;
}
  submitForm(value: any){

    // should reister new patient using service
       // fields that need to be added: patient_name, patient_gender, patient_dob, patient_mobile, patient_email
    // if added successfully should redirect to 'patientList' page
const mockReqBody = {
        patient_email: this.complexForm.controls['email'].value,
        patient_dob: this.complexForm.controls['dob'].value,
        patient_mobile: this.complexForm.controls['mobile'].value,
        patient_gender: this.complexForm.controls['gender'].value,
        patient_name: this.complexForm.controls['name'].value		
      }
      // console.log(this.signupForm.controls['userName'].value);
     this.patientDetails=new Patient(mockReqBody)
	 this.dataService.registerPatient(this.patientDetails).subscribe(res=>this.result=res);
if(this.result!=null){
 this.route.navigate(['patientList']);
}
  }

}
