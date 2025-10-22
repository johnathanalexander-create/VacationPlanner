import {Component} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {Router, RouterModule} from "@angular/router";
import {FooterComponent} from "../../../components/shared/footer/footer.component";
import {Registration, AuthService} from '../../../services/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';
import User from '../../../models/security/user.model';
import { SnackBarService } from '../../../services/snack-bar/snack-bar.service';

@Component({
    selector: 'app-register',
    imports: [MatCardModule, FormsModule, MatFormFieldModule, MatInputModule,
        MatButtonModule, MatIconModule, RouterModule, FooterComponent
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {
	registrationFormGroup = this.formBuilder.group({
		firstName: ['', Validators.required],
		lastName: ['', Validators.required],
		email: ['', [Validators.required, Validators.email]],
		password: ['', Validators.required],
		confirmPassword: ['', Validators.required]
	});
	
	isSubmitting: boolean = false;
	
	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private snackbarService: SnackBarService
	){}
	register(): void {
		
		this.isSubmitting = true;
		
		this.authService
			.register(this.registrationFormGroup.value as Registration)
			.pipe(finalize(() => this.isSubmitting = false))
			      .subscribe({
			        next: (result: User | null | undefined) => {
			          this.router.navigate(['home']);
			        },
			        error: (error: HttpErrorResponse) => {
			          this.registrationFormGroup.get('password')?.reset('', { emitEvent: false });
			          this.snackbarService.showMessage(error.error?.value, 'error');
			        },
			      });
	}
}
