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

  hablar(texto: string): void {
    if (!this.activo || !texto) return;
    if (!('speechSynthesis' in window)) return;

    // Precargar voces (útil para Chrome que las carga de forma asíncrona)
    let voices = window.speechSynthesis.getVoices();

    // Limpiar atascos en Chrome (si está hablando o tiene algo pendiente)
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
    }

    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = 'es-ES';
      utterance.rate = 0.9;
      utterance.pitch = 1.1;

      // Volver a obtener las voces (por si Chrome ya las ha cargado)
      voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(v => v.lang.startsWith('es'));
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }

      window.speechSynthesis.speak(utterance);

      // Parche específico para otro bug de Chrome:
      // A veces Chrome necesita un 'resume' para destrabarse después de un 'speak'
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    }, 50);
  }
}
