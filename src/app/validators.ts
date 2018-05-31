import { Validators as PValidators, ValidatorFn, AbstractControl } from '@angular/forms'

export class Validators extends PValidators {

    static confirm(value): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            console.log("confirm value:", value);
            let confirmed = control.value === value;
            return confirmed ? null : { 'confirm': true };
        };
    }

}
