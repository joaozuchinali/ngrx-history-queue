import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { Store } from '@ngrx/store';
import { addLoginCredentials, addUserInfos } from '../../ngrx/usuario.actions';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-formulario',
    imports: [MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule, MatExpansionModule, MatGridListModule, ReactiveFormsModule],
    templateUrl: './formulario.html',
    styleUrl: './formulario.scss'
})
export class Formulario {

    formCredenciais = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.email
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(12)
        ])
    });

    formInfos = new FormGroup({
        nome: new FormControl('', [
            Validators.required,
            Validators.minLength(3)
        ]),
        idade: new FormControl('', [
            Validators.required,
            Validators.min(1),
            Validators.max(120)
        ]),
        telefone: new FormControl('', [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(20)
        ]),
        observacao: new FormControl('')
    });

    constructor(
        private store: Store,
        private _snackbar: MatSnackBar
    ) { }

    onSalvarAcessos() {
        if(this.invalidFormCheck(this.formCredenciais)) {
            return;
        }
        if (!this.formCredenciais.value.email || !this.formCredenciais.value.password) {
            return;
        }

        this.store.dispatch(
            addLoginCredentials({
                email: this.formCredenciais.value.email,
                password: this.formCredenciais.value.password
            })
        );

        this.formCredenciais.reset();
    }

    onSalvarInfos() {
        if(this.invalidFormCheck(this.formInfos)) {
            return;
        }

        this.store.dispatch(
            addUserInfos({
                nome: this.formInfos.value.nome || '',
                telefone: String(this.formInfos.value.telefone) || '00000000000',
                idade: Number(this.formInfos.value.idade) || 0,
                observacao: this.formInfos.value.observacao || ''
            })
        );

        this.formInfos.reset();
    }

    invalidFormCheck(form: FormGroup) {
        if (!form.invalid) {
            return false;
        }

        let errors_message = '';
        Object.keys(form.controls).forEach(key => {
            console.log(key);
            const control = form.get(key);

            if (control?.invalid) {
                console.log(`- ${key} inválido. Erros:`, control.errors);
                errors_message += `${errors_message.length > 0 ? '\n' : ''}- ${key} inválido.`;
            }
        });

        if(errors_message != '')
        this._snackbar.open(errors_message, 'Fechar', { duration: 3000 });

        return true;
    }
}
