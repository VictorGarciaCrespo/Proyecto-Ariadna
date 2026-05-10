export interface ParejasAccionObjeto {
  _id?: string;
  objeto: string;
  accion: string;
}

export interface TarjetaJuego {
  id: number;          // identificador único en el tablero
  imagen: string;      // nombre del archivo (ej: "llave.png")
  tipo: 'objeto' | 'accion';
  parejaId: number;    // las dos tarjetas con el mismo parejaId son pareja
  estado: 'neutro' | 'seleccionada' | 'correcta' | 'incorrecta';
}
