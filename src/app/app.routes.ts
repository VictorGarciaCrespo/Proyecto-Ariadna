import { Routes } from '@angular/router';
import { MenuPrincipalPageComponent } from './menu-principal/paginas/menu-principal-page.component';
import { ActividadesDiariasPageComponent } from './actividades-diarias/paginas/actividades-diarias-page/actividades-diarias-page';
import { Juego1ActividadesDiariasPageComponent } from './juego1-actividades-diarias/paginas/juego1-actividades-diarias-page/juego1-actividades-diarias-page';
import { JuegosMentePageComponent } from './juegos-mente/paginas/juegos-mente-page/juegos-mente-page';
import { HablarEscribirPageComponent } from './hablar-escribir/paginas/hablar-escribir-page/hablar-escribir-page';
import { Juego1JuegosMentePageComponent } from './juego1-juegos-mente/paginas/juego1-juegos-mente-page/juego1-juegos-mente-page';
import { Juego1HablarEscribirPageComponent } from './juego1-hablar-escribir/paginas/juego1-hablar-escribir-page/juego1-hablar-escribir-page';
import { Juego2JuegosMentePageComponent } from './juego2-juegos-mente/paginas/juego2-juegos-mente-page/juego2-juegos-mente-page';
import { Juego2HablarEscribirPageComponent } from './juego2-hablar-escribir/paginas/juego2-hablar-escribir-page/juego2-hablar-escribir-page';
import { JuegoMemoriaPageComponent } from './juego-memoria/paginas/juego-memoria-page/juego-memoria-page.component';

export const routes: Routes = [
    { path: '', component: MenuPrincipalPageComponent },
    { path: 'actividades-diarias', component: ActividadesDiariasPageComponent },
    { path: 'juegos-mente', component: JuegosMentePageComponent },
    { path: 'hablar-escribir', component: HablarEscribirPageComponent },
    { path: 'juego1-actividades-diarias', component: Juego1ActividadesDiariasPageComponent },
    { path: 'juego1-juegos-mente', component: Juego1JuegosMentePageComponent },
    { path: 'juego1-hablar-escribir', component: Juego1HablarEscribirPageComponent },
    { path: 'juego2-juegos-mente', component: Juego2JuegosMentePageComponent },
    { path: 'juego2-hablar-escribir', component: Juego2HablarEscribirPageComponent },
    { path: 'juego-memoria', component: JuegoMemoriaPageComponent },
    { path: '**', redirectTo: '' }
];
