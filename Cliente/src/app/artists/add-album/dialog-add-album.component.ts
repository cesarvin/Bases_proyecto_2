import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlbumService } from '@/_services';
import { ArtistService } from '@/_services';


@Component({
  selector: 'app-name',
  templateUrl: './dialog-add-album.component.html',
  styleUrls: []
})
export class DialogAddAlbumComponent implements OnInit {
  
  id;
  loading = false;
  album: any ={};
  registerForm: FormGroup;
  submitted = false;
  artistname;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router:Router,
    private albumService: AlbumService,
    private artistService: ArtistService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => { this.id = +params['id'];});
    this.registerForm = this.formBuilder.group({
      albumName: ['', Validators.required]
  });
  console.log(this.id);
    if (this.id) this.getArtist();
  }

  get f() { return this.registerForm.controls; }

  getArtist(){
    this.loading = true;
      this.artistService.getArtist(this.id)
          .pipe(first())
          .subscribe(
             
              data => {
                console.log(data);

                this.album.artistname = data[0].name;
                this.album.artistid = data[0].artistid;

                this.loading = false;
                console.log(this.album);
              },
              error => {
                  this.loading = false;
              });
  }

  getAlbum(){
    this.loading = true;
      this.albumService.getAlbum(this.id)
          .pipe(first())
          .subscribe(
             
              data => {
                console.log(data);

                this.album = data[0];
                this.album.name = this.album.title;
                this.loading = false;
                console.log(this.album)
              },
              error => {
                  this.loading = false;
              });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    console.log('album to save ->',this.album);
    this.loading = true;
    this.albumService.saveAlbum(this.album)
        .pipe(first())
        .subscribe(
            data => {
              console.log(data);
              this.loading = false;
              this.router.navigate(['/artists']);
            },
            error => {
                this.loading = false;
            });
    }
}
