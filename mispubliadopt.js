// Variable global para almacenar los datos de mascotas
let mascotasadoptadas = [];

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






// Función para cargar las mascotas desde el JSON y mostrarlas
function cargarMascotas() {
  const mascotasGuardadas = localStorage.getItem('mascotasadoptadas');
  console.log(mascotasGuardadas);
  if (mascotasGuardadas) {
    // Parsea las mascotas guardadas del localStorage
    const todasLasMascotas = JSON.parse(mascotasGuardadas);

    // Filtra las mascotas del usuario actual basándote en su id
    mascotasadoptadas = todasLasMascotas.filter(mascotasadoptadas => mascotasadoptadas.iduser === myinfo.id);

    // Muestra las mascotas del usuario actual
    mostrarMascotas();
  }
  }


// Función para mostrar la lista de mascotas
function mostrarMascotas() {
  const listaMascotas = document.getElementById('listaMascotas');
  listaMascotas.innerHTML = ''; // Limpia el contenido anterior

  mascotasadoptadas.forEach((mascotasadoptadas) => {
      const divMascota = document.createElement('div');
      divMascota.classList.add('mascota-container'); // Agrega la clase al div

      divMascota.innerHTML = `
          <div class="profile profile-imgonly">
          <div class="profile__image">
          <img src="${mascotasadoptadas.imagen}" alt="Imagen de la mascota">
          </div>
          <div class="profile__info">
          <h3>${mascotasadoptadas.nombre}</h3>
          </div>
          <div class="profile__cta"><a class="button" onclick="verDetalles(${mascotasadoptadas.id})">Details</a></div>
          </div>
      `;

      listaMascotas.appendChild(divMascota); // Agrega el div de la mascota directamente al contenedor
  });
}
// Función para eliminar una mascota
function eliminarMascota(index) {
  mascotasadoptadas.splice(index, 1);
  mostrarMascotas();
  guardarMascotas();
}
  function mostrarImagen() {
    const imagenInput = document.getElementById('imagen');
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
  }

  function verDetalles(id) {
    // Redirigir a la página de detalles de la mascota usando el ID
    window.location.href = `detallesmispubliadopt.html?id=${id}`;
  }
  cargarMascotas();