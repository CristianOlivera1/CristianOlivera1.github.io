document.addEventListener("DOMContentLoaded", function() {
  const burger = document.querySelector(".burger");
  const sidebar = document.querySelector(".links");
  const links = document.querySelectorAll(".links li a");

  if (burger) {
    burger.addEventListener("click", toggleSidebar);
  }

  if (links.length > 0) {
    links.forEach(link => {
      link.addEventListener("click", toggleSidebar);
    });
  }

  function toggleSidebar() {
    sidebar.classList.toggle("show");

    // Cambiar el ícono de bars a times y viceversa
    const icon = burger.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  }
});

//Loader
document.addEventListener("DOMContentLoaded", function() {
  const loader = document.querySelector('.loader-container');
  const minimumLoadingTime = 3000; // tiempo en milisegundos-->3s
  let pageLoaded = false;

  // Verifica si la página ya se cargó completamente
  window.addEventListener("load", function() {
      pageLoaded = true;
  });

  if (loader) { // Verifica que el loader exista
      setTimeout(function() {
          if (pageLoaded) {
              loader.style.display = 'none';
          } else {
              window.addEventListener("load", function() {
                  loader.style.display = 'none';
              });
          }
      }, minimumLoadingTime);
  } else {
      console.warn('El elemento .loader-container no se encontró en el DOM.');
  }
});

//Sub MENU IA
document.addEventListener("DOMContentLoaded", function() {
  const modalContentia = document.querySelector('.modal-contentia');
  const aiModal2 = document.getElementById('aiModal');
  const abrirsubmenuIA = document.getElementById('abrirsubmenuIA');

  if (abrirsubmenuIA) {
      abrirsubmenuIA.addEventListener('click', () => {
          aiModal2.style.display = 'block';
          modalContentia.style.width = '80%'; 
          modalContentia.style.height = '80%'; 
      });
  } else {
      console.warn('El elemento con ID "abrirsubmenuIA" no se encontró en el DOM.');
  }
});
//Sub MENU IA; 

//abrir IA desde scroll abrirIaScroll
document.addEventListener("DOMContentLoaded", function() {
  const aiModal = document.getElementById('aiModal');
  const abrirIaScroll = document.getElementById('abrirIaScroll');
  const modalContentia2 = document.querySelector('.modal-contentia');
  if (abrirIaScroll) {
      abrirIaScroll.addEventListener('click', () => {
          aiModal.style.display = 'block';
          modalContentia2.style.width = '80%'; 
          modalContentia2.style.height = '80%'; 
      });
  } else {
      console.warn('El elemento con ID "abrirIaScroll" no se encontró en el DOM.');
  }
});
//abrir IA desde scroll

// abrir Editor Scroll desde main
document.addEventListener("DOMContentLoaded", function() {
  const abrirEditorScroll = document.getElementById('abrirEditorScroll');
  const nombreProyectoModal = document.getElementById('nombreProyectoModal');

  if (abrirEditorScroll) {
      abrirEditorScroll.addEventListener('click', function() {
          nombreProyectoModal.style.display = 'block';
      });
  } else {
      console.warn('El elemento con ID "abrirEditorScroll" no se encontró en el DOM.');
  }
});
// abrir Editor Scroll desde main
//Sub MENU editor
const updateIframe = () => {
  const iframeDoc = document.getElementById('resultFrame').contentDocument || document.getElementById('resultFrame').contentWindow.document;
  iframeDoc.open();
  iframeDoc.write(`
    <html>
    <head>
      <style>${document.getElementById('cssContent').innerText}</style>
    </head>
    <body>
      ${document.getElementById('htmlContent').innerText}
      <script>${document.getElementById('jsContent').innerText}</script>
    </body>
    </html>
  `);
  iframeDoc.close();
};

// Variables para controlar los modales
const nombreProyectoModal = document.getElementById('nombreProyectoModal');
// Variable para almacenar si el nombre del proyecto ya fue ingresado
let isNombreProyectoGuardado = false;
// Lógica para el botón independiente 'Codificar'
document.getElementById('abrirsubmenuCodificar').addEventListener('click', function() {

  if (!isNombreProyectoGuardado) {

    nombreProyectoModal.style.display = 'block';
  } else {
  
    abrirCodeModal(window.nombreProyecto);
  }
});

// Función para confirmar el nombre del proyecto
function confirmarNombreProyecto() {
  const nombreProyecto = document.getElementById('nombreProyecto').value.trim();

  // Si el campo está vacío, mostrar alerta y no continuar
  if (!nombreProyecto) {
    alert('Debes ingresar un nombre para el proyecto.');
    return;
  }

  // Guardar el nombre en una variable global y establecer el estado
  window.nombreProyecto = nombreProyecto;
  isNombreProyectoGuardado = true;

  nombreProyectoModal.style.display = 'none';

  abrirCodeModal(nombreProyecto);
}

// Evento para confirmar el nombre del proyecto con clic
document.getElementById('confirmarNombreProyecto').addEventListener('click', confirmarNombreProyecto);

// Evento para soportar la tecla "Enter" en el campo de texto
document.getElementById('nombreProyecto').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    confirmarNombreProyecto();
  }
});

// Evento para cancelar y cerrar el modal
document.getElementById('cancelarNombreProyecto').addEventListener('click', function() {
  nombreProyectoModal.style.display = 'none';
});

// Función para abrir el codeModal
function abrirCodeModal(nombreProyecto) {
  // Contenido que se mostrará manualmente en el modal
  const manualHtmlContent = `&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;${nombreProyecto}&lt;/title&gt;
    &lt;link rel="stylesheet" href="style.css"&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;!-- EMPIEZA A CODIFICAR!--&gt;
     &lt;p&gt;Este es un párrafo de ejemplo que puedes editar.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;
  `;
  const manualCssContent = `/* Estilos CSS aquí */
body {
  background-color: #f8f9fa; 
  color: #333;
}
p {
  font-size: 20px;
}
  `;
  const manualJsContent = `// Escribe aquí tu código JavaScript manualmente
console.log('Hola desde JavaScript');
  `;

  // Asignar el contenido manual a los bloques de código del modal
  document.getElementById('htmlContent').innerHTML = `<pre class="line-numbers"><code class="language-html">${manualHtmlContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
  document.getElementById('cssContent').innerHTML = `<pre class="line-numbers"><code class="language-css">${manualCssContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
  document.getElementById('jsContent').innerHTML = `<pre class="line-numbers"><code class="language-javascript">${manualJsContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;

  // Actualizar el nombre del proyecto en las secciones
  document.getElementById('nombreProyectoHtml').textContent = nombreProyecto + '.html';
  document.getElementById('nombreProyectoCss').textContent = nombreProyecto + '.css';
  document.getElementById('nombreProyectoJs').textContent = nombreProyecto + '.js';

  // Resaltar la sintaxis
  Prism.highlightAll();

  // Mostrar el modal
  openModal();

  // Inicializar el iframe con el contenido manual
  updateIframe();

  // Agregar evento para actualizar el iframe y guardar en localStorage cuando se edite el contenido
  document.querySelectorAll('[contenteditable="true"]').forEach(codeBlock => {
    codeBlock.addEventListener('input', function() {
      updateIframe();
    });
  });
}

//Sub MENU editor

//thema
const toggle = document.getElementById('btn');
toggle.addEventListener('change', () => {
  document.body.classList.toggle('light-theme', toggle.checked);
});
//thema

//particulas en el fondo
particlesJS.load('particles-js', 'particlesjs-config.json', function() {
  console.log('Partículas cargadas');
});

const particlesContainer = document.getElementById('particles-js');
const aboutSection = document.querySelector('.about');

window.addEventListener('scroll', () => {
  const aboutRect = aboutSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Verifica si la sección 'about' está visible en la ventana
  if (aboutRect.top < windowHeight && aboutRect.bottom > 0) {
    particlesContainer.classList.add('hidden'); // Oculta las partículas
  } else {
    particlesContainer.classList.remove('hidden'); // Muestra las partículas
  }
});
//particulas en el fondo

document.querySelectorAll(".rating").forEach((ratingEl) => {
    const starsEl = ratingEl.querySelectorAll(".fa-star");
    
    // Inicializar el rating
    updateRating(starsEl, 0);

    // Añadir eventos a cada estrella
    starsEl.forEach((starEl, index) => {
        // Evento click/touchstart para marcar las estrellas
        starEl.addEventListener("click", () => updateRating(starsEl, index));
        starEl.addEventListener("touchstart", () => updateRating(starsEl, index), { passive: true });

        // Evento hover/touchstart para mostrar las estrellas en hover/touch de izquierda a derecha
        starEl.addEventListener("mouseover", () => updateHover(starsEl, index));
        starEl.addEventListener("touchstart", () => updateHover(starsEl, index), { passive: true });

        // Eliminar el efecto hover cuando el mouse sale o se retira el dedo
        starEl.addEventListener("mouseout", () => removeHover(starsEl));
        starEl.addEventListener("touchend", () => removeHover(starsEl), { passive: true });
    });
});

// Función para actualizar las estrellas activadas al hacer clic o tocar
function updateRating(starsEl, index) {
    starsEl.forEach((starEl, idx) => {
        if (idx <= index) {
            starEl.classList.add("active");
        } else {
            starEl.classList.remove("active");
        }
    });
}

// Función para aplicar el hover o toque solo a las estrellas no activadas
function updateHover(starsEl, index) {
    starsEl.forEach((starEl, idx) => {
        if (!starEl.classList.contains("active") && idx <= index) {
            starEl.classList.add("hovered");
        }
    });
}

// Función para eliminar el hover cuando el mouse o toque termina
function removeHover(starsEl) {
    starsEl.forEach(starEl => {
        starEl.classList.remove("hovered");
    });
}
//automatizar tooltip para todos
document.querySelectorAll('.btns a').forEach(btn => {
    const iconClass = btn.querySelector('i').classList;
  
    if (iconClass.contains('logogit')) {
      btn.setAttribute('data-tooltip', 'GitHub');
    } else if (iconClass.contains('fa-code')) {
      btn.setAttribute('data-tooltip', 'Ver Código');
    }
  });

  //MODAL
  document.querySelectorAll('.btns a[data-tooltip="Ver Código"]').forEach(btn => {
    btn.addEventListener('click', function() {
      const projectName = this.closest('.project').querySelector('h1').innerText.replace(/\s/g, '%20');
  
      // Definir las rutas correctas para los archivos HTML, CSS y JS
      const htmlFile = `https://raw.githubusercontent.com/CristianOlivera1/Resources-dev/main/mini-proyectos/${projectName}/index.html`;
      const cssFile = `https://raw.githubusercontent.com/CristianOlivera1/Resources-dev/main/mini-proyectos/${projectName}/style.css`;
      const jsFile = `https://raw.githubusercontent.com/CristianOlivera1/Resources-dev/main/mini-proyectos/${projectName}/script.js`;
  
      // Función para cargar y mostrar contenido solo si el archivo existe
      const fetchFile = (url) => {
        return fetch(url)
          .then(response => {
            if (!response.ok) {
              return null; // Retorna null en caso de 404
            }
            return response.text();
          })
          .catch(() => null); // Silenciar cualquier otro tipo de error
      };
  
      // Función para verificar si una imagen existe en la URL
      const imageExists = async (url) => {
        try {
          const response = await fetch(url);
          return response.ok;
        } catch {
          return false;
        }
      };
  
      // Cargar archivos y mostrar en el modal
      Promise.all([
        fetchFile(htmlFile),
        fetchFile(cssFile),
        fetchFile(jsFile)
      ]).then(async ([htmlContent, cssContent, jsContent]) => {
  
        document.getElementById('htmlContent').innerHTML = htmlContent ?
          `<pre class="line-numbers"><code class="language-html">${htmlContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>` :
          `<pre class="line-numbers"><code class="language-html">&lt;!-- Este proyecto no contiene HTML --&gt;</code></pre>`; // Comentario en HTML
  
        document.getElementById('cssContent').innerHTML = cssContent ?
          `<pre class="line-numbers"><code class="language-css">${cssContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>` :
          `<pre class="line-numbers"><code class="language-css">/* Este proyecto no contiene CSS */</code></pre>`; // Comentario en CSS
  
        document.getElementById('jsContent').innerHTML = jsContent ?
          `<pre class="line-numbers"><code class="language-javascript">${jsContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>` :
          `<pre class="line-numbers"><code class="language-javascript">// Este proyecto no contiene JavaScript</code></pre>`; // Comentario en JS
  
        // Resaltar la sintaxis de todos los bloques de código
        Prism.highlightAll();
        openModal();
  
        const updateIframe2 = async () => {
          const iframeDoc = document.getElementById('resultFrame').contentDocument || document.getElementById('resultFrame').contentWindow.document;
          let updatedHtmlContent = document.getElementById('htmlContent').innerText;
  
          // Crear un elemento div temporal para analizar el HTML
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = updatedHtmlContent;
  
          // Buscar todas las imágenes y actualizar sus rutas relativas
          for (const img of tempDiv.querySelectorAll('img')) {
            let originalSrc = img.getAttribute('src');
            if (originalSrc && !originalSrc.startsWith('http')) {
              // Intentar encontrar la imagen en la raíz del proyecto
              const imgRootUrl = `https://raw.githubusercontent.com/CristianOlivera1/Resources-dev/main/mini-proyectos/${projectName}/${originalSrc}`;
              if (await imageExists(imgRootUrl)) {
                img.setAttribute('src', imgRootUrl);
              } else {
                // Intentar encontrar la imagen en la carpeta "imagenes" del proyecto
                const imgFolderUrl = `https://raw.githubusercontent.com/CristianOlivera1/Resources-dev/main/mini-proyectos/${projectName}/imagenes/${originalSrc}`;
                if (await imageExists(imgFolderUrl)) {
                  img.setAttribute('src', imgFolderUrl);
                }
              }
            }
          }
  
          // Obtener el HTML actualizado con las rutas absolutas para las imágenes
          updatedHtmlContent = tempDiv.innerHTML;
  
          iframeDoc.open();
          iframeDoc.write(`
            <html>
            <head>
              <style>${document.getElementById('cssContent').innerText}</style>
            </head>
            <body>
              ${updatedHtmlContent}
              <script>${document.getElementById('jsContent').innerText}</script>
            </body>
            </html>
          `);
          iframeDoc.close();
        };
  
        // Agregar evento para actualizar el iframe al cambiar el contenido editable
        document.querySelectorAll('[contenteditable="true"]').forEach(codeBlock => {
          codeBlock.addEventListener('input', updateIframe2); // Llama a la función de actualización
        });
  
        // Inicializar el iframe al abrir el modal
        await updateIframe2();
      });
    });
  });
  

// Iniciar el estado de "Resultado" como activo
let isResultActive = true;
// Cambiar entre pestañas (HTML, CSS, JS, Resultado)
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', function() {
    const tab = this.getAttribute('data-tab');
    
    if (tab === 'result') {
      toggleResult();
    } else {
      showTab(tab); // Cambiar entre HTML, CSS, y JS
    }
  });
});

// Función para alternar la visibilidad del iframe de resultado
function toggleResult() {
  // Alternar el estado activo/inactivo
  isResultActive = !isResultActive;

  // Actualizar la visibilidad del iframe según el estado de "Resultado"
  if (isResultActive) {
    document.getElementById('result').style.display = 'block'; // Mostrar el iframe
    document.querySelector('.tab-button[data-tab="result"]').classList.add('active'); // Marcar el botón como activo
       // Eliminar la clase 'expanded' de las secciones de código cuando "Resultado" está activo
       document.querySelectorAll('.code-section').forEach(section => {
        section.classList.remove('expanded');
      });
  } else {
    document.getElementById('result').style.display = 'none'; // Ocultar el iframe
    document.querySelector('.tab-button[data-tab="result"]').classList.remove('active'); // Marcar el botón como inactivo
    document.querySelectorAll('.code-section').forEach(section => {
      section.classList.add('expanded');
    });
  
  }
}

// Función para cambiar entre las pestañas de HTML, CSS, JS
function showTab(tab) {
  // Ocultar todas las secciones de código (HTML, CSS, JS)
  document.querySelectorAll('.code-section').forEach(section => {
    section.style.display = 'none';
  });

  // Quitar la clase 'active' de todos los botones de pestaña excepto "Resultado"
  document.querySelectorAll('.tab-button').forEach(button => {
    if (button.getAttribute('data-tab') !== 'result') {
      button.classList.remove('active');
    }
  });

  // Mostrar la sección de código seleccionada (HTML, CSS o JS)
  document.getElementById(tab).style.display = 'block';

  // Verificar si el "Resultado" está activo, solo mostrar el iframe si es así
  if (isResultActive) {
    document.getElementById('result').style.display = 'block'; // Mantener visible el iframe solo si "Resultado" está activo
  } else {
    document.getElementById('result').style.display = 'none'; // Ocultar el iframe si "Resultado" está inactivo
  }

  // Activar la pestaña seleccionada (HTML, CSS, o JS)
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
}

function openModal() {
  const modal = document.getElementById('codeModal');
   // Forzar que el resultado siempre esté activo al abrir el modal
   isResultActive = true;
   document.getElementById('result').style.display = 'block'; // Mostrar el iframe siempre
   
   // Eliminar la clase 'expanded' de las secciones de código ya que el resultado está activo
   document.querySelectorAll('.code-section').forEach(section => {
     section.classList.remove('expanded');
   });
 
  modal.style.display = 'block';
  // Restablecer el estado de las pestañas
  resetMenuStates();
}

// Función para restablecer los estados de las pestañas
function resetMenuStates() {
  const modal = document.getElementById('codeModal');

  // Quitar la clase 'active' de todos los botones
  modal.querySelectorAll('.tab-button').forEach(button => {
    button.classList.remove('active');
  });

  // Activar las pestañas de HTML y Resultado
  modal.querySelector('.tab-button[data-tab="html-code"]').classList.add('active');
  modal.querySelector('.tab-button[data-tab="result"]').classList.add('active');

  // Ocultar todas las secciones de código
  modal.querySelectorAll('.code-section').forEach(section => {
    section.style.display = 'none';
  });

  // Mostrar solo las secciones de HTML y Resultado
  modal.querySelector('#html-code').style.display = 'block';
  modal.querySelector('#result').style.display = 'block'; // Mantener resultado visible
}
    //boton copiar
// Función para copiar texto al portapapeles
function copyCode(contentId, buttonId) {
  const codeContent = document.getElementById(contentId).innerText;
  const copyButton = document.getElementById(buttonId);

  // Copiar al portapapeles
  navigator.clipboard.writeText(codeContent).then(() => {
    // Cambiar el botón a "Copiado" con el ícono de check
    copyButton.innerHTML = '<i class="fa fa-check"></i> ¡Copiado!';
    copyButton.classList.add('copied');

    // Restaurar después de 3 segundos
    setTimeout(() => {
      copyButton.innerHTML = '<i class="fa fa-copy"></i> Copiar código';
      copyButton.classList.remove('copied');
    }, 3000);
  });
}
// Asignar el evento de clic a los botones
document.getElementById('copy-html').addEventListener('click', () => copyCode('htmlContent', 'copy-html'));
document.getElementById('copy-css').addEventListener('click', () => copyCode('cssContent', 'copy-css'));
document.getElementById('copy-js').addEventListener('click', () => copyCode('jsContent', 'copy-js'));
      //boton copiar

      //boton exportar
      document.getElementById('exportProject').addEventListener('click', function() {
        // Crear un nuevo archivo ZIP
        var zip = new JSZip();
        
        // Agregar archivos al ZIP
        zip.file("index.html", document.getElementById('htmlContent').innerText);
        zip.file("style.css", document.getElementById('cssContent').innerText);
        zip.file("script.js", document.getElementById('jsContent').innerText);
        
       
        // Generar el archivo ZIP y ofrecerlo como descarga
        zip.generateAsync({ type: "blob" }).then(function(content) {
          saveAs(content, nombreProyecto + ".zip");
        });
      });
      //boton exportar

      //prevenir cierres inesperados al modificar codigo y alternar entre modales
                let isEdited = false; // Variable para detectar cambios

                // Función para manejar el cierre de un modal con advertencia de cambios no guardados
                function handleCloseModal(modalId) {
                  if (isEdited) {
                    const confirmClose = confirm('Es posible que los cambios que implementaste no se puedan guardar. ¿Seguro que deseas cerrar el modal?');
                    if (confirmClose) {
                      closeModal(modalId); // Cierra el modal si el usuario confirma
                      isEdited = false; // Reiniciar el indicador después de cerrar
                    }
                  } else {
                    closeModal(modalId); // Cierra el modal sin advertencia
                  }
                }
                
                // Cerrar modal con lógica de confirmación
                function closeModal(modalId) {
                  document.getElementById(modalId).style.display = 'none';
                  isEdited = false; // Resetear indicador de edición
                  if (modalId === 'aiModal') {
                    document.getElementById('aiButton').classList.remove('active-btnia'); // Quitar clase activa
                  }
                }
                        // Cerrar el modal de código
                document.getElementById('closeModal').addEventListener('click', () => {
                  handleCloseModal('codeModal'); // Usar la función de cierre
                  handleCloseModal('aiModal');
                });
                
                // Mostrar el modal de IA
                document.getElementById('aiButton').addEventListener('click', () => {
                  showModal('aiModal');
                  document.getElementById('aiButton').classList.add('active-btnia'); // Agregar clase activa
                });
                
                // Cerrar el modal de IA
                document.querySelector('.close-ai').addEventListener('click', () => {
                  handleCloseModal('aiModal'); // Usar la función de cierre
                });
                
                // Marcar como editado cuando se cambia algo en los editores de HTML, CSS o JS
                document.querySelectorAll('[contenteditable="true"]').forEach(editor => {
                  editor.addEventListener('input', () => {
                    isEdited = true; // Cambios detectados
                  });
                });
                
                // Mostrar alerta antes de salir de la página si hay cambios no guardados
                window.addEventListener('beforeunload', (event) => {
                  if (isEdited) {
                    const message = 'Es posible que los cambios que implementaste no se puedan guardar.';
                    event.returnValue = message; // Para navegadores modernos
                    return message;              // Para navegadores más antiguos
                  }
                });
                
        
                // Función para mostrar el modal seleccionado
                function showModal(modalId) {
                  // Obtener ambos modales
                  const codeModal = document.getElementById('codeModal');
                  const aiModal = document.getElementById('aiModal');
                
                  // Asegurarse de que ambos modales estén visibles
                  codeModal.style.display = 'block';
                  aiModal.style.display = 'block';
                
                  // Ajustar el z-index para que el modal activo esté por encima
                  if (modalId === 'aiModal') {
                    aiModal.style.zIndex = '1001';
                    codeModal.style.zIndex = '1000';
                  } else {
                    codeModal.style.zIndex = '1001';
                    aiModal.style.zIndex = '1000';
                  }
                }
                
                // Detectar clics fuera del modal de código
                window.addEventListener('click', (event) => {
                  const codeModal = document.getElementById('codeModal');
                  const aiModal = document.getElementById('aiModal');
                
                  // Verifica si el modal de código está visible
                  if (codeModal.style.display === 'block' && event.target === codeModal) {
                    if (aiModal.style.display === 'block') {
                      showModal('aiModal'); // Muestra el otro modal
                    }
                  }
                });
                
                // Detectar clics fuera del modal de IA
                window.addEventListener('click', (event) => {
                  const aiModal = document.getElementById('aiModal');
                  const codeModal = document.getElementById('codeModal');
                
                  // Verifica si el modal de IA está visible
                  if (aiModal.style.display === 'block' && event.target === aiModal) {
                    if (codeModal.style.display === 'block') {
                      showModal('codeModal'); // Muestra el otro modal
                    }
                  }
                });
                
                // Inicializar la función para manejar el cierre sin perder cambios
                function initModal() {
                  document.getElementById('codeModal').style.display = 'block';
                  isEdited = false; // Resetear el indicador cuando se reabre el modal
                }
   //prevenir cierres inesperados al modificar codigo y alternar entre modales
  //MODAL

//copiar para ia
  document.getElementById('copy-ai').addEventListener('click', () => {
    const content = document.getElementById('responseContent').innerText; // Obtiene el contenido de la respuesta
    navigator.clipboard.writeText(content) // Copia al portapapeles
    .then(() => {
      const copyButton = document.getElementById('copy-ai');

      // Cambiar el botón a "Copiado" con el ícono de check
      copyButton.innerHTML = '<i class="fa fa-check"></i> ¡Copiado!';
      copyButton.classList.add('copied');

      // Restaurar después de 3 segundos
      setTimeout(() => {
        copyButton.innerHTML = '<i class="fa fa-copy"></i> Copiar código';
        copyButton.classList.remove('copied');
      }, 3000);
    })
      .catch(err => {
        console.error('Error al copiar:', err);
      });
  });
//copiar para ia

  /*AI MODAL */
// Función para enviar la pregunta
async function enviarPregunta() {
  const pregunta = document.getElementById('aiQuestion').value.trim();

  if (pregunta === '') {
    alert('Por favor, escribe una pregunta antes de enviar.');
    return;
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "contents": [
      {
        "parts": [
          {
            "text": pregunta
          }
        ]
      }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyC_FoDtpb9JjXzHThqbDmJlD2mk_Hi2sKY`, requestOptions);
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API: ' + response.status);
    }

    const result = await response.json();
    console.log(result); // Verifica la respuesta en la consola

    // Verifica que la respuesta contenga candidatos válidos
    if (result && result.candidates && result.candidates.length > 0) {
      const respuesta = result.candidates[0].content.parts[0].text; // Acceso al texto de la respuesta
      document.getElementById('responseContent').innerText = respuesta; // Muestra la respuesta en el contenido
    } else {
      document.getElementById('responseContent').innerText = 'No se recibió ninguna respuesta válida.';
    }
  } catch (error) {
    console.error('Error al obtener la respuesta:', error);
    document.getElementById('responseContent').innerText = error.message || 'Ocurrió un error al obtener la respuesta.';
  }
}

// Evento para enviar la pregunta con clic
document.getElementById('sendQuestion').addEventListener('click', enviarPregunta);

// Evento para enviar la pregunta al presionar "Enter"
document.getElementById('aiQuestion').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    enviarPregunta();
  }
});
    /*AI MODAL */

// Función para hacer un modal arrastrable
function makeDraggable(modal) {
  const header = modal.querySelector('.modal-content, .modal-contentia'); 
  let isDragging = false; 
  let offsetX, offsetY; 

  // Función para comenzar el arrastre
  const startDrag = (e) => {
    let clientX, clientY;

    // Verifica si es un evento de toque o de ratón
    if (e.type === 'mousedown') {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (e.type === 'touchstart') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    // Verifica si el clic/tocar está dentro de las áreas no arrastrables
    if (e.target.closest('.code-section') || 
        e.target.closest('#aiQuestion') || 
        e.target.closest('#sendQuestion') || 
        e.target.closest('#aiResponse') ||
        e.target.closest('#copy-ai')) {
      return; // Si clicas o tocas dentro de estas secciones, no hagas nada.
    }

    isDragging = true; // Inicia el arrastre
    offsetX = clientX - modal.getBoundingClientRect().left;
    offsetY = clientY - modal.getBoundingClientRect().top;

    // Cambia el cursor al arrastrar (solo para el ratón)
    if (e.type === 'mousedown') {
      header.style.cursor = 'move';
    }
  };

  // Función para mover el modal
  const drag = (e) => {
    if (!isDragging) return;

    let clientX, clientY;

    if (e.type === 'mousemove') {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (e.type === 'touchmove') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    modal.style.left = `${clientX - offsetX}px`;
    modal.style.top = `${clientY - offsetY}px`;
  };

  // Función para detener el arrastre
  const stopDrag = () => {
    isDragging = false; 
    header.style.cursor = 'default'; 
  };

  // Eventos para dispositivos con mouse
  header.addEventListener('mousedown', startDrag);
  window.addEventListener('mousemove', drag);
  window.addEventListener('mouseup', stopDrag);

  // Eventos para dispositivos táctiles
  header.addEventListener('touchstart', startDrag);
  window.addEventListener('touchmove', drag);
  window.addEventListener('touchend', stopDrag);
}

// Selecciona los modales
const aiModal = document.getElementById('aiModal');
const codeModal = document.getElementById('codeModal');

// Aplica la funcionalidad de arrastre a los modales
makeDraggable(aiModal);
makeDraggable(codeModal);
// Función para hacer los modales arrastrables

//actualizar lineas de codigo
// LIMPIAR CÓDIGO
document.getElementById('clearButton').addEventListener('click', function() {
  const activeTab = document.querySelector('.tab-button.active'); // Selecciona la pestaña activa

  if (activeTab) {
    const activeTabName = activeTab.getAttribute('data-tab'); // Obtiene el nombre de la pestaña activa
    let contentArea;

    // Determina cuál área de contenido limpiar según la pestaña activa
    switch (activeTabName) {
      case 'html-code':
        contentArea = document.getElementById('htmlContent');
        contentArea.innerHTML = `<pre class="line-numbers"><code class="language-html" contenteditable="true">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Mi proyecto&lt;/title&gt;
    &lt;link rel="stylesheet" href="style.css"&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;!-- EMPIEZA A CODIFICAR!--&gt;
     &lt;p&gt;Este es un párrafo de ejemplo que puedes editar.&lt;/p&gt;
 
&lt;/body&gt;
&lt;/html&gt;</code></pre>`;
        Prism.highlightAll(); // Resalta la sintaxis después de limpiar
        break;

      case 'css-code':
        contentArea = document.getElementById('cssContent');
        contentArea.innerHTML = `<pre class="line-numbers"> <code class="language-css" contenteditable="true">/* Estilos CSS aquí */
body {
  background-color: #f8f9fa; 
  color: #333;
}
p{
  font-size:20px;
}
</code>
</pre>
        `; // Contenido inicial para CSS
        Prism.highlightAll(); // Resalta la sintaxis
        break;

      case 'js-code':
        contentArea = document.getElementById('jsContent');
        contentArea.innerHTML = `<pre class="line-numbers"><code class="language-javascript" contenteditable="true">// Escribe aquí tu código JavaScript manualmente
console.log('Hola desde JavaScript');</code></pre>`; // Contenido inicial para JS
        Prism.highlightAll(); // Resalta la sintaxis
        break;
    }

    // Actualiza el iframe después de limpiar el contenido
    updateIframe(); // Llama a la función para actualizar el iframe
  }
});
//LIMPIAR CODIGO

//descarga animado
document.querySelectorAll('.download-link').forEach(function(link) {
  link.addEventListener('click', function(event) {
    event.preventDefault(); // Evitar que se inicie la descarga inmediatamente

    const downloadIcon = this.querySelector('svg'); 
    const gifURL = 'images/check-animado-unscreen.gif'; 

    // Crear un elemento de imagen para el GIF
    const gifElement = document.createElement('img');
    gifElement.src = gifURL;

    // Ajustar el tamaño al que desees, por ejemplo, 32px x 32px
    gifElement.style.width = '17px'; 
    gifElement.style.height = '17px'; 
    gifElement.style.display = 'block';

    // Reemplazar el ícono SVG por el GIF
    downloadIcon.style.display = 'none'; // Ocultar el ícono
    this.appendChild(gifElement); // Añadir el GIF al enlace

    const gifDuration = 2500;

    // Después de que el GIF termine, restaurar el ícono y proceder con la descarga
    setTimeout(() => {
      // Eliminar el GIF
      gifElement.remove();
      
      // Mostrar nuevamente el ícono original
      downloadIcon.style.display = 'block';

      // Forzar la descarga usando el href del enlace original
      const tempLink = document.createElement('a');
      tempLink.href = this.href; // Usar la URL original del archivo ZIP desde el enlace que fue clickeado
      tempLink.download = ''; // Dejar que el navegador maneje el nombre de archivo
      document.body.appendChild(tempLink);
      tempLink.click(); 
      document.body.removeChild(tempLink); // Eliminar el enlace temporal del DOM

    }, gifDuration);
  });
});
//descarga animado

/*scrol infinito */
const scrollers = document.querySelectorAll(".scroller");

if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

function addAnimation() {
    scrollers.forEach(scroller => {
        scroller.setAttribute("data-animated", true);

        const scrollerInner = scroller.querySelector('.scroller__inner');
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach(item => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute('aria-hidden', true);
            scrollerInner.appendChild(duplicatedItem);
        });
    });
}
/*scrol infinito */