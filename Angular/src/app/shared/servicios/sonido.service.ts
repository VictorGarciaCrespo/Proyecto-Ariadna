import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SonidoService {
  private activoSubject = new BehaviorSubject<boolean>(true);
  activo$ = this.activoSubject.asObservable();

  get activo(): boolean {
    return this.activoSubject.value;
  }

  toggle(): void {
    this.activoSubject.next(!this.activoSubject.value);
  }

  
  private readonly correcciones: Record<string, string> = {
    'cumpleanos':  'cumpleaños',
    'cana':        'caña',
    'muneca':      'muñeca',
    'ensenanza':   'enseñanza',
    'manana':      'mañana',
    'nino':        'niño',
    'nina':        'niña',
    'companero':   'compañero',
    'bano':        'baño',
  };

  
  private normalizarTexto(texto: string): string {
    return texto
      .split(' ')
      .map(palabra => this.correcciones[palabra.toLowerCase()] ?? palabra)
      .join(' ');
  }

  hablar(texto: string): void {
    if (!this.activo || !texto) return;
    if (!('speechSynthesis' in window)) return;

    
    let voices = window.speechSynthesis.getVoices();

    
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
    }

    setTimeout(() => {
      const textoCorregido = this.normalizarTexto(texto);
      const utterance = new SpeechSynthesisUtterance(textoCorregido);
      utterance.lang = 'es-ES';
      utterance.rate = 0.9;
      utterance.pitch = 1.1;

      
      voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(v => v.lang.startsWith('es'));
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }

      window.speechSynthesis.speak(utterance);

      
      
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    }, 50);
  }
}
