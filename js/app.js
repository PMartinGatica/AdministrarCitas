//campos del formulario

const inputMascota = document.querySelector('#mascota');
const inputPropietario = document.querySelector('#propietario');    
const inputTelefono = document.querySelector('#telefono');
const inputFecha = document.querySelector('#fecha');
const inputHora = document.querySelector('#hora');
const inputSintomas = document.querySelector('#sintomas');

//ui
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

class Citas{
    constructor(){
        this.citas = [];
    }
}
class UI{
    imprimirAlerta(mensaje, tipo){
        //crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        //agregar clase en base al tipo de error
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }
        //mensaje de error
        divMensaje.textContent = mensaje;
        //agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        //quitar la alerta despues de 5 segundos
        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    }
}
const ui = new UI();
const administrarCitas = new Citas();

//eventos
eventListeners();
function eventListeners() {
    inputMascota.addEventListener('change', datosCita);
    inputPropietario.addEventListener('change', datosCita);
    inputTelefono.addEventListener('change', datosCita);
    inputFecha.addEventListener('change', datosCita);
    inputHora.addEventListener('change', datosCita);
    inputSintomas.addEventListener('change', datosCita);
    
    formulario.addEventListener('submit', nuevaCita);
}
//objeto con la informacion de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}
//agrega datos al objeto de cita
function datosCita(e) {
    citaObj [e.target.name] = e.target.value;
    console.log(citaObj);
}

//valida y agrega una nueva cita a la clase de citas
function nuevaCita(e) {
    e.preventDefault();
    //extraer la informacion del objeto de cita
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;
    //validar
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }
    //generar un id unico
    citaObj.id = Date.now();
    //creando una nueva cita
    administrarCitas.agregarCita({...citaObj});
    //reiniciar el objeto para la validacion
    reiniciarObjeto();
    //reinicia el formulario
    formulario.reset();
    //mostrar el html de las citas
    ui.imprimirCitas(administrarCitas);
}