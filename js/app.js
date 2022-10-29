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

    agregarCita(cita){
        this.citas = [...this.citas, cita];
        console.log(this.citas);
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
    imprimirCitas({citas}){
        this.limpiarHTML(); 
        citas.forEach(cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            //scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Telefono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: </span> ${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Sintomas: </span> ${sintomas}
            `;

            //boton para eliminar esta cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        ';
            btnEliminar.onclick = () => eliminarCita(id);

            //boton para editar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar';
            btnEditar.onclick = () => cargarEdicion(cita);

            //agregar los parrafos al divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            //agregar las citas al html
            contenedorCitas.appendChild(divCita);
        });   
        limpiarHTML(){
            while(contenedorCitas.firstChild){
                contenedorCitas.removeChild(contenedorCitas.firstChild);
            }   
        }
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

function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}