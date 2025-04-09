import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserService, User } from '../../services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  dataSource = new MatTableDataSource<User>();    //Mat-table instance
  errorMessage: string = '';
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];    //columns defining

  constructor(private userService: UserService, private dialog: MatDialog) { }    //dependency injection

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({   //subscribing to the getUsers in userService
      next: (users) => {
        console.log('Users loaded:', users);
        this.dataSource.data = users || []; // Fallback to empty array if null
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.errorMessage = err.message;
      }
    });
  }

  openUserForm(user?: User): void {
    const dialogRef = this.dialog.open(UserFormComponent, {   //instance of MatDialog
      width: '400px',
      data: user ? { user: { ...user } } : { user: null }   //if edit is clicked, creates a shallow copy of original data
                                                            //else sets user to null and open addnewuser form
    });
    
    dialogRef.afterClosed().subscribe(result => {   //the result is append and users are loaded only after the dialog is closed
      if (result) {
        console.log('Dialog closed with result:', result);
        this.loadUsers();
      }
    });
  }

  deleteUser(id: string): void {    //delete user
    if (confirm('Are you sure you want to delete this user?')) {    
      this.userService.deleteUser(id).subscribe({   //deletes the users based on the id
        next: () => this.loadUsers(),   //after deleting users, loads the updated users
        error: (err) => this.errorMessage = err.message   //error message
      });
    }
  }
}