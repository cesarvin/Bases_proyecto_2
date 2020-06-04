import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';
import { AlbumService } from '@/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    currentUser: User;
    users = [];
    menuOption:any = {};
    menuexist:boolean=true;
    
    loading = false;
    tracks: any =[];
    trackname:string ="";

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private albumService:AlbumService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        //this.loadAllUsers();
        console.log('mytracks');
        this.getMyTracks();
    }

    deleteUser(id: number) {
        // this.userService.delete(id)
        //     .pipe(first())
        //     .subscribe(() => this.loadAllUsers());
    }

    private loadAllUsers() {
        // this.userService.getAll()
        //     .pipe(first())
        //     .subscribe(users => this.users = users);
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

      getMyTracks(){
        this.loading = true;
          this.albumService.getMyTracks()
              .pipe(first())
              .subscribe(
                 
                  data => {
                    this.tracks = data;
                    console.log(data);
                    this.loading = false;
                    console.log('this.tracks', this.tracks);
                  },
                  error => {
                      this.loading = false;
                  });
      }

      getMyTrack(){
        this.loading = true;
        
        if (this.trackname =='') return

          this.albumService.getMyTrack(this.trackname)
              .pipe(first())
              .subscribe(
                 
                  data => {
                    this.tracks = data;
                    console.log(data);
                    this.loading = false;
                    console.log('this.tracks', this.tracks);
                  },
                  error => {
                      this.loading = false;
                  });
      }
}