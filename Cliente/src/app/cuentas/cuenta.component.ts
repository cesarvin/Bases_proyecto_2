import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '@/_services';

@Component({ templateUrl: 'cuenta.component.html' })
export class AccountsComponent implements OnInit {

  loading:boolean = false;
  accounts: any =[];
  account: any ={};
  menuOption:any = {};
  menuOptionRolAccount:any = {};
  menuOptionRol:any = {};
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.menuOption = JSON.parse(localStorage.getItem('menu')).filter(op => op.name == 'Account')[0];
    this.menuOptionRolAccount = JSON.parse(localStorage.getItem('menu')).filter(op => op.name == 'RolAccount')[0];
    this.menuOptionRol = JSON.parse(localStorage.getItem('menu')).filter(op => op.name == 'Rol')[0];

    console.log('this.menuOptionRolAccount',this.menuOptionRolAccount);
  }

    ngOnInit() {
      this.registerForm = this.formBuilder.group({
        accountName: ['', Validators.required]
    });
      this.getAccounts();
    }


    // get f() { return this.registerForm.controls; }

    getAccounts(){
      console.log('menuOption', this.menuOption);
      if (!this.menuOption.seleccionar) return
      this.loading = true;
        this.userService.getAccounts()
            .pipe(first())
            .subscribe(
               
                data => {
                  this.accounts = data;
                  this.loading = false;
                },
                error => {
                    this.loading = false;
                });
    }

    // deleteAccount(event){
    //   console.log(event);
    //   this.loading = true;
    //     this.userService.deleteAccount(event.accountid)
    //         .pipe(first())
    //         .subscribe(
               
    //             data => {
    //               this.getAccounts();
    //               this.loading = false;
    //             },
    //             error => {
    //                 this.loading = false;
    //             });
            
    // }
    addRolAccount(event){
      this.router.navigate(['/rolaccount', event.accountid]);
    }

    addAccountAlbum(event){
      this.router.navigate(['/addalbum', event.accountid]);
    }

    updateAccount(event){
      this.router.navigate(['/editaccounts', event.accountid]);
    }
    
    addAccount(){
      this.router.navigate(['/editaccounts']);
    }

    // onSubmit(){
    //   this.getAccountsByName();
    // }

    // getAccountsByName(){
    //   console.log('menuOption', this.menuOption.consultar);
    //   this.loading = true;
    //     this.userService.getAccountsByName(this.account.name)
    //         .pipe(first())
    //         .subscribe(
               
    //             data => {
    //               this.accounts = data;
    //               this.loading = false;
    //             },
    //             error => {
    //                 this.loading = false;
    //             });
    // }
}