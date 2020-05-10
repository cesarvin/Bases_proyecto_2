import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

import { ArtistService } from '@/_services';

@Component({
  selector: 'app-name',
  templateUrl: './dialog-artist.component.html',
  //styleUrls: ['./name.component.scss']
  styleUrls: []
})
export class DialogArtistComponent implements OnInit {
  
  id;
  loading = false;
  artist: any ={};
  registerForm: FormGroup;
  submitted = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router:Router,
    private artistService: ArtistService,
    // public dialogRef: MatDialogRef<DialogArtistComponent>,
    // @inject(MAT_DIALOG_DATA) public artist: any
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => { this.id = +params['id'];});
    this.registerForm = this.formBuilder.group({
      artistName: ['', Validators.required]
  });
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

                this.artist = data[0];
                
                this.loading = false;
                console.log(this.artist)
              },
              error => {
                  this.loading = false;
              });
  }

  saveArtist(): void {
    //console.log('editar ->', this.artist);
    
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    console.log(this.artist);
    this.loading = true;
    this.artistService.saveArtist(this.artist)
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
