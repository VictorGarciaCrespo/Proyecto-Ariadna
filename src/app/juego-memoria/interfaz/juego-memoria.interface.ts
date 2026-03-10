export interface ElementoMemoria {
    id: string;
    nombre: string;
    rutaImagen: string; // The user will fill this in
}

export interface CartaMemoria {
    id: string; // Unique ID for the specific card instance in the game
    elementoId: string; // ID of the ElementoMemoria it belongs to
    tipo: 'imagen' | 'texto'; // Represents either the image side or the text side
    contenido: string; // The text or the image path
    volteada: boolean;
    emparejada: boolean;
}
