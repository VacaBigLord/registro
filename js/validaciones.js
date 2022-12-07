export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeDeError(tipoDeInput, input);
  }
}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

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
    valueMissing: 'Obio que hace falta contraseña y mas te vale que sea buena',
    customError: 'Dale ponele que sos menor de edad si tenes mas pelos abajo que yo en la cabeza'
  },
  numero: {
    valueMissing: 'Si no te da la plata para un celular no tengas perro',
    patternMismatch: 'Formato de 2954xxxxxx'
  },
  direccion: {
    valueMissing: 'Dale que tengo que doxear a alguien',
    patternMismatch: 'capas que le falta reyenito [entre 10 y 40 caracteres]'
  },
  ciudad: {
    valueMissing: 'Dale que tengo que doxear a alguien',
    patternMismatch: 'capas que le falta reyenito [entre 4 y 30 caracteres]'
  },
  provincia: {
    valueMissing: 'Dale que tengo que doxear a alguien',
    patternMismatch: 'capas que le falta reyenito [entre 4 y 30 caracteres]'
  }
}

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
  let mensaje = "";
  tipoDeErrores.forEach((error) => {
    if (input.validity[error]) {
      console.log(tipoDeInput, error);
      console.log(input.validity[error]);
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });
  return mensaje;
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "debes ser mayor de edad para completar el registro";
  }

  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}
