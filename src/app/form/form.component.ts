import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../user.class";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, AfterViewInit {

  model: User = new User(0,'','',null)
  roles:string[] = ['Гость','Модератор','Администратор'];

  formErrors = {
    name:'',
    age:''
  }
  validationMessages = {
    name: {
      required:'Имя обязательно.',
      minlength:'Имя должно содержать минимум 4 символа.'
    },
    age: {
      required:'Возраст обязателен.',

    }
  }

  @ViewChild('userForm')userForm: NgForm | null = null;
  constructor() { }

  ngOnInit(): void {

  }
  ngAfterViewInit():void{
    this.userForm && this.userForm.valueChanges?.subscribe(data => this.onValueChanged(data))
  }

  onValueChanged(data?:any):void{
    const form = this.userForm?.form;

    for (const field in this.formErrors){

      this.formErrors[field] = '';
      const control = form.get(field);


      if(control && control.dirty && control.invalid){
        const message = this.validationMessages[field];

        for (const key in control.errors){
          console.log(message[key])
          this.formErrors[field] += message[key] + ' '
        }
      }
    }
  }

  onSubmit(): void{
    console.log('form submitted');
  }

}
