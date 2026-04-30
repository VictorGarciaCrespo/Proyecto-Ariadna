export interface ActividadDiaria {
  _id?: string;
  actividad: string;
  pictogramaPrincipal: string;
  objetosCorrectos: string[];
  distractores: string[];
}

export interface PictogramaJuego {
  ruta: string;
  correcto: boolean;
  estado: 'neutro' | 'correcto' | 'incorrecto';
}
