export interface ParejasAccionObjeto {
  _id?: string;
  objeto: string;
  accion: string;
}

export interface TarjetaJuego {
  id: number;          
  imagen: string;      
  tipo: 'objeto' | 'accion';
  parejaId: number;    
  estado: 'neutro' | 'seleccionada' | 'correcta' | 'incorrecta';
}
