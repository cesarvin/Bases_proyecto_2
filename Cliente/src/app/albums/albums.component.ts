import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlbumService } from '@/_services';

//import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'albums.component.html' })
export class AlbumsComponent implements OnInit {
    ///currentUser: User;
  loading:boolean = false;
  albums: any =[];
  album: any ={};
  menuOption:any = {};
  menuOptionTrack:any = {};
  registerForm: FormGroup;
  submitted = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private albumService: AlbumService,
    private router: Router
  ) {
    
    this.menuOption = JSON.parse(localStorage.getItem('menu')).filter(op => op.name == 'Albums')[0];
    this.menuOptionTrack = JSON.parse(localStorage.getItem('menu')).filter(op => op.name == 'Tracks')[0];
    console.log('this.menuOptionTrack', this.menuOptionTrack);
  }

    ngOnInit() {
      this.registerForm = this.formBuilder.group({
        albumName: ['', Validators.required]
    });
      this.getAlbums();
    }

    get f() { return this.registerForm.controls; }

    getAlbums(){
      console.log('menuOption', this.menuOption.seleccionar);
      if (!this.menuOption.seleccionar) return
      this.loading = true;
        this.albumService.getAlbums()
            .pipe(first())
            .subscribe(
               
                data => {
                  this.albums = data;
                  this.loading = false;
                },
                error => {
                    this.loading = false;
                });
    }

    deleteAlbum(event){
      console.log(event);
      this.loading = true;
        this.albumService.deleteAlbum(event.albumid)
            .pipe(first())
            .subscribe(
               
                data => {
                  this.getAlbums();
                  this.loading = false;
                },
                error => {
                    this.loading = false;
                });
            
    }

    updateAlbum(event){
      this.router.navigate(['/editalbums', event.albumid]);
    }

    addAlbum(){
      this.router.navigate(['/editalbums']);
    }

    onSubmit(){
      this.getAlbumsByName();
    }

    getAlbumsByName(){
      console.log('menuOption', this.menuOption.seleccionar);
      if (!this.menuOption.seleccionar) return
      this.loading = true;
        this.albumService.getAlbumsByName(this.album.name)
            .pipe(first())
            .subscribe(
               
                data => {
                  this.albums = data;
                  this.loading = false;
                },
                error => {
                    this.loading = false;
                });
    }

    getTracks(event){
      this.router.navigate(['/albumtracks', event.albumid]);
    }
}