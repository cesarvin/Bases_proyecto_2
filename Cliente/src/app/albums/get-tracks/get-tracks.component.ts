import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlbumService } from '@/_services';
import { ArtistService } from '@/_services';

@Component({
  selector: 'app-name',
  templateUrl: './get-tracks.component.html',
  styleUrls: []
})
export class DialogGetTracksComponent implements OnInit {
  
  albumid;
  loading = false;
  tracks: any =[];
  album: any ={};
  artist: any ={};
  menuOptionTrack:any = {};
  registerForm: FormGroup;
  submitted = false;
  artistname;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router:Router,
    private albumService: AlbumService,
    private artistService: ArtistService
  ) { 
    this.menuOptionTrack = JSON.parse(localStorage.getItem('menu')).filter(op => op.name == 'Tracks')[0];
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => { this.albumid = +params['id'];});
    this.registerForm = this.formBuilder.group({
      albumName: ['', Validators.required]
  });
  console.log(this.albumid);
    if (this.albumid) {
      this.getArtist();
      this.getAlbum();
      this.getAlbumTracks();
    }
  }

  //get f() { return this.registerForm.controls; }

  getAlbumTracks(){
    this.loading = true;
      this.albumService.getAlbumTracks(this.albumid)
          .pipe(first())
          .subscribe(
             
              data => {
                this.tracks = data;
                // this.album.title = data[0].title; 
                // this.album.artist = data[0].artist;
                this.loading = false;
                console.log('this.tracks', this.tracks);
              },
              error => {
                  this.loading = false;
              });
  }

  getAlbum(){
    this.loading = true;
      this.albumService.getAlbum(this.albumid)
          .pipe(first())
          .subscribe(
             
              data => {
                console.log(data);

                this.album = data[0];
                //this.album.title = this.album.title;
                this.loading = false;
                console.log(this.album)
              },
              error => {
                  this.loading = false;
              });
  }

  getArtist(){
    this.loading = true;
      this.artistService.getArtistByAlbumId(this.albumid)
          .pipe(first())
          .subscribe(
             
              data => {
                console.log(data);

                this.artist = data[0];

                this.loading = false;
                console.log('this.artist->', this.artist);
              },
              error => {
                  this.loading = false;
              });
  }

  deleteTrack(event){
    console.log(event);
    this.loading = true;
      this.albumService.deleteAlbumTrack(event.trackid)
          .pipe(first())
          .subscribe(
             
              data => {
                this.getAlbumTracks();
                this.loading = false;
              },
              error => {
                  this.loading = false;
              });
          
  }

  addTrack(){
    this.router.navigate(['/addtracks',this.album.albumid]);
  }

  play(track){
    window.open(track.url, "_blank");
    this.loading = true;
      this.albumService.playSong(track.trackid)
          .pipe(first())
          .subscribe(
              data => {
                
                this.loading = false;
              },
              error => {
                  this.loading = false;
              });

  }

  addCart(track){
    console.log('shop track->',track);
    this.loading = true;
      this.albumService.addCart(track.trackid)
          .pipe(first())
          .subscribe(
              data => {
                
                this.loading = false;
                this.getAlbumTracks();
              },
              error => {
                  this.loading = false;
              });

  }
  
}
