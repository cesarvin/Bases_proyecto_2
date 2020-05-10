import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '@/_services';

@Component({ templateUrl: 'rol-cuenta.component.html' })
export class RolAccountComponent implements OnInit {

  id;
  rolid;
  loading:boolean = false;
  rolaccounts: any =[];
  rols: any =[];
  account: any ={};
  menuOption:any = {};
  menuOptionRol:any = {};
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.menuOption = JSON.parse(localStorage.getItem('menu')).filter(op => op.name == 'RolAccount')[0];
    this.menuOptionRol = JSON.parse(localStorage.getItem('menu')).filter(op => op.name == 'Rol')[0];

  }

    ngOnInit() {
      this.route.params.subscribe(params => { this.id = +params['id'];});
      this.getRolAccount();
      this.getRol();
    }


    // get f() { return this.registerForm.controls; }

    getRolAccount(){
      console.log('menuOption', this.menuOption);
      this.loading = true;
        this.userService.getRolAccount(this.id)
            .pipe(first())
            .subscribe(
               
                data => {
                  this.rolaccounts = data;
                  this.loading = false;
                  console.log('this.rolaccounts', this.rolaccounts);
                },
                error => {
                    this.loading = false;
                });
    }

    getRol(){
      console.log('menuOption', this.menuOption);
      this.loading = true;
        this.userService.getRol()
            .pipe(first())
            .subscribe(
               
                data => {
                  this.rols = data;
                  this.loading = false;
                },
                error => {
                    this.loading = false;
                });
    }

    addRollAccount(){
      //setRolAccont
      var data = {
        rolid: this.rolid,
        accountid: this.id
      }
      this.userService.setRolAccont(data)
        .pipe(first())
        .subscribe(
            data => {
              this.rolaccounts =[];
              this.getRolAccount();
              this.loading = false;
            },
            error => {
                this.loading = false;
            });
    
    }

    deleteRowAccount(event){
      
      this.loading = true;
        this.userService.deleteRolAccount(event.rolid, this.id)
            .pipe(first())
            .subscribe(
                
                data => {
                  this.rolaccounts =[];
                  this.getRolAccount();
                  this.loading = false;
                },
                error => {
                    this.loading = false;
                });
    }
}