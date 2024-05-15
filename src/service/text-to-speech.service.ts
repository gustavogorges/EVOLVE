import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
  })

export class TextToSpeechService {
    canSpeak: boolean = false;
    utteranceVoices = speechSynthesis.getVoices();
    speak(text: string) {
      if (!this.canSpeak) {
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = this.utteranceVoices[0];
      speechSynthesis.speak(utterance);
    }
}