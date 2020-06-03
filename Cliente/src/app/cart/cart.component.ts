import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlbumService } from '@/_services';



import { AppService } from '@/app.service';


@Component({ templateUrl: 'cart.component.html' })
export class CartComponent implements OnInit {

  loading:boolean = false;
  tracks: any =[];
  menuOption:any = {};
  menuOptionAlbum:any = {};
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private albumService: AlbumService,
    private router: Router,
    private appService:AppService
  ) {
    this.menuOption = JSON.parse(localStorage.getItem('menu')).filter(op => op.name == 'ShopCart')[0];
    console.log(this.menuOption);
  }

    ngOnInit() {
     
    //   this.registerForm = this.formBuilder.group({
    //     artistName: ['', Validators.required]
    // });
      this.getShopCart();
    }


    get f() { return this.registerForm.controls; }

    getShopCart(){
      
      //if (!this.menuOption.seleccionar) return
      this.loading = true;
        this.albumService.getShopCart()
            .pipe(first())
            .subscribe(
               
                data => {
                  console.log('data cart->',data);
                  this.tracks = data;
                  this.loading = false;
                },
                error => {
                    this.loading = false;
                });
    }

    getSoldCart(){
      
      //if (!this.menuOption.seleccionar) return
      this.loading = true;
        this.albumService.getSoldCart()
            .pipe(first())
            .subscribe(
               
                data => {
                  this.loading = false;
                  this.getShopCart();
                },
                error => {
                    this.loading = false;
                });
    }

    

    shop(){
      this.appService.downloadFilePDF(this.tracks, 'reporte', ['Artista','Album','Canción','Precio']);
      this.getSoldCart();
    }

    
}