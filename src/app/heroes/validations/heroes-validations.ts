import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IHero } from "../models/hero.model";
export class HeroesValidation {
    public heroesForm: FormGroup;

    constructor(private fb: FormBuilder) { }

    public heroesAttributes(): FormGroup {
        return this.fb.group({
            name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
            lastname: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
            email: [null, [Validators.required, Validators.email]],
            bio: [null, [Validators.maxLength(4000)]], 
            image: ['assets/img/user-profile.png'],
            appearance: [null, Validators.required],
            business: [null, Validators.required],
        });
    }

    public toFormGroup(formGroupValues?: IHero): FormGroup {
        this.heroesForm = this.heroesAttributes();
        if (formGroupValues) {
            this.heroesForm.patchValue({...formGroupValues});
        }
        return this.heroesForm;
    }

}
