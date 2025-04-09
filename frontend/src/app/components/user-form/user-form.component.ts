import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  userForm: FormGroup;
  errorMessage: string = '';
  isEditMode: boolean = false;

  constructor(    //creating formbuilder, userservice and matDialogRef instances
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User | null }
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.isEditMode = !!this.data?.user;
    if (this.data?.user) {
      console.log('Patching form with user:', this.data.user);
      this.userForm.patchValue(this.data.user);
    }
  }

  onSubmit(): void {
    console.log('Form submitted');
    if (this.userForm.valid) {    //checks if form is valid
      const userData = this.userForm.value; //stores user form data
      const operation = this.isEditMode && this.data?.user    //if operation is edit updateUser is called else createUser is called
        ? this.userService.updateUser(this.data.user.id, userData)
        : this.userService.createUser(userData);
  
      operation.subscribe({   //subscribing to the operation for any emitting values
        next: (result) => {
          console.log('Operation successful:', result);
          this.dialogRef.close(result);
        },
        error: (err) => {
          console.error('Operation failed:', err);
          this.errorMessage = err.message;
        }
      });
    } else {
      console.log('Form invalid:', this.userForm.errors);
    }
  }

  onCancel(): void {    //if onCancel is called diglogRef is closed
    this.dialogRef.close();
  }
}