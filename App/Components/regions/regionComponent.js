import './regRegion.js';
import './lstRegion.js';

export class RegionComponent extends HTMLElement {
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
          <a class="nav-link active mnuregion" href="#" data-view="reg">Registrar Región</a>
        </li>
        <li class="nav-item">
          <a class="nav-link mnuregion" href="#" data-view="list">Listado de Regiones</a>
        </li>
      </ul>
      <div class="container" id="regRegion" style="display:block;">
        <reg-region></reg-region>
      </div>
      <div class="container" id="lstRegion" style="display:none;">
        <lst-region></lst-region>
      </div>    
    `;
    
    this.querySelectorAll(".mnuregion").forEach((tab) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        
        const view = e.target.dataset.view;
        
        this.querySelectorAll(".mnuregion").forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        
        if (view === 'reg') {
          document.querySelector('#regRegion').style.display = 'block';
          document.querySelector('#lstRegion').style.display = 'none';
        } else {
          document.querySelector('#regRegion').style.display = 'none';
          document.querySelector('#lstRegion').style.display = 'block';
          const lstComponent = document.querySelector('lst-region');
          if (lstComponent) lstComponent.cargarRegiones();
        }
      });
    });
  }
}

customElements.define("region-component", RegionComponent);