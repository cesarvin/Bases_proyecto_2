import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '@/_services';

@Component({ templateUrl: 'reports.component.html' })
export class ReportsComponent implements OnInit {

  optionid;
  rpt;
  menuOption:any = {};
  loading: boolean = false;
  reportdata: any =[];
  
  report1: any =[];
  report2: any =[];
  report3: any =[];
  report4: any =[];
  report5: any =[];
  report6: any =[];
  report7: any =[];
  
  options = [
    {optionid:1, name:'Artistas con más álbumes'},
    {optionid:2, name:'Géneros con más canciones'},
    {optionid:3, name:'Total de duración de cada playlist'},
    {optionid:4, name:'Canciones de mayor duración'},
    {optionid:5, name:'Artistas que han registrado más canciones'},
    {optionid:6, name:'Promedio de duración de canciones por género'},
    {optionid:7, name:'Cantidad de artistas diferentes por playlist'},
    {optionid:8, name:'Artistas con más diversidad de géneros'}
  ]


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.menuOption = JSON.parse(localStorage.getItem('menu')).filter(op => op.name == 'Reports')[0];
    }

    ngOnInit() {
      
    }



    getReporssst(){
      console.log('this.rpt', this.rpt)
      this.getReport(this.rpt);
    }
    // get f() { return this.registerForm.controls; }

    getReport(rpt){
      console.log('menuOption', this.menuOption);
      
      if (!this.menuOption.seleccionar) return
      this.loading = true;
        this.userService.getReport(rpt)
            .pipe(first())
            .subscribe(
               
                data => {
                  this.reportdata = data;
                  this.loading = false;

                  console.log('this.reportdata ',this.reportdata );
                },
                error => {
                    this.loading = false;
                });
    }

    

}