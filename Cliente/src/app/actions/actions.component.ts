import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '@/_services';

@Component({ templateUrl: 'actions.component.html' })
export class ActionsComponent implements OnInit {

  rolid;
  loading:boolean = false;
  actions: any =[];
  rols: any =[];
  action: any ={};
  menuOption:any = {};
  menuOptionRolOption:any = {};
  menuOptionRol:any = {};
  registerForm: FormGroup;
  submitted = false;
  options = [
    {optionid:1, name:'Artists'},
    {optionid:2, name:'Albums'},
    {optionid:3, name:'Tracks'},
    {optionid:4, name:'InactiveTracks'},
    {optionid:5, name:'Reports'},
    {optionid:6, name:'Rol'},
    {optionid:7, name:'Option'},
    {optionid:8, name:'Account'},
    {optionid:9, name:'Employee'},
    {optionid:10, name:'Customer'},
    {optionid:11, name:'Action'},
    {optionid:12, name:'RolOption'},
    {optionid:13, name:'RolAccount'},
    {optionid:14, name:'ShopCart'}
  ]

  actiontypes = [
    {actionid:1, name:'Seleccionar'},
    {actionid:2, name:'Insertar'},
    {actionid:3, name:'Actualizar'},
    {actionid:4, name:'Eliminar'},
    {actionid:5, name:'Inactivar'}
  ]

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.menuOption = JSON.parse(localStorage.getItem('menu')).filter(op => op.name == 'Action')[0];
    this.menuOptionRolOption = JSON.parse(localStorage.getItem('menu')).filter(op => op.name == 'RolOption')[0];
    this.menuOptionRol = JSON.parse(localStorage.getItem('menu')).filter(op => op.name == 'Rol')[0];
    console.log('this.menuOptionRolOption', this.menuOptionRolOption);
  }

    ngOnInit() {
      this.registerForm = this.formBuilder.group({
        actionName: ['', Validators.required]
    });
    this.getRol();
      //this.getActions();
    }


    // get f() { return this.registerForm.controls; }
    
    getActions(){
      console.log('menuOption', this.menuOption);
      
      if (!this.menuOption.seleccionar) return
      this.loading = true;
        this.userService.getActions()
            .pipe(first())
            .subscribe(
               
                data => {
                  this.actions = data;
                  this.loading = false;
                  console.log('this.actions', this.actions);
                },
                error => {
                    this.loading = false;
                });
    }

    getActionsByRolid(){
      
      if (!this.menuOption.seleccionar) return
      this.loading = true;
        this.userService.getActionsByRol(this.rolid)
            .pipe(first())
            .subscribe(
               
                data => {
                  this.actions = [];
                  this.actions = data;
                  this.loading = false;
                },
                error => {
                    this.loading = false;
                });
    }

    getRol(){
      console.log('menuOption', this.menuOption);
      
      if (!this.menuOptionRolOption.seleccionar) return
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

    deleteAction(event){
      console.log(event);
      this.loading = true;
        this.userService.deleteAction(event.optionid, event.actionid, event.rolid)
            .pipe(first())
            .subscribe(
               
                data => {
                  this.getActions();
                  this.loading = false;
                },
                error => {
                    this.loading = false;
                });
            
    }

    setRolOption(){
      console.log('save this.action',this.action);
      
      this.userService.setRolOption(this.action)
        .pipe(first())
        .subscribe(
            data => {
              this.getActionsByRolid();
              this.loading = false;
            },
            error => {
                this.loading = false;
            });
    }
    
}