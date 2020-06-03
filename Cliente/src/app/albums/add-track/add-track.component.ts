import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormsModule  } from '@angular/forms';

import { AlbumService } from '@/_services';
import { ArtistService } from '@/_services';

@Component({
  selector: 'app-name',
  templateUrl: './add-track.component.html',
  styleUrls: []
})
export class DialogAddTracksComponent implements OnInit {
  
  albumid;
  newtrack;
  genreid;
  loading = false;
  tracks: any =[];
  album: any ={};
  artist: any ={};
  track: any = {};
  menuOptionTrack:any = {};
  registerForm: FormGroup;
  submitted = false;
  artistname;
  mediaTypes = [
    {value: 1, name: "MPEG audio file"},
    {value: 2, name: "Protected AAC audio file"},
    {value: 3, name: "Protected MPEG-4 video file"},
    {value: 4, name: "Purchased AAC audio file"},
    {value: 5, name: "EnAAC audio filegland"}
  ];
  
  genres =[{value:1, name: "Rock"},
  {value:2, name: "Jazz"},
  {value:3, name: "Metal"},
  {value:4, name: "Alternative & Punk"},
  {value:5, name: "Rock And Roll"},
  {value:6, name: "Blues"},
  {value:7, name: "Latin"},
  {value:8, name: "Reggae"},
  {value:9, name: "Pop"},
  {value:10, name: "Soundtrack"},
  {value:11, name: "Bossa Nova"},
  {value:12, name: "Easy Listening"},
  {value:13, name: "Heavy Metal"},
  {value:14, name: "R&B/Soul"},
  {value:15, name: "Electronica/Dance"},
  {value:16, name: "World"},
  {value:17, name: "Hip Hop/Rap"},
  {value:18, name: "Science Fiction"},
  {value:19, name: "TV Shows"},
  {value:20, name: "Sci Fi & Fantasy"},
  {value:21, name: "Drama"},
  {value:22, name: "Comedy"},
  {value:23, name: "Alternative"},
  {value:24, name: "Classical"},
  {value:25, name: "Opera"}
]

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
      name: ['', Validators.required],
      composer: ['', Validators.required],
      milliseconds: ['', Validators.required],
      unitprice: ['', Validators.required]
  });
  console.log(this.albumid);
    if (this.albumid) {
      this.getArtist();
      this.getAlbum();
      this.getAlbumTracks();
    }
  }
 
  get f() { return this.registerForm.controls; }

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

  

  onSubmit(){
    this.track = this.registerForm.value;
    this.track.mediatype = this.newtrack;
    this.track.genreid = this.genreid;
    this.track.albumid = this.album.albumid;

    this.submitted = true;
    console.log('this.newtrack',this.newtrack);
    console.log('save this.track->',this.track);
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;
    this.albumService.saveTrack(this.track)
        .pipe(first())
        .subscribe(
            data => {
              console.log(data);
              this.loading = false;
              this.router.navigate(['/albums']);
              this.router.navigate(['/albumtracks', this.album.albumid]);
            },
            error => {
                this.loading = false;
            });
  }
  
}
