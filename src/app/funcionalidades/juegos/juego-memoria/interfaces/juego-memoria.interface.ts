export interface ElementoMemoria {
    id: string;
    nombre: string;
    rutaImagen: string;
}

export interface CartaMemoria {
    id: string; 
    elementoId: string; 
    tipo: 'imagen' | 'texto'; 
    contenido: string; 
    volteada: boolean;
    emparejada: boolean;
}
