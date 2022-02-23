import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {delay, Observable} from "rxjs";

export function emailValidator(control: AbstractControl):{ [key: string]: any } | null{
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
  const value = control.value;

  const result = emailRegex.test(value);

  if(!result){
    return {emailValidator:{value}}
  }

  return null;
}

export function rangeValidator(minValue: number, maxValue: number): ValidatorFn{
  return (control: AbstractControl):{ [key: string]: any } =>{

    const value = +control.value

    if(isNaN(value)){
      return {rangeValidator:{value}}
    } else if (value<minValue || value > maxValue){
      return {rangeValidator:{value}}
    }

    return null;
  }
}


export function asyncUrlValidator(control: AbstractControl): Promise<ValidationErrors | null>{
  const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=]+$/
  const value = control.value
  const result = urlRegex.test(value)

  return new Promise((resolve) => {

    setTimeout(() => {
      if(result){
        resolve (null)
      }else {
        resolve({urlNotAllowed:{value}})
      }
    }, 5000)
  })
}

export function observableUrlValidator(control: AbstractControl): Observable<ValidationErrors | null>{
  const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=]+$/
  const value = control.value
  const result = urlRegex.test(value)

  return new Observable<ValidationErrors | null>(observer=>{
    if (result){
      observer.next(null)
    }else {
      observer.next({urlNotAllowed:{value}})
    }
    observer.complete()
  })
    .pipe(delay(5000))
}
