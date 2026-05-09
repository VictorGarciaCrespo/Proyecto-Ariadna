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

    // Cancelar cualquier voz anterior
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  }
}
