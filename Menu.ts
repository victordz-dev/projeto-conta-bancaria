import readlinesync = require("readline-sync");
import { colors } from './src/util/Colors';
import { Conta } from './src/model/Conta';
import { ContaCorrente } from './src/model/ContaCorrente';
import { ContaPoupanca } from './src/model/ContaPoupanca';
import { ContaController } from "./src/controller/ContaController";

export function main() {

    let contas: ContaController = new ContaController();

    let opcao, numero, agencia, tipo, saldo, limite, aniversario, valor, numeroDestino: number;
    let titular: string;
    const tiposContas = ['Conta Corrente', 'Conta Poupanca'];

    let cc1: ContaCorrente = new ContaCorrente(contas.gerarNumero(), 123, 1, "João da Silva", 1000, 100.0);
    contas.cadastrar(cc1);

    let cc2: ContaCorrente = new ContaCorrente(contas.gerarNumero(), 124, 1, "Maria da Silva", 2000, 100.0);
    contas.cadastrar(cc2);

    let cp1: ContaPoupanca = new ContaPoupanca(contas.gerarNumero(), 125, 2, "Mariana dos Santos", 4000, 12);
    contas.cadastrar(cp1);

    let cp2: ContaPoupanca = new ContaPoupanca(contas.gerarNumero(), 125, 2, "Juliana Ramos", 8000, 15);
    contas.cadastrar(cp2);

    contas.listarTodas();

    while (true) {

        console.log(`${colors.bg.black, colors.fg.yellow}
*****************************************************
                                                        
                BANCO DO BRAZIL COM Z                
                                                        
*****************************************************
                                                        
            1 - Criar Conta                          
            2 - Listar todas as Contas               
            3 - Buscar Conta por Numero              
            4 - Atualizar Dados da Conta             
            5 - Apagar Conta                         
            6 - Sacar                                
            7 - Depositar                            
            8 - Transferir valores entre Contas      
            9 - Sair                                 
                                                        
*****************************************************${colors.reset}`);

        console.log("Entre com a opção desejada: ");
        opcao = readlinesync.questionInt("");
        if (opcao == 9) {
            console.log(colors.fg.greenstrong, "\nBanco do Brazil com Z - O seu Futuro começa aqui!");
            sobre();
            console.log(colors.reset, "");
            process.exit(0);
        }
        switch (opcao) {
            case 1:
                console.log(colors.fg.whitestrong, "\n\nCriar Conta\n\n", colors.reset);
                agencia = readlinesync.questionInt("Digite o número da agência: ");
                titular = readlinesync.question("Digite o nome do titular da conta: ");
                tipo = readlinesync.keyInSelect(tiposContas, "\nDigite o tipo da conta",{cancel: false})+1;
                saldo = readlinesync.questionFloat("Digite o saldo da conta (R$): ");

                switch(tipo){
                    case 1:
                        limite = readlinesync.questionFloat("Digite o limite da conta: ");
                        contas.cadastrar(
                            new ContaCorrente(contas.gerarNumero(), agencia, tipo, titular, saldo, limite));
                        break;
                    case 2:
                        aniversario = readlinesync.questionInt("Digite o dia do aniversário da Conta Poupança: ");
                        contas.cadastrar(
                            new ContaPoupanca(contas.gerarNumero(), agencia, tipo, titular, saldo, aniversario));
                        break;
                };
                keyPress();
                break;
            case 2:
                console.log(colors.fg.whitestrong, "\n\nListar todas as Contas\n\n", colors.reset);
                contas.listarTodas();
                keyPress();
                break;
            case 3:
                console.log(colors.fg.whitestrong, "\n\nConsultar dados da Conta - por número\n\n", colors.reset);
                numero = readlinesync.questionInt("Digite o número da conta: ");
                contas.procurarPorNumero(numero);
                keyPress();
                break;
            case 4:
                console.log(colors.fg.whitestrong, "\n\nAtualizar dados da Conta\n\n", colors.reset);
                numero = readlinesync.questionInt("Digite o número da conta: ");
                let conta = contas.buscarNoArray(numero);
                if(conta != null){
                    agencia = readlinesync.questionInt("Digite o número da agência: ");
                    titular = readlinesync.question("Digite o nome do titular da conta: ");
                    tipo = conta.tipo;
                    saldo = readlinesync.questionFloat("Digite o saldo da conta (R$): ");
                    switch(tipo){
                        case 1:
                            limite = readlinesync.questionFloat("Digite o limite da conta: ");
                            contas.atualizar(
                                new ContaCorrente(numero, agencia, tipo, titular, saldo, limite));
                            break;
                        case 2:
                            aniversario = readlinesync.questionInt("Digite o dia do aniversário da Conta Poupança: ");
                            contas.atualizar(
                                new ContaPoupanca(numero, agencia, tipo, titular, saldo, aniversario));
                            break;
                    };
                } else{
                        console.log(colors.fg.red, "\nA conta numero: "+numero+" não foi encontrada!", colors.reset);
                    };
                keyPress();
                break;
            case 5:
                console.log(colors.fg.whitestrong, "\n\nApagar uma Conta\n\n", colors.reset);
                numero = readlinesync.questionInt("Digite o numero da conta: ");
                contas.deletar(numero);
                keyPress();
                break;
            case 6:
                console.log(colors.fg.whitestrong, "\n\nSaque\n\n", colors.reset);
                numero = readlinesync.questionInt("Digite o numero da conta: ");
                valor = readlinesync.questionFloat("Digite o valor do saque (R$): ");
                contas.sacar(numero, valor);
                keyPress();
                break;
            case 7:
                console.log(colors.fg.whitestrong, "\n\nDepósito\n\n", colors.reset);
                numero = readlinesync.questionInt("Digite o numero da conta: ");
                valor = readlinesync.questionFloat("Digite o valor do deposito (R$): ");
                contas.depositar(numero, valor);
                keyPress();
                break;
            case 8:
                console.log(colors.fg.whitestrong, "\n\nTransferência entre Contas\n\n", colors.reset);
                numero = readlinesync.questionInt("Digite o numero da conta de origem: ");
                numeroDestino = readlinesync.questionInt("Digite o numero da conta de destino: ");
                valor = readlinesync.questionFloat("Digite o valor do deposito (R$): ");
                contas.transferir(numero, numeroDestino, valor);
                keyPress();
                break;
            default:
                console.log(colors.fg.whitestrong, "\nOpção Inválida!\n", colors.reset);

                keyPress();
                break;
        }
    }

}

/* Função com os dados da pessoa desenvolvedora */
function sobre(): void {
    console.log("\n*****************************************************");
    console.log("Projeto Desenvolvido por: Victor Rodriguez");
    console.log("Generation Brasil - generation@generation.org");
    console.log("github.com/conteudoGeneration");
    console.log("*****************************************************");
}

function keyPress(): void {
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar...");
    readlinesync.prompt();
}

main();