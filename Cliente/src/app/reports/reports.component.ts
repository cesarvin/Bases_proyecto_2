import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '@/_services';


import { AppService } from '@/app.service';


import * as JsonToXML from "js2xmlparser";

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
  report8: any =[];
  report9: any =[];
  
  options = [
    {optionid:1, name:'Artistas con más álbumes'},
    {optionid:2, name:'Géneros con más canciones'},
    {optionid:3, name:'Total de duración de cada playlist'},
    {optionid:4, name:'Canciones de mayor duración'},
    {optionid:5, name:'Artistas que han registrado más canciones'},
    {optionid:6, name:'Promedio de duración de canciones por género'},
    {optionid:7, name:'Cantidad de artistas diferentes por playlist'},
    {optionid:8, name:'Artistas con más diversidad de géneros'},
    {optionid:9, name:'Bitácora'}
  ]


  protected rptOptions = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: true,
    title: 'My Awesome CSV',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private appService:AppService
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

    exportReport(data, rpt){
      
      switch (rpt){
        case 1:
          this.appService.downloadFile(data, 'reporte', ['name','conteo']);
          break;
        case 2:
          this.appService.downloadFile(data, 'reporte', ['name','cuenta']);
          break;
        case 3:
          this.appService.downloadFile(data, 'reporte', ['playlistid','name','tiempo']);
          break;
        case 4:
          this.appService.downloadFile(data, 'reporte', ['name','milliseconds']);
          break;
        case 5:
          this.appService.downloadFile(data, 'reporte', ['name','conteo']);
          break;
        case 6:
          this.appService.downloadFile(data, 'reporte', ['genreid','name','duracionpromedio']);
          break;
        case 7:
          this.appService.downloadFile(data, 'reporte', ['playlistid','name','artistas']);
          break;
        case 8:
          this.appService.downloadFile(data, 'reporte', ['artistid','name','cuenta']);
          break;
        case 9:
          data.forEach(element => {
            element.rowvalue =''
          });
          this.appService.downloadFile(data, 'bitacora', ['operation','rowvalue','stamp', 'accountuser', 'tabla']);
          break;
      }
      
    }

    

}