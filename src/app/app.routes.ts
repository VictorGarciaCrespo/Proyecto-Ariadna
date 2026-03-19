import { Routes } from '@angular/router';
import { MenuPrincipalPageComponent } from './main/menu-principal/paginas/menu-principal-page.component';
import { ActividadesDiariasPageComponent } from './funcionalidades/actividades/actividades-diarias/paginas/actividades-diarias-page/actividades-diarias-page';
import { Juego1ActividadesDiariasPageComponent } from './funcionalidades/juegos/juego1-actividades-diarias/paginas/juego1-actividades-diarias-page/juego1-actividades-diarias-page';
import { JuegosMentePageComponent } from './funcionalidades/actividades/juegos-mente/paginas/juegos-mente-page/juegos-mente-page';
import { HablarEscribirPageComponent } from './funcionalidades/actividades/hablar-escribir/paginas/hablar-escribir-page/hablar-escribir-page';

import { Juego1HablarEscribirPageComponent } from './funcionalidades/juegos/juego1-hablar-escribir/paginas/juego1-hablar-escribir-page/juego1-hablar-escribir-page';

import { JuegoMemoriaPageComponent } from './funcionalidades/juegos/juego-memoria/paginas/juego-memoria-page/juego-memoria-page.component';
import { PerfilesPageComponent } from './main/perfiles/paginas/perfiles-page.component';
import { AdministradorPageComponent } from './main/administrador/paginas/administrador-page.component';

export const routes: Routes = [
    { path: '', component: PerfilesPageComponent },
    { path: 'menu-principal', component: MenuPrincipalPageComponent },
    { path: 'actividades-diarias', component: ActividadesDiariasPageComponent },
    { path: 'juegos-mente', component: JuegosMentePageComponent },
    { path: 'hablar-escribir', component: HablarEscribirPageComponent },
    { path: 'juego1-actividades-diarias', component: Juego1ActividadesDiariasPageComponent },
    { path: 'juego1-hablar-escribir', component: Juego1HablarEscribirPageComponent },
    { path: 'juego-memoria', component: JuegoMemoriaPageComponent },
    { path: 'administrador', component: AdministradorPageComponent },
    { path: '**', redirectTo: '' }
];
