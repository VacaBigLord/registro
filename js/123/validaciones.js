export function valida(input) {
    const tipoInput = input.dataset.tipo
    if(validadores[tipoInput]){
        validadores[tipoInput](input)
    }

    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid')
        input.parentElement.querySelector('.input-message-error').innerHTML = ''
    } else {
        input.parentElement.classList.add('input-container--invalid')
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeError(tipoInput, input)
    }
}

const tipoErrores = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const mensajesError = {
    nombre: {
        valueMissing: 'Dale que te haces el misterioso'
    },
    email: {
        valueMissing: 'Despues perdes el turno por no poner el correo cara de paralelogramo',
        typeMismatch: 'quiero creer que le herraste a la tecla spiderman.'
    },
    password: {
        valueMissing: 'Obio que hace falta contraseña y mas te vale que sea buena',
        patternMismatch: "entre 6 y 12 caracteres una minuscula, una mayuscula y un numero. Si soy exigente"
    },
    nacimiento: {
        customError: 'Dale ponele que sos menor de edad si tenes mas pelos abajo que yo en la cabeza'
    }
}


const validadores = {
    nacimiento: input => validarNacimiento(input)
}

function mostrarMensajeError (tipoInput, input){
    let mensaje = ''
    tipoErrores.forEach(error => {
        if(input.validity[error]) {
            console.log(error)
            console.log(input.validity[error])
            console.log(mensajesError[tipoInput][error])
            mensaje = mensajesError[tipoInput][error]
        }
    })

    return mensaje
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    const mensaje = 'debes ser mayor de edad para completar el registro'
    if (!mayorEdad(fechaCliente)){
        console.log(mensaje)
        input.setCustomValidity(mensaje);
    };

    input.setCustomValidity(mensaje);
}

function mayorEdad(fecha){
    const fechaActual = new Date();
    const diferencia = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );

    return diferencia <= fechaActual
}