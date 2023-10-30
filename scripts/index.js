/*
Autor: Alfonso Reviejo Valle
GitHub:https://github.com/alfonn13/Examen_30-10-23-AlfonsoReviejoValle
*/

const depositar = document.getElementById('depositar');
const retirar = document.getElementById('retirar');
const transferir = document.getElementById('transferir');
const cambiarContraseña = document.getElementById('cambiocontraseña');
const salir = document.getElementById('salir');
const saldoNuevo = document.getElementById('saldo');

let saldo = 1000;
let PIN = '1234';
let intentos = 3;

document.addEventListener("DOMContentLoaded", () => {

    //Pasamos la funcion iniciar sesion que es para introudcir el pin correcto para entrar en el cajero
    window.addEventListener("load", iniciarSesion);

    //Funcion inciar sesion
    function iniciarSesion() {
        let pin = prompt("Indique el Pin para acceder al cajero: ")
        while (pin != PIN && intentos > 1) {
            intentos--;
            alert(`Introduzca un pin correcto. Le quedan ${intentos} intentos, sino se bloqueara el cajero.`);
            pin = prompt("Indique el Pin para acceder al cajero: ")
        }

        if (pin == PIN) {
            alert("Has accedido correctamente");
        } else {
            alert("Has bloqueado el cajero");
            window.location.replace("../templates/block.html")
        }
    }

    //Funcion actualizar saldo
    function actualizarSaldo() {
        saldoNuevo.innerHTML = `${saldo} €`;
    }

    //Funcion validar la cuenta bancaria
    function validarIBAN(iban) {
        var expresionRegular = /^(ES\d{22})$/;
        return expresionRegular.test(iban);
    }

    //Hacemos un addEventListener al boton depositar cuando hacemos click
    depositar.addEventListener("click", () => {
        const cantidad = parseFloat(prompt("Indique la cantidad que quiere ingresar en la cuenta: "));
        if (isNaN(cantidad) || cantidad < 0) {
            alert("Debes introducir un saldo adecuado la proxima vez.");
        } else {
            saldo += cantidad;
            alert(`Usted a ingresado ${cantidad}€ a su cuenta Bancaria.`);
            actualizarSaldo();    
        }
    })

    //Hacemos un addEventListener al boton retirar cuando hacemos click
    retirar.addEventListener("click", () => {
        const cantidad = parseFloat(prompt("Indique la cantidad que quiere retirar de la cuenta: "));
        if (isNaN(cantidad) || cantidad >= saldo || cantidad < 0) {
            alert("Debes introducir un saldo adecuado la proxima vez.");    
        } else {
            saldo -= cantidad;
            alert(`Usted a retirado ${cantidad}€ de su cuenta Bancaria.`);
            actualizarSaldo();
        }
    })

    //Hacemos un addEventListener al boton transferir cuando hacemos click
    transferir.addEventListener("click", () => {
        const cantidad = parseFloat(prompt(`Indique la cantidad que quiere transferir a la cuenta: `));
        if (isNaN(cantidad) || cantidad >= saldo || cantidad < 0) {
            alert("Cantidad invalida. Saldo insuficiente en la cuenta.");    
        } else {
            const cuenta = prompt("Indica la cuenta bancaria a la que deseas transferir a la cuenta Bancaria:")
            if (validarIBAN(cuenta)) {
                saldo -= cantidad;
                alert(`Usted a transferido ${cantidad}€ a la cuenta bancaria ${cuenta}`)
                actualizarSaldo();
                return;
            } else {
                alert("Debes seleccionar una cuenta bancaria valida.");
                console.log(saldo);
                console.log(cantidad);
            }
        }
    })

    //Hacemos un addEventListener al boton cambiarContraseña cuando hacemos click
    cambiarContraseña.addEventListener("click", () => {
        let pincambio = prompt("Indica el pin actual: ");
        if (pincambio == PIN) {
            const nuevoPin = prompt("Indica el nuevo PIN: ");
            alert(`Se ha cambiado exitosamente. Su nuevo pin es ${nuevoPin}`);
            PIN = nuevoPin;
        } else {
            alert(`No se ha realizado ningun cambio. El pin actual introudcido no es correcto`)
        }
    })

    //Hacemos un addEventListener al boton salir para que cuando hagamos click nos cambie al exit.html
    salir.addEventListener("click", () => {
        alert("Ha seleccionado salir. Hasta pronto")
        window.location.replace("../templates/exit.html");
    })




})


