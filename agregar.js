// Variable global para almacenar los datos de mascotas
let mascotas = JSON.parse(localStorage.getItem('mascotas')) || [];


let users = JSON.parse(localStorage.getItem('users')) || [];

let myid = localStorage.getItem('myide');
console.log(myid); // Imprime: "Hola, mundo!"
var myinfo;
console.log(typeof [])

for(i=0; i < users.length; i++){
  if(users[i].id == myid){
    console.log(users[i])
    myinfo = users[i]
  }
}

// Función para guardar las mascotas en el JSON
function guardarMascotas() {
    fetch('mascotas.json', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mascotas),
    })
      .then(() => {
        console.log('Mascotas guardadas con éxito');
        localStorage.setItem('mascotas', JSON.stringify(mascotas));
      })
      .catch((error) => {
        console.error('Error al guardar mascotas:', error);
      });
  }

// Función para agregar una mascota
function agregarMascota() {
    event.preventDefault(); // Previene que el formulario se envíe y la página se recargue

    const nombre = document.getElementById('nombre').value;
    const especie = document.getElementById('especie').value;
    const raza = document.getElementById('raza').value;
    const color = document.getElementById('color').value;
    const edad = parseInt(document.getElementById('edad').value);
    const sexo = document.getElementById('sexo').value;
    const ubicacion = document.getElementById('ubicacion').value;
    const contactoNombre = document.getElementById('contactoNombre').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const imagenInput = document.getElementById('imagen');

    // Agregar la función mostrarImagen aquí
    const imagenMostrada = document.getElementById('imagenMostrada');
    const file = imagenInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        imagenMostrada.src = e.target.result;
      };

      reader.readAsDataURL(file);
    } else {
      // Si no se selecciona ningún archivo, se muestra una imagen vacía o un mensaje
      imagenMostrada.src = '';
    }

    const descripcion = document.getElementById('descripcion').value;

    if (nombre && especie && raza && color && !isNaN(edad) && ubicacion && contactoNombre && telefono && email && descripcion) {
        const imagenSeleccionadaURL = document.getElementById('imagenMostrada').src;

        const mascota = {
            iduser: myinfo.id,
            id: mascotas.length + 1,
            nombre,
            especie,
            raza,
            color,
            edad,
            sexo,
            ubicacion,
            contacto: {
                nombre: contactoNombre,
                telefono,
                email,
            },
            imagen: imagenSeleccionadaURL,
            descripcion,
        };
        //alert("Se ha registrado correctamente");

        // Recuperar mascotas desde localStorage, agregar la nueva mascota y guardarlas nuevamente
        mascotas = JSON.parse(localStorage.getItem('mascotas')) || [];
        mascotas.push(mascota);
        console.log("soy funcion 1")
        console.log(mascotas);
        localStorage.setItem('mascotas', JSON.stringify(mascotas));

       // limpiarFormulario();
    } else {
        alert('Por favor, completa todos los campos.');
    }
}

// Función para limpiar el formulario
function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('especie').value = '';
    document.getElementById('raza').value = '';
    document.getElementById('color').value = '';
    document.getElementById('edad').value = '';
    document.getElementById('sexo').value = 'Macho';
    document.getElementById('ubicacion').value = '';
    document.getElementById('contactoNombre').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('email').value = '';
    document.getElementById('imagen').value = '';
    document.getElementById('descripcion').value = '';
  
    }

    function mostrarImagen() {
        var imagen = document.getElementById("imagen").files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
          document.getElementById("imagenMostrada").src = e.target.result;
          document.getElementById("imagenMostrada").style.display = "block";
          document.querySelector("label[for='imagen']").style.display = "none";
        };
        reader.readAsDataURL(imagen);
      }