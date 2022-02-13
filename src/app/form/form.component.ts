import { Component, OnInit} from '@angular/core';
import {FormBuilder,  FormGroup, Validators} from "@angular/forms";
import {User} from "../user.class";
import {emailValidator, rangeValidator} from "../custom-validators";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {



  userForm = new FormGroup({});

  user: User = new User(0,null,null,null, null,null);
  roles:string[] = ['Гость','Модератор','Администратор'];

  formErrors: any = {
  name:'',
  password:'',
  email:'',
  age:'',
  role:''
}
formSuccess: any = {
  name:'Принято!',
  password:'Принято!',
  email:'Принято!',
  age:'Принято!',
  role:'Принято!'
}

  validationMessages: any = {
    name: {
      required:'Имя обязательно.',
      minlength:'Имя должно содержать не менее 4 символов.',
      maxlength:'Имя должно содержать не более 15 символов.'
    },
    password: {
      required:'Пароль обязателен.',
      minlength:'Пароль должен содержать не менее 7 символов.',
      maxlength:'Пароль должен содержать не более 25 символов.'
    },
    email:{
      required:'Email обязателен.',
      emailValidator:'Неправельный формат email адреса.',

    },
    age: {
      required:'Возраст обязателен.',
      rangeValidator:'Значение должно быть числом в диапазоне 1..122'
    },
    role: {
      required:'Обязательное поле',
    }
}


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
  }

}
//
// model: User = new User(0,'','',null)
// roles:string[] = ['Гость','Модератор','Администратор'];
//
// formErrors = {
//   name:'',
//   age:''
// }
// validationMessages = {
//   name: {
//     required:'Имя обязательно.',
//     minlength:'Имя должно содержать минимум 4 символа.'
//   },
//   age: {
//     required:'Возраст обязателен.',
//
//   }
// }
//
// @ViewChild('userForm')userForm: NgForm | null = null;
// constructor() { }
//
// ngOnInit(): void {
//
// }
// ngAfterViewInit():void{
//   this.userForm && this.userForm.valueChanges?.subscribe(data => this.onValueChanged(data))
// }
//
// onValueChanged(data?:any):void{
//   const form = this.userForm?.form;
//
//   for (const field in this.formErrors){
//
//   this.formErrors[field] = '';
//   const control = form.get(field);
//
//
//   if(control && control.dirty && control.invalid){
//     const message = this.validationMessages[field];
//
//     for (const key in control.errors){
//       console.log(message[key])
//       this.formErrors[field] += message[key] + ' '
//     }
//   }
// }
// }
//
// onSubmit(): void{
//   console.log('form submitted');
// }
