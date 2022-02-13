import { Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../user.class";
import {emailValidator, rangeValidator} from "../custom-validators";
import {FORM_ERRORS, FORM_PLACEHOLDERS, FORM_ROLES, FORM_SUCCESS, FORM_VALIDATION_MESSAGES} from "../form-data";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {


  placeholders = FORM_PLACEHOLDERS;
  formErrors = FORM_ERRORS;
  formSuccess = FORM_SUCCESS;
  validationMessages = FORM_VALIDATION_MESSAGES;
  roles = FORM_ROLES;

  userForm = new FormGroup({});
  user: User = new User(0,null,null,null, null,null);

  name: AbstractControl;
  password: AbstractControl;
  email: AbstractControl;
  age: AbstractControl;
  role: AbstractControl;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm()
  }

  private buildForm(){
    this.userForm = this.fb.group({
      name: [this.user.name,[Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      password: [this.user.password,[Validators.required,Validators.minLength(7),Validators.maxLength(25)]],
      email:[this.user.email, [Validators.required, emailValidator]],
      age:[this.user.age, [Validators.required, rangeValidator(1, 122)]],
      role:[this.user.role, [Validators.required]]
    });
    this.userForm && this.userForm.valueChanges?.subscribe(() => this.onValueChanged())
    this.createControls()
  }

  createControls() :void {
    this.name = this.userForm.controls['name'];
    this.password = this.userForm.controls['password'];
    this.email = this.userForm.controls['email'];
    this.age = this.userForm.controls['age'];
    this.role = this.userForm.controls['role'];
  }

  onValueChanged():void{
  const form = this.userForm;
  for (const field in this.formErrors){
  this.formErrors[field] = '';
  const control = form.get(field);
  if(control && (control.dirty || control.touched) && control.invalid){
    const message = this.validationMessages[field];
    for (const key in control.errors){
      this.formErrors[field] += message[key] + ' '
    }
  }
}
}

  onSubmit(): void{
    console.log()
  }

}
