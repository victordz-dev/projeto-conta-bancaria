import { Conta } from "../model/Conta";
import { ContaRepository } from "../repository/ContaRepository";
import { colors } from "../util/Colors";

export class ContaController implements ContaRepository{

      private _listaContas: Array<Conta> = new Array<Conta>();
      numero:number = 0;

      procurarPorNumero(numero: number): void {
            let buscaConta = this.buscarNoArray(numero);

            if(buscaConta != null){
                  buscaConta.visualizar();
            }else{
                  console.log(colors.fg.red, "\nA conta numero: " + numero + " não foi encontrada!", colors.reset);
            };
      };

      listarTodas(): void {
            for(let conta of this._listaContas){
                  conta.visualizar();
            };
      };

      cadastrar(conta: Conta): void {
            this._listaContas.push(conta);
            console.log(colors.fg.green, "\nA conta número: " + conta.numero + " foi criada com sucesso!", colors.reset);
      };

      atualizar(conta: Conta): void {
            let buscarConta = this.buscarNoArray(conta.numero);
            if(buscarConta != null){
                  this._listaContas[this._listaContas.indexOf(buscarConta)] = conta;
                  console.log(colors.fg.green, "\nA conta numero: " + conta.numero + " foi atualizada com sucesso!", colors.reset);
            } else{
                  console.log(colors.fg.red, "\nA conta numero :"+conta.numero+" não foi encontrada!", colors.reset);
            };
      };
      
      deletar(numero: number): void {
            let buscaConta = this.buscarNoArray(numero);
            if(buscaConta != null){
                  this._listaContas.splice(this._listaContas.indexOf(buscaConta), 1);
                  console.log(colors.fg.green, "\nA Conta numero: "+numero+"  foi apagada com sucesso!", colors.reset);
            } else{
                  console.log(colors.fg.red, "\nA conta numero :"+numero+" não foi encontrada!", colors.reset);
            };
      };

      sacar(numero: number, valor: number): void {
            let conta = this.buscarNoArray(numero);
            if(conta != null){
                  if(conta.sacar(valor) == true){
                        console.log(colors.fg.green,"\nO saque na sua conta numero: "+numero+" foi efetuado com sucesso!", colors.reset);
                  }else{
                        console.log(colors.fg.red,"\nA conta numero: "+numero+" não foi encontrada!", colors.reset);
                  };
            };
      };

      depositar(numero: number, valor: number): void {
            let conta = this.buscarNoArray(numero);
            if(conta != null){
                  conta.depositar(valor);
                  console.log(colors.fg.green,"\nO deposito na conta numero: "+numero+" foi efetuado com sucesso!", colors.reset);
            }else{
                  console.log(colors.fg.red,"\nA conta numero: "+numero+" não foi encontrada!", colors.reset);
            };
      };

      transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
            let contaOrigem = this.buscarNoArray(numeroOrigem);
            let contaDestino = this.buscarNoArray(numeroDestino);

            if(contaOrigem != null && contaDestino != null){
                  if(contaOrigem.sacar(valor)==true){
                        contaDestino.depositar(valor);
                        console.log(colors.fg.green,"\nA tranferencia da conta numero: "+numeroOrigem+" para a conta numero: "+numeroDestino+" foi efetuada com sucesso!", colors.reset);
                  };
            }else{
                  console.log(colors.fg.red,"\nA conta numero: "+numeroOrigem+" e/ou a conta numero: "+numeroDestino+" não foi encontrada!", colors.reset);
            };
      };


      public gerarNumero(): number{
            return ++ this.numero;
      };
      public buscarNoArray(numero: number): Conta | null {
            for(let conta of this._listaContas){
                  if(conta.numero === numero){
                        return conta;
                  };
            };
            return null;
      };
      
};