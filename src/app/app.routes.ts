import { Routes } from '@angular/router';
import { MenuPrincipalPageComponent } from './menu-principal/paginas/menu-principal-page.component';
import { ActividadesDiariasPageComponent } from './actividades-diarias/paginas/actividades-diarias-page/actividades-diarias-page';
import { JuegoActividadPageComponent } from './juego-actividad/paginas/juego-actividad-page/juego-actividad-page';

export const routes: Routes = [
    { path: '', component: MenuPrincipalPageComponent },
    { path: 'actividades-diarias', component: ActividadesDiariasPageComponent },
    { path: 'juego-actividad', component: JuegoActividadPageComponent },
    { path: '**', redirectTo: '' }
];
