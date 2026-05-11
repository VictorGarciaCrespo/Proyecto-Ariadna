import { AgendaItem } from './agenda.interface';

export interface Rutina {
    _id?: string;
    nombre: string;
    idPerfil: string; 
    pasos: AgendaItem[]; 
}
