import { FormGroup } from "@angular/forms";

export class ErrorMessages {
  constructor(private heroForm: FormGroup) { }

  public getErrorMessage(property: string): string {
    if (this.heroForm) {
      if (this.heroForm.controls[property].hasError('required')) {
        return 'Debes ingresar un valor';
      }
  
      if (this.heroForm.controls[property].hasError('minlength')) {
        return 'Debe contener al menos 4 caracteres';
      }
  
      if (this.heroForm.controls[property].hasError('maxlength')) {
        return 'Debe contener no más de 20 caracteres';
      }
  
      if (this.heroForm.controls[property].hasError('email')) {
        return 'Formato de correo no valido';
      }
    }

    return '';
  }
}
