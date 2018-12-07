export class Jogos {
  listSorteados: Array<number>;
  listJogos: Array<Jogo>;  
}

export class Jogo {
    id: number;
    numeros: Array<number>;
    data: Date;
  }

export class Resultado {
  quadra: Array<number>; 
  quina: Array<number>; 
  sena: Array<number>; 
  numerosSorteados: Array<number>;
}
