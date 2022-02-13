export const FORM_PLACEHOLDERS: any = {
  name:'Имя',
  password:'Пароль',
  email:'Электронная почта',
  age:'Возраст',
  role:'Выберите роль из списка'
}

export const FORM_SUCCESS: any = {
  name:'Принято!',
  password:'Принято!',
  email:'Принято!',
  age:'Принято!',
  role:'Принято!'
};

export  const FORM_ERRORS: any = {
  name:'',
  password:'',
  email:'',
  age:'',
  role:''
};
export const FORM_VALIDATION_MESSAGES = {
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

export const FORM_ROLES:string[] = ['Гость','Модератор','Администратор'];

