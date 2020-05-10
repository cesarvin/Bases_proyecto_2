import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

//import { User } from '@/_models';


@Injectable({ providedIn: 'root' })
export class ArtistService {
    constructor(private http: HttpClient) { }

  getArtists() {
    return this.http.get<any>('http://localhost:3000/artist');
  }

  getArtistsByName(name) {
    return this.http.get<any>(`http://localhost:3000/artist/${name}`);
  }

  getArtist(id) {
    return this.http.get<any>(`http://localhost:3000/artistbyid/${id}`);
  }

  getArtistByAlbumId (id) {
    return this.http.get<any>(`http://localhost:3000/artistbyalbumid/${id}`);
  }

  deleteArtist(id){
    return this.http.delete(`http://localhost:3000/artist/${id}`);
  }

  saveArtist(artist) {
    return this.http.post('http://localhost:3000/artist', artist);
  }

}