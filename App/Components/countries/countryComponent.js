import './regCountry.js';
import './lstCountries.js';

export class PaisComponent extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
      <style>
        .nav-tabs .nav-link.active {
          background-color: #0958ceff;
          color: white;
        }
      </style>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active mnupais" href="#" data-view="reg">Registrar País</a>
        </li>
        <li class="nav-item">
          <a class="nav-link mnupais" href="#" data-view="list">Listado de Países</a>
        </li>
      </ul>
      <div class="container" id="regPais" style="display:block;">
        <reg-pais></reg-pais>
      </div>
      <div class="container" id="lstPais" style="display:none;">
        <lst-pais></lst-pais>
      </div>    
    `;
    
    this.querySelectorAll(".mnupais").forEach((tab) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        
        const view = e.target.dataset.view;
        
        // Actualizar tabs activos
        this.querySelectorAll(".mnupais").forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        
        // Mostrar/ocultar vistas
        if (view === 'reg') {
          document.querySelector('#regPais').style.display = 'block';
          document.querySelector('#lstPais').style.display = 'none';
        } else {
          document.querySelector('#regPais').style.display = 'none';
          document.querySelector('#lstPais').style.display = 'block';
          // Recargar lista al cambiar a la vista
          const lstComponent = document.querySelector('lst-pais');
          if (lstComponent) lstComponent.cargarPaises();
        }
      });
    });
  }
}

customElements.define("pais-component", PaisComponent);