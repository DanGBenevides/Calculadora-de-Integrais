// Classe responsável por fazer as operações
class operacoes {
    riemann(start, finish, funcao, n) // Função que calcula a soma de Riemann
    {
        var tamanho = (finish - start); // Tamanho do intervalo
        var resultado = 0.0; // Declaração da variável resultado
        var h = 0.0; // Declaração da variável h (altura)
        var div = tamanho / n; // Divisão do tamanho do intervalo pelo número de retângulos
        var pos = start + div; // Posição do primeiro retângulo
        for (let i = 0; i < n; i++) // Loop para calcular a soma de Riemann
        {
            h = funcao.calcular(pos); // Calcula a altura do retângulo
            pos += div; // Incrementa a posição do retângulo
            resultado += h * div; // Calcula a área do retângulo e soma ao resultado
        }
        return resultado;
    }
}

// Essa classe é responsável por pegar a função e calcular a mesma, substituindo as variáveis
class Funcao {
    calcular(x) { // Função que resolve a função digitada
        var funcao = document.getElementById("funcao").value; // Pega a função digitada
        funcao = funcao.toLowerCase(); // Transforma a função em minúsculo
        if (funcao.includes("dx")) { // Verifica se a função tem dx
            funcao = funcao.replace("dx", ""); // Remove dx da função, para ser capaz de calcular
        }
        if (funcao.includes("sen")) { // Verifica se a função tem sen
            funcao = funcao.replace("sen", "sin"); // Substitui sen por sin, para ser capaz de calcular
        }
        if (funcao.includes("ln")) { // Verifica se a função tem ln
            funcao = funcao.replace("ln", "log"); // Substitui ln por log, para ser capaz de calcular
        }
        var e = nerdamer(funcao, {x: x}).evaluate() // Calcula a função
        return e
    }
}

var calcular = document.getElementById("calcular"); // Pega o botão calcular
calcular.addEventListener("click", function () { // Adiciona um evento de click no botão
    var start = document.getElementById("limite-inf").value; // Pega o limite inferior
    var finish = document.getElementById("limite-sup").value; // Pega o limite superior
    if(start.includes("pi")) { // Verifica se o limite inferior tem pi
        start = nerdamer(start, {pi: 3.14159265359}).evaluate() // Substitui pi por 3.14159265359
    } else if (start.includes("ln")) { // Verifica se o limite inferior tem ln
        start = start.replace("ln", ""); // Remove ln do limite inferior
        start = parseFloat(start); // Converte o limite inferior para float
        start = Math.log(start); // Calcula o ln do limite inferior
    } else {
        start = parseFloat(start); // Converte o limite inferior para float
    }

    if (finish.includes("pi")) { // Verifica se o limite superior tem pi
        finish = nerdamer(finish, {pi: 3.14159265359}).evaluate() // Substitui pi por 3.14159265359
    } else if (finish.includes("ln")) { // Verifica se o limite superior tem ln
        finish = nerdamer(finish).evaluate() // Calcula o ln do limite superior
    } else {
        finish = parseFloat(finish); // Converte o limite superior para float
    }

    var n = document.getElementById("n").value; // Pega o número de retângulos
    var op = new operacoes(); // Cria um objeto da classe operacoes
    var f = new Funcao(); // Cria um objeto da classe Funcao
    var resultado = document.getElementById("res");
    var calculo = op.riemann(start, finish, f, n); // Calcula a soma de Riemann
    if (calculo < 0) calculo = calculo * -1;
    resultado.innerHTML = " " + calculo;
});

var limpar = document.getElementById("limpar"); 
limpar.addEventListener("click", function () { 
    let resultado = document.getElementById("res");
    let funcao = document.getElementById("funcao");
    let limiteInf = document.getElementById("limite-inf");
    let limiteSup = document.getElementById("limite-sup");
    let n = document.getElementById("n");

    resultado.innerHTML = "";
    funcao.value = "";
    limiteInf.value = "";
    limiteSup.value = "";
    n.value = "";
});


