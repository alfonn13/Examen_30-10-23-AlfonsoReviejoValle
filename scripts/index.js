const depositar = document.getElementById('depositar');
const retirar = document.getElementById('retirar');
const transferir = document.getElementById('transferir');
const cambiarContraseña = document.getElementById('cambiocontraseña');
const salir = document.getElementById('salir');
const saldoNuevo = document.getElementById('saldo');

let saldo= 1000;
let PIN='1234';
let intentos =3;

document.addEventListener("DOMContentLoaded",()=>{

    window.addEventListener("load", iniciarSesion);

    function iniciarSesion(){
        let pin = prompt("Indique el Pin para acceder al cajero: ")
        while(pin != PIN && intentos>1){
            intentos--;
            alert(`Introduzca un pin correcto. Le quedan ${intentos} intentos, sino se bloqueara el cajero.`);
            pin = prompt("Indique el Pin para acceder al cajero: ")
        }
    
        if(pin == PIN){
            alert("Has accedido correctamente");
        }else{
            alert("Has bloqueado el cajero");
            window.location.replace("../templates/block.html")
        }
    }
    
    function actualizarSaldo(){
        saldoNuevo.innerHTML = `${saldo} €`;
    }

    function validarIBAN(iban) {
        var expresionRegular = /^(ES\d{22})$/;
        return expresionRegular.test(iban);
    }
    
    depositar.addEventListener("click", ()=>{
        const cantidad = parseFloat(prompt("Indique la cantidad que quiere ingresar en la cuenta: "));
    
        if(!isNaN(cantidad) || cantidad > 0){
            
            saldo += cantidad;
            alert(`Usted a ingresado ${cantidad}€ a su cuenta Bancaria.`);
            actualizarSaldo();
        }else{
            alert("Debes introducir un saldo adecuado la proxima vez.");
        }
    })

    retirar.addEventListener("click", ()=>{
        const cantidad = parseFloat(prompt("Indique la cantidad que quiere retirar de la cuenta: "));
    
        if(!isNaN(cantidad) || cantidad > saldo || cantidad < 0){
            
            saldo -= cantidad;
            alert(`Usted a retirado ${cantidad}€ de su cuenta Bancaria.`);
            actualizarSaldo();
        }else{
            alert("Debes introducir un saldo adecuado la proxima vez.");
        }
    })

    transferir.addEventListener("click", ()=>{
        const cantidad = parseFloat(prompt(`Indique la cantidad que quiere transferir a la cuenta: `));

        if(!isNaN(cantidad) && cantidad < saldo && cantidad >= 0 ){
            const cuenta = prompt("Indica la cuenta bancaria a la que deseas transferir a la cuenta Bancaria:")
            if(validarIBAN(cuenta)){
                saldo-=cantidad;
                alert(`Usted a transferido ${cantidad}€ a la cuenta bancaria ${cuenta}`)
                actualizarSaldo();
                return;
                
            }else{
                alert("Debes seleccionar una cuenta bancaria valida.");
                console.log(saldo);
                console.log(cantidad); 
                
            }   
        }else{
            alert("Cantidad invalida. Saldo insuficiente en la cuenta.");
        }
            
    })

    cambiarContraseña.addEventListener("click",()=>{
        let pincambio = prompt("Indica el pin actual: ");
            if(pincambio == PIN){
                const nuevoPin = prompt("Indica el nuevo PIN: ");
                alert(`Se ha cambiado exitosamente. Su nuevo pin es ${nuevoPin}`);
                PIN = nuevoPin;
            }else{
                alert(`No se ha realizado ningun cambio. Ya que el pin no es correcto`)
            }   
    })

    salir.addEventListener("click", ()=>{
        alert("Ha seleccionado salir. Hasta pronto")
        window.location.replace("../templates/exit.html");
    })

    
    
    
})
    

