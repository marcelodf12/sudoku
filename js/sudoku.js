var cantidadNodos = 0;
var solutions = 0;
var auxMat;
var vueltas;
var primeraSol = true;
var barProg;
var opciones = [];
var matrizInicial;
var matrizSolucion =
        [
            [8, 1, 2, 7, 5, 3, 6, 4, 9],
            [9, 4, 3, 6, 8, 2, 1, 7, 5],
            [6, 7, 5, 4, 9, 1, 2, 8, 3],
            [1, 5, 4, 2, 3, 7, 8, 9, 6],
            [3, 6, 9, 8, 4, 5, 7, 2, 1],
            [2, 8, 7, 1, 6, 9, 5, 3, 4],
            [5, 2, 1, 9, 7, 4, 3, 6, 8],
            [4, 3, 8, 5, 2, 6, 9, 1, 7],
            [7, 9, 6, 3, 1, 8, 4, 5, 2]
        ];
var matrizBase =
        [
            [8, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 3, 6, 0, 0, 0, 0, 0],
            [0, 7, 0, 0, 9, 0, 2, 0, 0],
            [0, 5, 0, 0, 0, 7, 0, 0, 0],
            [0, 0, 0, 0, 4, 5, 7, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 3, 0],
            [0, 0, 1, 0, 0, 0, 0, 6, 8],
            [0, 0, 8, 5, 0, 0, 0, 1, 0],
            [0, 9, 0, 0, 0, 0, 4, 0, 0]
        ];
function inicializarMatriz() {
    matrizSolucion = [
        [8, 1, 2, 7, 5, 3, 6, 4, 9],
        [9, 4, 3, 6, 8, 2, 1, 7, 5],
        [6, 7, 5, 4, 9, 1, 2, 8, 3],
        [1, 5, 4, 2, 3, 7, 8, 9, 6],
        [3, 6, 9, 8, 4, 5, 7, 2, 1],
        [2, 8, 7, 1, 6, 9, 5, 3, 4],
        [5, 2, 1, 9, 7, 4, 3, 6, 8],
        [4, 3, 8, 5, 2, 6, 9, 1, 7],
        [7, 9, 6, 3, 1, 8, 4, 5, 2]
    ];
    matrizBase =
            [
                [8, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 3, 6, 0, 0, 0, 0, 0],
                [0, 7, 0, 0, 9, 0, 2, 0, 0],
                [0, 5, 0, 0, 0, 7, 0, 0, 0],
                [0, 0, 0, 0, 4, 5, 7, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 3, 0],
                [0, 0, 1, 0, 0, 0, 0, 6, 8],
                [0, 0, 8, 5, 0, 0, 0, 1, 0],
                [0, 9, 0, 0, 0, 0, 4, 0, 0]
            ];
}
var n = 9;
function imprimirMatriz() {
    for (var i = 0; i < n; i++) {
        console.log(matrizInicial[i]);
    }
}

function intercambiarFila(m, fila1, fila2) {
    var auxiliar = m[fila1];
    m[fila1] = m[fila2];
    m[fila2] = auxiliar;
    return m;
}
;

function intercambiarColumna(m, col1, col2) {
    var auxiliar;
    for (var i = 0; i < n; i++) {
        auxiliar = m[i][col1];
        m[i][col1] = m[i][col2];
        m[i][col2] = auxiliar;
        return m;
    }
}
;
function intercambiarNumeros(m, n1, n2) {
    for (var fila = 0; fila < n; fila++) {
        for (var col = 0; col < n; col++) {
            //console.log(fila.toString() + "-" + col.toString());
            if (m[fila][col] === n1) {
                m[fila][col] = n2;
            } else if (m[fila][col] === n2) {
                m[fila][col] = n1;
            }
        }
    }
    return m;
}
function generarJuego() {
    inicializarMatriz();
    var rand = Math.random();
    var Num1 = Math.round(Math.random() * 2);
    var Num2 = Math.round(Math.random() * 2);
    matrizBase = intercambiarFila(matrizBase, Num1, Num2);
    matrizBase = intercambiarColumna(matrizBase, Num1, Num2);
    matrizSolucion = intercambiarFila(matrizSolucion, Num1, Num2);
    matrizSolucion = intercambiarColumna(matrizSolucion, Num1, Num2);
    var Num1 = Math.round(Math.random() * 2) + 3;
    var Num2 = Math.round(Math.random() * 2) + 3;
    matrizBase = intercambiarFila(matrizBase, Num1, Num2);
    matrizBase = intercambiarColumna(matrizBase, Num1, Num2);
    matrizSolucion = intercambiarFila(matrizSolucion, Num1, Num2);
    matrizSolucion = intercambiarColumna(matrizSolucion, Num1, Num2);
    var Num1 = Math.round(Math.random() * 2) + 6;
    var Num2 = Math.round(Math.random() * 2) + 6;
    matrizBase = intercambiarFila(matrizBase, Num1, Num2);
    matrizBase = intercambiarColumna(matrizBase, Num1, Num2);
    matrizSolucion = intercambiarFila(matrizSolucion, Num1, Num2);
    matrizSolucion = intercambiarColumna(matrizSolucion, Num1, Num2);
    for (var vueltas = 0; vueltas < 25; vueltas++) {
        Num1 = aleatorioEntre(1, 9);
        Num2 = aleatorioEntre(1, 9);
        if (Num1 !== Num2) {
            matrizBase = intercambiarNumeros(matrizBase, Num1, Num2);
            matrizSolucion = intercambiarNumeros(matrizSolucion, Num1, Num2);
        }

    }
    matrizInicial = clonar(matrizBase);
}
function nuevoJuego() {
    generarJuego();
    var M = parseInt(document.getElementById("inputM").value);
    addValores(M);
    renderizar(matrizInicial);
    matrizRescatada = clonar(matrizInicial);
}
function reiniciar() {
    matrizInicial = clonar(matrizRescatada);
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
            } else {
                celda.innerHTML = "&nbsp&nbsp";
            }
            hilera.appendChild(celda);
        }

        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(hilera);
    }
    console.log("Render");
}
function aleatorioEntre(MIN, MAX) {
    return Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
}
function addValores(max) {
    if (max < 25) {
        alert("El numero minimo es 25");
        max = 10;
        document.getElementById("inputM").value = 25;
    }
    var i = 0;
    console.table(matrizInicial);
    while (i < max - 21) {
        var x = Math.round(Math.random() * (n - 1));
        var y = Math.round(Math.random() * (n - 1));
        if (matrizInicial[x][y] === 0 && matrizSolucion[x][y] !== 0) {
            matrizInicial[x][y] = matrizSolucion[x][y];
            i++;
            console.log(i.toString() + "en" + x.toString() + "-" + y.toString());
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
function resolver(algoritmo) {
    cantidadNodos = 0;
    auxMat = [];
    vueltas = 0;
    var startT = new Date();
    if (algoritmo === 1) {
        console.log("Algoritmo Bactraking");
        if (backTrack(0)) {
            console.log("EXITO");
        } else {
            nuevoJuego();
            console.log("FRACASO");
        }
        ;
    } else if (algoritmo === 2) {
        console.log("Algoritmo de las Vegas");
        if (vegas(0)) {
            console.log("EXITO");
        } else {
            nuevoJuego();
            console.log("FRACASO");
        }
        ;
    } else if (algoritmo === 3) {
        iniciarOpciones();
        console.log("Algoritmo con Heuristica");
        if (heuristica()) {
            console.log("EXITO");
        } else {
            nuevoJuego();
            console.log("FRACASO");
        }
        ;
    }
    console.log("FIN");
    var endT = new Date();
    console.log(auxMat);
    document.getElementById("tiempo").value = (endT - startT).toString();
    document.getElementById("nodos").value = cantidadNodos;
}
function completo(m) {
    for (var f = 0; f < n; f++) {
        for (var c = 0; c < n; c++) {
            if (m[f][c] === 0) {
                return false;
            }
        }
    }
    return true;
}
function randomSinRepetir() {
    probados = [false, false, false, false, false, false, false, false, false];
    numeros = [];
    for (var c = 0; c < 9; c++) {
        var number = aleatorioEntre(1, 9);
        while (probados[number - 1]) {
            number = aleatorioEntre(1, 9);
        }
        probados[number - 1] = true;
        numeros.push(number);
    }
    return numeros;
}
function vegas(filaAct) {
    if (completo(matrizInicial)) {
        renderizar(clonar(matrizInicial));
        return true;
    } else {
        for (var fila = filaAct; fila < n; fila++) {
            for (var col = 0; col < n; col++) {
                if (matrizInicial[fila][col] === 0) {
                    aleatorios = randomSinRepetir();
                    for (var c = 0; c < 9; c++) {
                        var number = aleatorios[c];
                        if (isValido(number, fila, col)) {
                            matrizInicial[fila][col] = number;
                            cantidadNodos++;
                            if (vegas(fila)) {
                                return true;
                            } else {
                                matrizInicial[fila][col] = 0;
                            }
                        }
                    }
                    return false;
                }
            }
        }
    }
}
function backTrack(filaAct) {
    if (completo(matrizInicial)) {
        renderizar(clonar(matrizInicial));
        return true;
    } else {
        for (var fila = filaAct; fila < n; fila++) {
            for (var col = 0; col < n; col++) {
                if (matrizInicial[fila][col] === 0) {
                    for (var c = 0; c < 9; c++) {
                        number = c + 1;
                        if (isValido(number, fila, col)) {
                            matrizInicial[fila][col] = number;
                            cantidadNodos++;
                            if (backTrack(fila)) {
                                return true;
                            } else {
                                matrizInicial[fila][col] = 0;
                            }
                        }
                    }
                    return false;
                }
            }
        }
    }

}
function heuristica() {
    if (completo(matrizInicial)) {
        renderizar(clonar(matrizInicial));
        return true;
    } else {
        var menor = menosOpciones();
        var f = menor[0];
        var c = menor[1];
        for (var x = 1; x < 10; x++) {
            if (isValido(x, f, c)) {
                matrizInicial[f][c] = x;
                iniciarOpciones();
                cantidadNodos++;
                if (heuristica()) {
                    return true;
                } else {
                    matrizInicial[f][c] = 0;
                    iniciarOpciones();
                }
            }
        }
        
    }
}
function iniciarOpciones() {
    for (var fila = 0; fila < n; fila++) {
        opciones[fila] = [];
        for (var col = 0; col < n; col++) {
            if (matrizInicial[fila][col] === 0) {
                opciones[fila][col] = 0;
                for (var c = 1; c < 10; c++) {
                    if (isValido(c, fila, col)) {
                        opciones[fila][col]++;
                    }
                }
            } else {
                opciones[fila][col] = 10;
            }
        }
    }
}
function menosOpciones() {
    var cm = 0;
    var fm = 0;
    for (var fila = 0; fila < n; fila++) {
        for (var col = 0; col < n; col++) {
            if (opciones[fm][cm] > opciones[fila][col]) {
                cm = col;
                fm = fila;
            }
        }
    }
    menor = [fm, cm];
    return menor;
}
function clonar(m) {
    a = [];
    for (fila = 0; fila < n; fila++) {
        a[fila] = [];
        for (col = 0; col < n; col++) {
            a[fila][col] = m[fila][col]
        }
    }
    return a;
}