import './regBranch.js';
import './lstBranch.js';

export class SucursalComponent extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
      <style>
        .nav-tabs .nav-link.active {
          background-color: #1859baff;
          color: white;
        }
      </style>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active mnusucursal" href="#" data-view="reg">Registrar Sucursal</a>
        </li>
        <li class="nav-item">
          <a class="nav-link mnusucursal" href="#" data-view="list">Listado de Sucursales</a>
        </li>
      </ul>
      <div class="container" id="regSucursal" style="display:block;">
        <reg-sucursal></reg-sucursal>
      </div>
      <div class="container" id="lstSucursal" style="display:none;">
        <lst-sucursal></lst-sucursal>
      </div>    
    `;
    
    this.querySelectorAll(".mnusucursal").forEach((tab) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        
        const view = e.target.dataset.view;
        
        this.querySelectorAll(".mnusucursal").forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        
        if (view === 'reg') {
          document.querySelector('#regSucursal').style.display = 'block';
          document.querySelector('#lstSucursal').style.display = 'none';
        } else {
          document.querySelector('#regSucursal').style.display = 'none';
          document.querySelector('#lstSucursal').style.display = 'block';
          const lstComponent = document.querySelector('lst-sucursal');
          if (lstComponent) lstComponent.cargarSucursales();
        }
      });
    });
  }
}

customElements.define("sucursal-component", SucursalComponent);