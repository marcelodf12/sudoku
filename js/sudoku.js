var cantidadNodos = 0;
var backtrackSolutions = 0;
var auxMat;
var vueltas;
var matrizInicial = [[2, 9, 3, 6, 7, 5, 1, 8, 4],
    [1, 8, 6, 2, 9, 4, 5, 3, 7],
    [4, 5, 7, 8, 1, 3, 6, 2, 9],
    [9, 3, 1, 4, 8, 6, 7, 5, 2],
    [5, 4, 8, 3, 2, 7, 9, 6, 1],
    [7, 6, 2, 1, 5, 9, 3, 4, 8],
    [8, 7, 5, 9, 3, 2, 4, 1, 6],
    [6, 1, 9, 5, 4, 8, 2, 7, 3],
    [3, 2, 4, 7, 6, 1, 8, 9, 5]];
function inicializarMatriz() {
    matrizInicial = [[2, 9, 3, 6, 7, 5, 1, 8, 4],
        [1, 8, 6, 2, 9, 4, 5, 3, 7],
        [4, 5, 7, 8, 1, 3, 6, 2, 9],
        [9, 3, 1, 4, 8, 6, 7, 5, 2],
        [5, 4, 8, 3, 2, 7, 9, 6, 1],
        [7, 6, 2, 1, 5, 9, 3, 4, 8],
        [8, 7, 5, 9, 3, 2, 4, 1, 6],
        [6, 1, 9, 5, 4, 8, 2, 7, 3],
        [3, 2, 4, 7, 6, 1, 8, 9, 5]];
}
var n = 9;
function imprimirMatriz() {
    for (var i = 0; i < n; i++) {
        console.log(matrizInicial[i]);
    }
}

function intercambiarFila(fila1, fila2) {
    var auxiliar = matrizInicial[fila1];
    matrizInicial[fila1] = matrizInicial[fila2];
    matrizInicial[fila2] = auxiliar;
}
;

function intercambiarColumna(col1, col2) {
    var auxiliar;
    for (var i = 0; i < n; i++) {
        auxiliar = matrizInicial[i][col1];
        matrizInicial[i][col1] = matrizInicial[i][col2];
        matrizInicial[i][col2] = auxiliar;
    }
}
;
function generarJuego() {
    inicializarMatriz();
    var rand = Math.random();
    var Num1 = Math.round(Math.random() * 2);
    var Num2 = Math.round(Math.random() * 2);
    intercambiarFila(Num1, Num2);
    intercambiarColumna(Num1, Num2);
    var Num1 = Math.round(Math.random() * 2) + 3;
    var Num2 = Math.round(Math.random() * 2) + 3;
    intercambiarFila(Num1, Num2);
    intercambiarColumna(Num1, Num2);
    var Num1 = Math.round(Math.random() * 2) + 6;
    var Num2 = Math.round(Math.random() * 2) + 6;
    intercambiarFila(Num1, Num2);
    intercambiarColumna(Num1, Num2);
}
function nuevoJuego() {
    generarJuego();
    var M = parseInt(document.getElementById("inputM").value);
    console.log(M);
    borrarValores(M);
    renderizar(matrizInicial);
    matrizRescatada = matrizInicial;
}
function reiniciar() {
    matrizInicial = matrizRescatada;
    renderizar(matrizInicial);
}
function renderizar(matriz) {
    // Crea un elemento <table> y un elemento <tbody>
    var Div = document.getElementById("juego");
    Div.innerHTML = "";
    var tabla = document.createElement("table");
    tabla.setAttribute("class", "table table-striped table-bordered");
    Div.appendChild(tabla);
    var tblBody = document.createElement("tbody");
    tabla.appendChild(tblBody);
    // Crea las celdas
    for (var i = 0; i < n; i++) {
        // Crea las hileras de la tabla
        var hilera = document.createElement("tr");
        for (var j = 0; j < n; j++) {
            var celda = document.createElement("td");
            if (matriz[i][j] > 0) {
                celda.innerHTML = matrizInicial[i][j].toString();
            }
            hilera.appendChild(celda);
        }

        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(hilera);
    }
    console.log("Render");
}

function borrarValores(max) {
    if (max < 10) {
        alert("El numero minimo es 10");
        max = 10;
        document.getElementById("inputM").value = 10;
    }
    matrizInicial[n-1][n-1] = 0; // eliminar siempre la ultima celda
    max--;
    var i = 0;
    while (i < n * n - max) {
        var x = Math.round(Math.random() * (n - 1));
        var y = Math.round(Math.random() * (n - 1));
        if (matrizInicial[x][y] !== 0) {
            matrizInicial[x][y] = 0;
            i++;
        }
    }
}

function isValido(x, fila, col) {
    if (!filaValido(x, fila)) {
        return false;
    }
    if (!colValido(x, col)) {
        return false;
    }
    if (!bloqueValido(x, fila, col)) {
        return false;
    }
    return true;
}

function filaValido(x, fila) {
    for (var i = 0; i < n; i++) {
        if (matrizInicial[fila][i] === x) {
            return false;
        }
    }
    return true;
}

function colValido(x, col) {
    for (var i = 0; i < n; i++) {
        if (matrizInicial[i][col] === x) {
            return false;
        }
    }
    return true;
}

function bloqueValido(x, fila, col) {
    if (n > 3) {
        var startBlockRow = fila - fila % 3;
        var startBlockCol = col - col % 3;
        for (var i = startBlockRow; i <= startBlockRow + 2; i++) {
            for (var j = startBlockCol; j <= startBlockCol + 2; j++) {
                if (matrizInicial[i][j] === x) {
                    return false;
                }
            }
        }
        ;
        return true;
    }
    return true;
}
function nextEmpty(row, matriz) {
    //retorna la siguiente celda vacia, si no la hay, retorna null
    for (var i = row; i < n; i++) {
        for (var j = 0; j < n; j++) {
            if (matriz[i][j] === 0) {
                return [i, j];
            }
        }
    }
    return null;
}
function resolverBackTrack() {
    cantidadNodos = 0;
    backtrackSolutions = 0;
    auxMat = [];
    vueltas = 0;
    var startT = new Date();
    backTrack(0);
    var endT = new Date();
    renderizar(matrizInicial);
    console.log(auxMat);
    document.getElementById("tiempo").value = (endT - startT).toString();
    document.getElementById("soluciones").value = backtrackSolutions;
    document.getElementById("nodos").value = cantidadNodos;
}
function backTrack(filaAct)
{
    var fila, col, number;
    for (fila = filaAct; fila < n; fila++) {
        for (col = 0; col < n; col++) {
            //si la celda no esta vacia, ir a otra
            if (matrizInicial[fila][col] === 0) {
                for (number = 1; number <= 9; number++) {
                    //si el numero no es valido, next
                    if (isValido(number, fila, col)) {
                        matrizInicial[fila][col] = number;
                        cantidadNodos++;
                        if (fila === n - 1 && col === n - 1) {
                            //estoy en la ultima celda y es solucion
                            backtrackSolutions++;
                            auxMat.push(matrizInicial);
                        } else {
                            backTrack(fila);
                        }
                        //borramos el valor para seguir buscando soluciones
                        matrizInicial[fila][col] = 0;
                    }
                }
                return;
            }
        }
    }
    return;
}

