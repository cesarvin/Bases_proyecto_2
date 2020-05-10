import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { ArtistsComponent } from './artists';
import { DialogArtistComponent} from './artists/dialog/dialog-artist.component';
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
import { AuthGuard } from './_helpers';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'artists', component: ArtistsComponent, canActivate: [AuthGuard] },
    { path: 'editartists', component: DialogArtistComponent, canActivate: [AuthGuard] },
    { path: 'editartists/:id', component: DialogArtistComponent, canActivate: [AuthGuard] },
    { path: 'albums', component: AlbumsComponent, canActivate: [AuthGuard] },
    { path: 'editalbums', component: DialogAlbumComponent, canActivate: [AuthGuard] },
    { path: 'editalbums/:id', component: DialogAlbumComponent, canActivate: [AuthGuard] },
    { path: 'addalbum/:id', component: DialogAddAlbumComponent, canActivate: [AuthGuard] },
    { path: 'albumtracks/:id', component: DialogGetTracksComponent, canActivate: [AuthGuard] },
    { path: 'addtracks/:id', component: DialogAddTracksComponent, canActivate: [AuthGuard] },
    { path: 'account', component: AccountsComponent, canActivate: [AuthGuard] },
    { path: 'rolaccount/:id', component: RolAccountComponent, canActivate: [AuthGuard] },
    { path: 'actions', component: ActionsComponent, canActivate: [AuthGuard] },
    { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);