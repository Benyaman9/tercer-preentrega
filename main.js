const CLAVE_LOCALSTORAGE = "lista_tareas";

document.addEventListener("DOMContentLoaded", () => {
    // inicializar tareas desde localStorage o como un array vacío
    let tareas = JSON.parse(localStorage.getItem(CLAVE_LOCALSTORAGE)) || [];

    // referencias a elementos del DOM
    const $contenedorTareas = document.querySelector("#contenedorTareas"),
        $btnGuardarTarea = document.querySelector("#btnAgregarTarea"),
        $inputNuevaTarea = document.querySelector("#inputNuevaTarea");

    // función para guardar tareas en localStorage
    const guardarTareasEnAlmacenamiento = () => {
        localStorage.setItem(CLAVE_LOCALSTORAGE, JSON.stringify(tareas));
    };

    // función para refrescar la lista de tareas en el DOM
    const refrescarListaDeTareas = () => {
        $contenedorTareas.innerHTML = tareas.map((tarea, indice) => `
            <li>
                <input type="checkbox" ${tarea.terminada ? 'checked' : ''} 
                        onchange="toggleTarea(${indice})">
                <span class="${tarea.terminada ? 'tachado' : ''}">${tarea.tarea}</span>
                <a href="#" class="enlace-eliminar" onclick="eliminarTarea(${indice})">&times;</a>
            </li>
        `).join('');
    };

    // función para agregar una nueva tarea
    $btnGuardarTarea.onclick = () => {
        const tarea = $inputNuevaTarea.value.trim();
        if (tarea) {
            tareas.push({ tarea, terminada: false });
            $inputNuevaTarea.value = '';
            guardarTareasEnAlmacenamiento();
            refrescarListaDeTareas();
        }
    };

    // funciones para manipular tareas
    window.eliminarTarea = (indice) => {
        if (confirm("¿Eliminar tarea?")) {
            tareas.splice(indice, 1);
            guardarTareasEnAlmacenamiento();
            refrescarListaDeTareas();
        }
    };

    window.toggleTarea = (indice) => {
        tareas[indice].terminada = !tareas[indice].terminada;
        guardarTareasEnAlmacenamiento();
        refrescarListaDeTareas();
    };

    // inicializar la lista de tareas
    refrescarListaDeTareas();
});