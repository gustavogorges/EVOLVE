import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  convertByteStringToBase64(imagem:string ){

              // Converta a string de bytes em um array de bytes
              const byteCharacters = atob(imagem);
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
        
              // Converta o array de bytes em uma URL Data (DataURL)
              return this.convertArrayBufferToBase64(byteArray);
           
            
          }
        
          // Método para converter array de bytes em uma URL Data (DataURL)
          convertArrayBufferToBase64(buffer: Uint8Array): string {
            const binary = buffer.reduce((data, byte) => data + String.fromCharCode(byte), '');
            return `data:image/jpeg;base64,${btoa(binary)}`;
          }

}
