import {AbstractControl, ValidatorFn} from "@angular/forms";

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
