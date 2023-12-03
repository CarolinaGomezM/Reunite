document.addEventListener("DOMContentLoaded", function () {
    // Obtener el ID de la mascota de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
  
    // Buscar la mascota con el ID correspondiente en el arreglo 'mascotas'
    const mascota = mascotas.find((m) => m.id === parseInt(id));
  
    if (mascota) {
      // Crear elementos HTML para mostrar los detalles de la mascota, incluida la imagen
      const detallesMascota = document.getElementById("detallesMascota");
  
      const imagen = document.getElementById("imagenMostrada");
      imagen.src = mascota.imagen;
      imagen.alt = "Imagen de la mascota";
  
      const nombreRaza = document.createElement("p");
      nombreRaza.textContent = `Name: ${mascota.nombre}, Breed: ${mascota.raza}`;
  
      const especie = document.createElement("p");
      especie.textContent = `Specie: ${mascota.especie}`;
  
      const color = document.createElement("p");
      color.textContent = `Color: ${mascota.color}`;
  
      const edad = document.createElement("p");
      edad.textContent = `Age: ${mascota.edad} years`;
  
      const sexo = document.createElement("p");
      sexo.textContent = `Sex: ${mascota.sexo}`;
  
      const ubicacion = document.createElement("p");
      ubicacion.textContent = `Location: ${mascota.ubicacion}`;
  
      const contacto = document.createElement("p");
      contacto.textContent = `Contact: ${mascota.contacto.nombre}, Cellphone: ${mascota.contacto.telefono}, Email: ${mascota.contacto.email}`;
  
      const descripcion = document.createElement("p");
      descripcion.textContent = `Description: ${mascota.descripcion}`;
  
      // Agregar los elementos al contenedor en la página detalles.html
      div1.appendChild(imagen);
      div2.appendChild(nombreRaza);
      div2.appendChild(especie);
      div2.appendChild(color);
      div2.appendChild(edad);
      div2.appendChild(sexo);
      div2.appendChild(ubicacion);
      div2.appendChild(contacto);
      div2.appendChild(descripcion);

      var map = L.map('map').setView([0, 0], 14); // Establece la ubicación inicial y el nivel de zoom

      // Agrega un mapa base
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Agrega un marcador
      var marker = L.marker([0, 0]).addTo(map);

      // Función para mostrar la dirección en el mapa
    
  // Utiliza la API de geocodificación de OpenStreetMap
  fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + mascota.ubicacion)
      .then(response => response.json())
      .then(data => {
          if (data.length > 0) {
              var latlng = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
              marker.setLatLng(latlng);
              map.setView(latlng, 12); // Ajusta el mapa y el marcador a la ubicación
          } else {
              alert("We couldn't find your address direction.");
          }
      })
      .catch(error => {
          console.error("Error al geocodificar la dirección:", error);
          alert("Bad direction.");
     });
    } else {
      // Si no se encuentra la mascota con el ID proporcionado, mostrar un mensaje de error
      const detallesMascota = document.getElementById("detallesMascota");
      detallesMascota.textContent = "Pet not found.";
    }
  });



  