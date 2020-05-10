import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ArtistService } from '@/_services';

@Component({ templateUrl: 'artists.component.html' })
export class ArtistsComponent implements OnInit {

  loading:boolean = false;
  artists: any =[];
  artist: any ={};
  menuOption:any = {};
  menuOptionAlbum:any = {};
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private artistService: ArtistService,
    private router: Router
  ) {
    this.menuOption = JSON.parse(localStorage.getItem('menu')).filter(op => op.name == 'Artists')[0];
    this.menuOptionAlbum = JSON.parse(localStorage.getItem('menu')).filter(op => op.name == 'Albums')[0];
    
  }

    ngOnInit() {
     
      this.registerForm = this.formBuilder.group({
        artistName: ['', Validators.required]
    });
      this.getArtists();
    }


    get f() { return this.registerForm.controls; }

    getArtists(){
      
      if (!this.menuOption.seleccionar) return
      this.loading = true;
        this.artistService.getArtists()
            .pipe(first())
            .subscribe(
               
                data => {
                  this.artists = data;
                  this.loading = false;
                },
                error => {
                    this.loading = false;
                });
    }

    deleteArtist(event){
      console.log(event);
      this.loading = true;
        this.artistService.deleteArtist(event.artistid)
            .pipe(first())
            .subscribe(
               
                data => {
                  this.getArtists();
                  this.loading = false;
                },
                error => {
                    this.loading = false;
                });
            
    }

    addArtistAlbum(event){
      this.router.navigate(['/addalbum', event.artistid]);
    }

    updateArtist(event){
      this.router.navigate(['/editartists', event.artistid]);
    }
    
    addArtist(){
      this.router.navigate(['/editartists']);
    }

    onSubmit(){
      this.getArtistsByName();
    }

    getArtistsByName(){
      console.log('menuOption', this.menuOption.seleccionar);
      if (!this.menuOption.seleccionar) return
      this.loading = true;
        this.artistService.getArtistsByName(this.artist.name)
            .pipe(first())
            .subscribe(
               
                data => {
                  this.artists = data;
                  this.loading = false;
                },
                error => {
                    this.loading = false;
                });
    }
}