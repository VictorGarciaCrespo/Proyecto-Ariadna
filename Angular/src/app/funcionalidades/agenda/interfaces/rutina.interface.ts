import { AgendaItem } from './agenda.interface';

export interface Rutina {
    _id?: string;
    nombre: string;
    idPerfil: string; // El perfil al que pertenece
    pasos: AgendaItem[]; // Lista ordenada de pictogramas
}
