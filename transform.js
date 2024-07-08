import { Readable, Writable, Transform } from 'node:stream'

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

class InverseNumber extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1
    const buf = Buffer.from(String(transformed))
    //primeiro parametro é para retornar erros
    callback(null, buf)
  }
}

class MultiplyByTen extends Writable {
  /*
   função padrão de todos os streams de escrita.
   Chunk => pedaço que foi lido pela stream de leitura ( o que está no push)
   Encoding => Como o chunk está codificado
   Callback => Função chamada após terminar a stream terminar de fazer o que ela precisava fazer com aquela informação.

   OBS: a stream de escrita ela somente processa o Dado.
  */
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}
new OneToHundred()
  .pipe(new InverseNumber())
  .pipe(new MultiplyByTen())