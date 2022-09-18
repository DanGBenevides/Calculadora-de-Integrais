class operacoes {
    riemann(start, finish, funcao, n)
    {
        var tamanho = (finish - start);
        var resultado = 0.0;
        var h = 0.0;
        var div = tamanho / n;
        var pos = start + div;
        for (let i = 0; i < n; i++)
        {
            h = funcao.calcular(pos);
            pos += div;
            resultado += h * div;
        }
        return resultado;
    }
}
class Funcao {
    calcular(x)
    {
        var funcao = document.getElementById("funcao").value;
        if (funcao.includes("dx")) {
            funcao = funcao.replace("dx", "");
        }
        var e = nerdamer(funcao, {x: x}).evaluate()
        return e
    }
}

var calcular = document.getElementById("calcular");
calcular.addEventListener("click", function () {
    var start = document.getElementById("limite-inf").value;
    var finish = document.getElementById("limite-sup").value;
    if(start.includes("pi")) {
        // start = start.replace("pi", "3.14159265359");
        start = nerdamer(start, {pi: 3.14159265359}).evaluate()
    }
    else {
        start = parseFloat(start);
    }
    if (finish.includes("pi")) {
        // finish = finish.replace("pi", "3.14159265359");
        finish = nerdamer(finish, {pi: 3.14159265359}).evaluate()
    }
    else {
        finish = parseFloat(finish);
    }
    var n = 1000;
    var op = new operacoes();
    var f = new Funcao();
    alert(op.riemann(start, finish, f, n));
});