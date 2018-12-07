import { Component } from '@angular/core';
//import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Jogo, Resultado } from './jogo';
import { Http, Response, Headers, RequestOptions, URLSearchParams } 
from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  headers: Headers;
  options: RequestOptions;
  constructor(private http: Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json', 
    'Accept': 'q=0.8;application/json;q=0.9' });
    this.options = new RequestOptions({ headers: this.headers });
   }
  title = '';
  id = 0;
  Arr = Array;
  num:number = 60;
  listaJogos = new Array<Jogo>();
  resultado: Resultado;
  selectedNumbers = new Array<number>();
  msgErro = "";
  
  //salvarJogo(): void {
  //  var body = JSON.stringify(this.listaJogos);
  //  this.http.post('http://localhost:4200/api/Sorteio/RealizarSorteio', body, this.options)
  //      .subscribe(
  //        data => {         
  //          this.resultado = data.json();         
  //        });
  //}

  salvarJogo(): void {
    this.http.get("http://localhost:4200/api/Sorteio/RealizarSorteio?json="+JSON.stringify(this.listaJogos)).subscribe(
      data => {         
        this.resultado = data.json();       
      }); 
  }

  gerarSurpresinha(): void {
    var num = new Array<number>();
    num.push(Math.round((Math.random() * 61)))
    num.push(Math.round((Math.random() * 61)))
    num.push(Math.round((Math.random() * 61)))
    num.push(Math.round((Math.random() * 61)))
    num.push(Math.round((Math.random() * 61)))
    num.push(Math.round((Math.random() * 61)))

    this.gerarNovoJogo(num);
  }

  jogar(): void {
    if(this.selectedNumbers.length != 6){
      this.msgErro = "Favor escolher 6 números";
      return;
    }      
    this.gerarNovoJogo();
    this.limpar();    
  }

  gerarNovoJogo(num: Array<number> = null): void{
    let jogo = new Jogo();
    jogo.id = this.id;

    if(num)
      jogo.numeros = num;
    else
      jogo.numeros = this.selectedNumbers;

    jogo.data = new Date();    
    this.listaJogos.push(jogo); 
    this.id ++;
  }

  toggle(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    console.log(target);
    var idAttr = target.attributes.value.value;
    console.log(idAttr);
  } 

  limpar(){
    this.selectedNumbers = new Array();
    this.msgErro = "";
  }

  numberClick(num: number){
    let index = this.selectedNumbers.indexOf(num);
    if(index >= 0)
    {
      this.selectedNumbers.splice(index,1);
    }
    else
    {
      if(this.selectedNumbers.length == 6){
        this.msgErro = "Favor somente escolher 6 números";
        return;
      }  
      this.msgErro = "";
      this.selectedNumbers.push(num);
    }
    this.selectedNumbers.sort();
  }

  checkSelected(index: number): boolean {    
    let a = this.selectedNumbers.filter(x => x = index);        
    if(a && a.length > 0)
        return true;
    else
        return false;
 } 
}

