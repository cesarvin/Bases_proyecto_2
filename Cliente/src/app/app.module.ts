import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatDialogModule} from '@angular/material/dialog';
// import { MatButtonModule} from '@angular/material/button';
// used to create fake backend
//import { fakeBackendProvider } from './_helpers';

import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { ArtistsComponent } from './artists';
import { DialogArtistComponent } from './artists/dialog/dialog-artist.component';
import { DialogAddAlbumComponent } from './artists/add-album/dialog-add-album.component';
import { AlbumsComponent } from './albums';
import { DialogAlbumComponent } from './albums/dialog/dialog-album.component';
import { DialogGetTracksComponent } from './albums/get-tracks/get-tracks.component';
import { DialogAddTracksComponent } from './albums/add-track/add-track.component';
import { AccountsComponent } from './cuentas';
import { RolAccountComponent } from './cuentas/rol-account/rol-cuenta.component';
import { ActionsComponent } from './actions';
import { ReportsComponent } from './reports';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AlertComponent } from './_components';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        BrowserAnimationsModule,
        FormsModule
        // MatDialogModule, 
        // MatButtonModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        ArtistsComponent,
        DialogArtistComponent,
        DialogAddAlbumComponent,
        DialogGetTracksComponent,
        DialogAddTracksComponent,
        AlbumsComponent,
        DialogAlbumComponent,
        AccountsComponent,
        RolAccountComponent,
        ActionsComponent,
        ReportsComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent
    ],
    //entryComponents: [DialogArtistComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        //fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };