import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

//import { User } from '@/_models';


@Injectable({ providedIn: 'root' })
export class AlbumService {
    constructor(private http: HttpClient) { }

  accountid = localStorage.getItem('accountid');

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
    return this.http.post('http://localhost:3000/album', {...album, accountid:this.accountid});
  }

  getAlbumTracks(id){
    return this.http.get<any>(`http://localhost:3000/albumtracks/${id}/${this.accountid}`);
  }

  deleteAlbumTrack(id){
    return this.http.delete(`http://localhost:3000/track/${id}`);
  }
  
  saveTrack(track) {
    return this.http.post('http://localhost:3000/track', {...track, accountid:this.accountid});
  }

  playSong(trackid) {
    return this.http.post('http://localhost:3000/play', {trackid:trackid, accountid:this.accountid});
  }

  addCart(trackid) {
    return this.http.post('http://localhost:3000/addcart', {trackid:trackid, accountid:this.accountid});
  }

  getShopCart(){
    return this.http.get<any>(`http://localhost:3000/shopcart/${this.accountid}`);
  }

  getSoldCart(){
    return this.http.get<any>(`http://localhost:3000/sold/${this.accountid}`);
  }
}