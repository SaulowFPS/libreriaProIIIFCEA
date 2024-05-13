// Arreglo inicial de libros
var libros = [
  {
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    año: 1605,
    genero: "Novela",
    editorial: "Editorial Cervantes",
    paisEditorial: "España",
    ciudadEditorial: "Madrid",
    isbn: "9788424116636"
  },
  {
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    año: 1967,
    genero: "Realismo mágico",
    editorial: "Editorial Sudamericana",
    paisEditorial: "Colombia",
    ciudadEditorial: "Bogotá",
    isbn: "978-1400034686"
  },
  {
    titulo: "1984",
    autor: "George Orwell",
    año: 1949,
    genero: "Distopía",
    editorial: "Editorial Secker & Warburg",
    paisEditorial: "Reino Unido",
    ciudadEditorial: "Londres",
    isbn: "978-0451524935"
  },
  {
    titulo: "Moby Dick",
    autor: "Herman Melville",
    año: 1851,
    genero: "Aventura",
    editorial: "Editorial Harper & Brothers",
    paisEditorial: "Estados Unidos",
    ciudadEditorial: "Nueva York",
    isbn: "978-1539807556"
  },
  {
    titulo: "Ulises",
    autor: "James Joyce",
    año: 1922,
    genero: "Modernismo",
    editorial: "Editorial Shakespeare and Company",
    paisEditorial: "Francia",
    ciudadEditorial: "París",
    isbn: "978-0141182803"
  },
  {
    titulo: "En busca del tiempo perdido",
    autor: "Marcel Proust",
    año: 1913,
    genero: "Novela",
    editorial: "Editorial Grasset",
    paisEditorial: "Francia",
    ciudadEditorial: "París",
    isbn: "978-2070360421"
  },
  {
    titulo: "La Odisea",
    autor: "Homero",
    año: -800,
    genero: "Epopeya",
    editorial: "Editorial Penguin Classics",
    paisEditorial: "Grecia",
    ciudadEditorial: "Atenas",
    isbn: "978-0143039952"
  },
  {
    titulo: "Guerra y paz",
    autor: "León Tolstói",
    año: 1869,
    genero: "Novela histórica",
    editorial: "Editorial The Russian Messenger",
    paisEditorial: "Rusia",
    ciudadEditorial: "Moscú",
    isbn: "978-0140447934"
  },
  {
    titulo: "Hamlet",
    autor: "William Shakespeare",
    año: 1603,
    genero: "Tragedia",
    editorial: "Editorial Richard Field",
    paisEditorial: "Reino Unido",
    ciudadEditorial: "Londres",
    isbn: "978-0140714548"
  },
  {
    titulo: "La divina comedia",
    autor: "Dante Alighieri",
    año: 1320,
    genero: "Poesía épica",
    editorial: "Editorial Penguin Classics",
    paisEditorial: "Italia",
    ciudadEditorial: "Florencia",
    isbn: "978-0142437223"
  }
];


// Cargar libros desde localStorage al iniciar
document.addEventListener("DOMContentLoaded", function () {
  var librosAlmacenados = JSON.parse(localStorage.getItem('libros')) || [];
  libros = libros.concat(librosAlmacenados); // Combina los libros del array inicial con los almacenados

  // Verifica si el usuario está logueado
  var isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    window.location.href = "Login.html";
  } else {
    var loggedUser = localStorage.getItem("loggedUser");
    var loggedRole = localStorage.getItem("loggedRole");
    document.getElementById("loggedUser").textContent = loggedUser;
    document.getElementById("loggedRole").textContent = loggedRole;
  }

  // Inicialización de DataTable con botones ABM
  var tabla = $('#TablaLibros').DataTable({
    data: libros,
    columns: [
      { data: "titulo" },
      { data: "autor" },
      { data: "año" },
      { data: "genero" },
      { data: "editorial" },
      { data: "paisEditorial" },
      { data: "ciudadEditorial" },
      { data: "isbn" },
      // Columna de acciones con botones ABM usando iconos de Bootstrap 5
      {
        data: null,
        defaultContent: '',
        orderable: false,
        className: 'select-checkbox',
        targets: -1,
        render: function (data, type, row) {
          return `
            <button class="btn btn-primary btn-sm btn-agregar"><i class="bi bi-plus-circle"></i></button>
            <button class="btn btn-danger btn-sm btn-eliminar"><i class="bi bi-trash"></i></button>
            <button class="btn btn-success btn-sm btn-modificar"><i class="bi bi-pencil-square"></i></button>
          `;
        }
      }
    ],
    responsive: true, // Habilitar funcionalidad responsive
    columnDefs: [
      { targets: [4,5, 6, 7], visible: true } // Asegura que la columna de botones sea visible
    ],
    select: {
      style: 'os',
      selector: 'td:first-child'
    },
    order: [[1, 'asc']],
    language: {
      "decimal": "",
      "emptyTable": "No hay datos disponibles en la tabla",
      "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
      "infoEmpty": "Mostrando 0 to 0 of 0 entradas",
      "infoFiltered": "(Filtrado de _MAX_ entradas totales)",
      "infoPostFix": "",
      "thousands": ",",
      "lengthMenu": "Mostrar _MENU_ entradas",
      "loadingRecords": "Cargando...",
      "processing": "Procesando...",
      "search": "Buscar:",
      "zeroRecords": "No se encontraron registros coincidentes",
      "paginate": {
        "first": "Primero",
        "last": "Último",
        "next": "Siguiente",
        "previous": "Anterior"
      },
      "aria": {
        "sortAscending": ": activar para ordenar la columna ascendente",
        "sortDescending": ": activar para ordenar la columna descendente"
      }

    },
    dom: 'Bfrtip', // Agrega esta línea para definir los elementos del DOM que DataTables creará
    buttons: [
{
        extend: 'copy',
        text: '<img src="css/img/copia.png" alt="Copiar" />', // Ruta a tu imagen de copiar
        
      },
      {
        extend: 'excel',
        text: '<img src="css/img/excel.png" alt="Excel" />', // Ruta a tu imagen de Excel
     
      },
      {
        extend: 'pdf',
        text: '<img src="css/img/pdf.png" alt="PDF" />', // Ruta a tu imagen de PDF
       
      },
      {
        extend: 'csv',
        text: '<img src="css/img/csv.png" alt="CSV" />', // Ruta a tu imagen de CSV
       
      },
      {
        extend: 'print',
        text: '<img src="css/img/impresora.png" alt="Imprimir" />', // Ruta a tu imagen de imprimir

      }
    ]
  });
    // Ordena la tabla por la primera columna de forma ascendente

  $(window).on('resize', function () {
    $('#TablaLibros').DataTable().columns.adjust().responsive.recalc();
  });

  // Mostrar modal al hacer clic en "Agregar"
  $('#TablaLibros').on('click', '.btn-agregar', function () {
    $('#agregarLibroModal').modal('show');
  });

  // Función para manejar la adición de un nuevo libro
  $('#formAgregarLibro').on('submit', function (e) {
    e.preventDefault();

    // Obtener los valores del formulario
    var nuevoLibro = {
      titulo: $('#titulo').val(),
      autor: $('#autor').val(),
      año: $('#año').val(),
      genero: $('#genero').val(),
      editorial: $('#nomEditorial').val(),
      paisEditorial: $('#paisEditorial').val(),
      ciudadEditorial: $('#ciuEditorial').val(),
      isbn: $('#ismb').val()
    };

    // Guardar el nuevo libro en localStorage
    librosAlmacenados.push(nuevoLibro);
    localStorage.setItem('libros', JSON.stringify(librosAlmacenados));

    // Actualizar la tabla
    tabla.row.add(nuevoLibro).draw();

    // Ocultar el modal
    $('#agregarLibroModal').modal('hide');

    // Limpiar el formulario
    $('#formAgregarLibro')[0].reset();
  });
  // Manejador de evento para el botón "Eliminar" en la tabla
  $('#TablaLibros').on('click', '.btn-eliminar', function () {
    var fila = $(this).closest('tr'); // Obtener la fila que contiene el botón
    var datosFila = tabla.row(fila).data(); // Obtener los datos de la fila
    var indice = librosAlmacenados.findIndex(function (libro) {
      return libro.titulo === datosFila.titulo && libro.autor === datosFila.autor && libro.año === datosFila.año && libro.genero === datosFila.genero && libro.editorial === datosFila.editorial &&
        libro.paisEditorial === datosFila.paisEditorial &&
        libro.ciudadEditorial === datosFila.ciudadEditorial &&
        libro.isbn === datosFila.isbn
      ;
    });

    if (indice !== -1) {
      alertify.confirm(
        "Eliminar libro",
        "¿Estás seguro de que quieres eliminar este libro?",
        function () {
          // Eliminar el libro del arreglo y del localStorage
          librosAlmacenados.splice(indice, 1);
          localStorage.setItem('libros', JSON.stringify(librosAlmacenados));
          // Remover la fila de la tabla
          tabla.row(fila).remove().draw();
          alertify.success("Libro eliminado correctamente");
        },
        function () {
          alertify.error("Eliminación cancelada");
        }
      ).set("labels", { ok: "Sí", cancel: "No" });
    }
  });
  // Manejador de evento para el botón "Modificar" en la tabla
  $('#TablaLibros').on('click', '.btn-modificar', function () {
    var fila = $(this).closest('tr'); // Obtener la fila que contiene el botón
    var datosFila = tabla.row(fila).data(); // Obtener los datos de la fila
    var indice = librosAlmacenados.findIndex(function (libro) {
      return libro.titulo === datosFila.titulo && libro.autor === datosFila.autor && libro.año === datosFila.año && libro.genero === datosFila.genero && libro.editorial === datosFila.editorial &&
        libro.paisEditorial === datosFila.paisEditorial &&
        libro.ciudadEditorial === datosFila.ciudadEditorial &&
        libro.isbn === datosFila.isbn;
    });
  

    if (indice !== -1) {
    // Mostrar el modal de modificación con los datos del libro seleccionado
    $('#modificarLibroModal').modal('show');
    $('#tituloMod').val(datosFila.titulo);
    $('#autorMod').val(datosFila.autor);
    $('#añoMod').val(datosFila.año);
    $('#generoMod').val(datosFila.genero);
    $('#Editorialmod').val(datosFila.editorial);
    $('#paismod').val(datosFila.paisEditorial); // Asegúrate de que este identificador sea correcto
    $('#ciumod').val(datosFila.ciudadEditorial); // Asegúrate de que este identificador sea correcto
    $('#isbnmod').val(datosFila.isbn); // Asegúrate de que este identificador sea correcto



      // Manejar la modificación del libro
      $('#formModificarLibro').off('submit').on('submit', function (e) {
        e.preventDefault();

        // Obtener los nuevos valores del formulario
        var nuevoTitulo = $('#tituloMod').val();
        var nuevoAutor = $('#autorMod').val();
        var nuevoAño = $('#añoMod').val();
        var nuevoGenero = $('#generoMod').val();
        var nuevaEditorial = $('#Editorialmod').val();
        var nuevoPaisEditorial = $('#paismod').val();
        var nuevaCiudadEditorial = $('#ciumod').val();
        var nuevoIsbn = $('#isbnmod').val();

        // Actualizar los datos del libro en el arreglo y en localStorage
        librosAlmacenados[indice] = {
          titulo: nuevoTitulo,
          autor: nuevoAutor,
          año: nuevoAño,
          genero: nuevoGenero,
          editorial: nuevaEditorial,
          paisEditorial: nuevoPaisEditorial,
          ciudadEditorial: nuevaCiudadEditorial,
          isbn: nuevoIsbn
        };
        localStorage.setItem('libros', JSON.stringify(librosAlmacenados));

        // Actualizar la fila correspondiente en la tabla DataTable
        tabla.row(fila).data(librosAlmacenados[indice]).draw();

        // Ocultar el modal de modificación
        $('#modificarLibroModal').modal('hide');

        // Limpiar el formulario
        $('#formModificarLibro')[0].reset();
      });

    }
  });


});

// Manejador de evento para el enlace "Libros"
document.querySelector('.navbar-nav .nav-item:nth-child(2) a.nav-link').addEventListener('click', function (event) {
  event.preventDefault(); // Previene la acción por defecto del enlace

  var tablaLibrosContainer = document.getElementById('tablaLibrosContainer');
  // Muestra la tabla de libros
  tablaLibrosContainer.style.display = 'block';

  // Redibuja la tabla para ajustarla al contenedor visible
  $('#TablaLibros').DataTable().columns.adjust().draw();
});


// Función para confirmar el cierre de sesión
function confirmLogout() {
  alertify
    .confirm(
      "Cerrar Sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      function () {
        // Eliminar solo las claves de la sesión actual
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("loggedUser");
        localStorage.removeItem("loggedRole");
        window.location.href = "Login.html"; // Redirigir al formulario de inicio de sesión
      },
      function () {
        alertify.error("Cierre de sesión cancelado");
      }
    )
    .set("labels", { ok: "Sí", cancel: "No" });
}
