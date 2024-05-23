import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TextToSpeechService } from 'src/service/text-to-speech.service';

@Component({
  selector: 'app-text-to-speech',
  templateUrl: './text-to-speech.component.html',
  styleUrls: ['./text-to-speech.component.scss']
})
export class TextToSpeechComponent implements OnInit {

  constructor(private textToSpeechService : TextToSpeechService) { }

  ngOnInit(): void {
  }

  @Output() speakText: EventEmitter<string> = new EventEmitter<string>();

  selectedText: string = '';
  canSpeak: boolean = false;

  callService() {
    this.canSpeak = !this.canSpeak;
    this.textToSpeechService.canSpeak = this.canSpeak;
  }

}
