import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

//import { User } from '@/_models';


@Injectable({ providedIn: 'root' })
export class AlbumService {
    constructor(private http: HttpClient) { }

  getAlbums() {
    return this.http.get<any>('http://localhost:3000/album');
  }

  getAlbumsByName(name) {
    return this.http.get<any>(`http://localhost:3000/album/${name}`);
  }

  getAlbum(id) {
    return this.http.get<any>(`http://localhost:3000/albumbyid/${id}`);
  }

  deleteAlbum(id){
    return this.http.delete(`http://localhost:3000/album/${id}`);
  }

  saveAlbum(album) {
    return this.http.post('http://localhost:3000/album', album);
  }

  getAlbumTracks(id){
    return this.http.get<any>(`http://localhost:3000/albumtracks/${id}`);
  }

  deleteAlbumTrack(id){
    return this.http.delete(`http://localhost:3000/track/${id}`);
  }
  
  saveTrack(track) {
    return this.http.post('http://localhost:3000/track', track);
  }

}