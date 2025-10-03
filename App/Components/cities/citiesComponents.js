import './lstCities.js';
import './regCities.js';

export class CiudadComponent extends HTMLElement {
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
          <a class="nav-link active mnuciudad" href="#" data-view="reg">Registrar Ciudad</a>
        </li>
        <li class="nav-item">
          <a class="nav-link mnuciudad" href="#" data-view="list">Listado de Ciudades</a>
        </li>
      </ul>
      <div class="container" id="regCiudad" style="display:block;">
        <reg-ciudad></reg-ciudad>
      </div>
      <div class="container" id="lstCiudad" style="display:none;">
        <lst-ciudad></lst-ciudad>
      </div>    
    `;
    
    this.querySelectorAll(".mnuciudad").forEach((tab) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        
        const view = e.target.dataset.view;
        
        this.querySelectorAll(".mnuciudad").forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        
        if (view === 'reg') {
          document.querySelector('#regCiudad').style.display = 'block';
          document.querySelector('#lstCiudad').style.display = 'none';
        } else {
          document.querySelector('#regCiudad').style.display = 'none';
          document.querySelector('#lstCiudad').style.display = 'block';
          const lstComponent = document.querySelector('lst-ciudad');
          if (lstComponent) lstComponent.cargarCiudades();
        }
      });
    });
  }
}

customElements.define("ciudad-component", CiudadComponent);