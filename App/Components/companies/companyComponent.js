import './regCompanys.js';
import './lstCompany.js';

export class CompaniaComponent extends HTMLElement {
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
          <a class="nav-link active mnucompany" href="#" data-view="reg">Registrar Compañía</a>
        </li>
        <li class="nav-item">
          <a class="nav-link mnucompany" href="#" data-view="list">Listado de Compañías</a>
        </li>
      </ul>
      <div class="container" id="regCompanys" style="display:block;">
        <reg-compania></reg-compania>
      </div>
      <div class="container" id="lstCompany" style="display:none;">
        <lst-company></lst-company>
      </div>    
    `;
    
    this.querySelectorAll(".mnucompany").forEach((tab) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        
        const view = e.target.dataset.view;
        
        this.querySelectorAll(".mnucompany").forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        
        if (view === 'reg') {
          document.querySelector('#regCompanys').style.display = 'block';
          document.querySelector('#lstCompany').style.display = 'none';
        } else {
          document.querySelector('#regCompanys').style.display = 'none';
          document.querySelector('#lstCompany').style.display = 'block';
          const lstComponent = document.querySelector('lst-company');
          if (lstComponent) lstComponent.cargarCompania();
        }
      });
    });
  }
}

customElements.define("compania-component", CompaniaComponent);