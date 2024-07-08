// Streams --> é possível ler e enviar dados aos poucos! 


process.stdin
  .pipe(process.stdout)


// Terminal 
// node fundamentos.js
// Tudo o que recebo via terminal "process.stdin" ele envia novamente via "process.stdout"
// Limpar arquivo.
/* --------------------------------------------------------------------------------------------------- */
import { Readable } from 'node:stream'

class OneToHundred extends Readable {
  index = 1

  // função padrão de todos os streams de leitura.
  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        // push é o metodo utilizado para fornecer informações para quem está consumindo ela.
        //Quando enviamos null, estamos dizendo que não temos mais informações para serem enviadas.
        this.push(null)
      } else {
        const buf = Buffer.from(String(i)) // Buffer n aceita Numeros somente string
        this.push(buf) // O push precisa receber um buffer
      }
    }, 100)

  }
}

new OneToHundred()
  .pipe(process.stdout)
