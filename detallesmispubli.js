document.addEventListener("DOMContentLoaded", function () {
    // Obtener el ID de la mascota de la URL
    
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
  
    // Buscar la mascota con el ID correspondiente en el arreglo 'mascotas'
    const mascota = mascotas.find((m) => m.id === parseInt(id));
          
            if (mascota) {
              // Crear elementos HTML para mostrar los detalles de la mascota, incluida la imagen

          
              const tiposDeDatos = {
                nombre: 'text',
                raza: 'text',
                especie: 'text',
                color: 'text',
                edad: 'number',
                sexo: 'text',
                ubicacion: 'text',
                contactoNombre: 'text',
                telefono: 'text',
                email: 'text',
                descripcion: 'text'
              };
          
              for (const propiedad in mascota) {
                if (mascota.hasOwnProperty(propiedad)) {
                  const valor = mascota[propiedad];
                  const tipoDeDato = tiposDeDatos[propiedad] || 'text';
          
                  if(propiedad.toLowerCase() === 'contacto'){
                    const label = document.createElement("label")
                    label.textContent = "Contacto"
                    div2.appendChild(label)
                    for(const info in valor){
                      const info_label = document.createElement('label')
                      info_label.textContent = info
                      div2.appendChild(info_label)

                      const input_info = document.createElement("input");
                      input_info.type = "text";
                      input_info.value = mascota['contacto'][info]
                      input_info.disabled = true;
                      if(info === "nombre"){
                        input_info.id = "contactoNombre"
                      } else{
                        input_info.id = info;
                      }
                      div2.appendChild(input_info)
                    }
                  } else{
                    const label = document.createElement("label");
                    label.textContent = propiedad.charAt(0).toUpperCase() + propiedad.slice(1); // Capitaliza el nombre de la propiedad
            
                    const input = document.createElement("input");
                    input.type = tipoDeDato;
                    input.value = valor;
                    input.disabled = true;
                    input.id = propiedad;
            
                    // Agregar el label y el input al contenedor en la página detalles.html
                    if(propiedad === "imagen"){
                      const image = document.createElement('img')
                      image.src = valor
                      image.id = "imagen"
                      div1.appendChild(image)

                      input.type = "file"
                      input.id = "imagenInput"
                      input.accept = "image/*"
                      console.log(input)
                      div1.appendChild(input)
                    } else{
                      div2.appendChild(label);
                      div2.appendChild(input);
                    }
                  }
                }
              }         

              var map = L.map('map').setView([0, 0], 14); // Establece la ubicación inicial y el nivel de zoom

      // Agrega un mapa base
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Agrega un marcador
      var marker = L.marker([0, 0]).addTo(map);

  fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + mascota.ubicacion)
      .then(response => response.json())
      .then(data => {
          if (data.length > 0) {
              var latlng = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
              marker.setLatLng(latlng);
              map.setView(latlng, 12); // Ajusta el mapa y el marcador a la ubicación
          } else {
              alert("No se pudo encontrar la dirección en el mapa.");
          }
      })
      .catch(error => {
          console.error("Error al geocodificar la dirección:", error);
          alert("Ocurrió un error al geocodificar la dirección.");
     });

    } else {
      // Si no se encuentra la mascota con el ID proporcionado, mostrar un mensaje de error
      const detallesMascota = document.getElementById("detallesMascota");
      detallesMascota.textContent = "Mascota no encontrada.";
    }

    
    document.getElementById("eliminar").addEventListener("click", function() {
      eliminarMascota(id);
  });

  function eliminarMascota(id) {
    const index = mascotas.findIndex(mascota => {
      if(mascota.id == id){
        return mascota
      }
    });

    if (index !== -1) {
        mascotas.splice(index, 1);
        guardarMascotas();
    }
}

document.getElementById("modificar_publicacion").addEventListener('click',() => {
  modificarPublicacion(id)
})

const btn_guardar_cambios = document.getElementById('btn_guardar_cambios')

btn_guardar_cambios.addEventListener('click',()=>{
  const index = mascotas.findIndex(mascota => {
    if(Number(mascota.id) == Number(id)){
      return mascota
    }
  });

  if (index !== -1) {
      mascotas.splice(index, 1);
  }

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
  const imagenInput = document.getElementById('imagen').src;
  const descripcion = document.getElementById('descripcion').value;

  console.log(imagenInput)

  if (nombre && especie && raza && color && !isNaN(edad) && ubicacion && contactoNombre && telefono && email && descripcion) {

    const mascota = {
        iduser: Number(document.getElementById('iduser').value),
        id: Number(document.getElementById('id').value),
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
        imagen: imagenInput,
        descripcion,
    };
    mascotas.push(mascota);
    localStorage.setItem('mascotas', JSON.stringify(mascotas));

} else {
    alert('Por favor, completa todos los campos.');
}

})

function modificarPublicacion(){
  let children = div2.children
  for(let i = 0; i < children.length; i++){
    if(children[i].tagName.toLowerCase() === "input"){
      if(i == 1 || i == 3){
        continue;
      } else{
        children[i].disabled = false
      }
    }
    imagenInput.addEventListener('change', mostrarImagen)
  }

  div1.children[1].disabled = false

  console.log(imagen)

  btn_guardar_cambios.hidden = false;
}

const mostrarImagen = function(event) {
  var imagen = document.getElementById("imagen");
  imagen.src = URL.createObjectURL(event.target.files[0])
}

});



  