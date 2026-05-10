import { Routes } from '@angular/router';
import { MenuPrincipalPageComponent } from './main/menu-principal/paginas/menu-principal-page.component';
import { ActividadesDiariasPageComponent } from './funcionalidades/actividades/actividades-diarias/paginas/actividades-diarias-page/actividades-diarias-page';
import { Juego1ActividadesDiariasPageComponent } from './funcionalidades/juegos/juego1-actividades-diarias/paginas/juego1-actividades-diarias-page/juego1-actividades-diarias-page';
import { JuegosMentePageComponent } from './funcionalidades/actividades/juegos-mente/paginas/juegos-mente-page/juegos-mente-page';
import { HablarEscribirPageComponent } from './funcionalidades/actividades/hablar-escribir/paginas/hablar-escribir-page/hablar-escribir-page';

import { Juego1HablarEscribirPageComponent } from './funcionalidades/juegos/juego1-hablar-escribir/paginas/juego1-hablar-escribir-page/juego1-hablar-escribir-page';

import { JuegoMemoriaPageComponent } from './funcionalidades/juegos/juego-memoria/paginas/juego-memoria-page/juego-memoria-page.component';
import { JuegoIntrusosPageComponent } from './funcionalidades/juegos/juego-intrusos/paginas/juego-intrusos-page/juego-intrusos-page.component';
import { JuegoAccionObjetoPageComponent } from './funcionalidades/juegos/juego-accion-objeto/paginas/juego-accion-objeto-page/juego-accion-objeto-page';
import { JuegoSilabasPageComponent } from './funcionalidades/juegos/juego-silabas/paginas/juego-silabas-page/juego-silabas-page.component';
import { PerfilesPageComponent } from './main/perfiles/paginas/perfiles-page.component';
import { AdministradorPageComponent } from './main/administrador/paginas/administrador-page.component';
import { AgendaPageComponent } from './funcionalidades/agenda/paginas/agenda-page/agenda-page.component';
import { AgendaCrearPageComponent } from './funcionalidades/agenda/paginas/agenda-crear-page/agenda-crear-page.component';
import { AgendaDetallePageComponent } from './funcionalidades/agenda/paginas/agenda-detalle-page/agenda-detalle-page.component';

export const routes: Routes = [
    { path: '', component: PerfilesPageComponent },
    { path: 'menu-principal', component: MenuPrincipalPageComponent },
    { path: 'actividades-diarias', component: ActividadesDiariasPageComponent },
    { path: 'juegos-mente', component: JuegosMentePageComponent },
    { path: 'hablar-escribir', component: HablarEscribirPageComponent },
    { path: 'actividades-diarias/juego1-actividades-diarias', component: Juego1ActividadesDiariasPageComponent },
    { path: 'actividades-diarias/juego-accion-objeto', component: JuegoAccionObjetoPageComponent },
    { path: 'hablar-escribir/juego1-hablar-escribir', component: Juego1HablarEscribirPageComponent },
    { path: 'hablar-escribir/juego-silabas', component: JuegoSilabasPageComponent },
    { path: 'juegos-mente/juego-memoria', component: JuegoMemoriaPageComponent },
    { path: 'juegos-mente/juego-intrusos', component: JuegoIntrusosPageComponent },
    { path: 'administrador', component: AdministradorPageComponent },
    { path: 'agenda', component: AgendaPageComponent },
    { path: 'agenda/crear', component: AgendaCrearPageComponent },
    { path: 'agenda/detalle/:id', component: AgendaDetallePageComponent },
    { path: '**', redirectTo: '' }
];
