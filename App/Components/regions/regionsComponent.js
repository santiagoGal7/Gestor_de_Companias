import './regRegions.js';
import './lstRegions.js';

export class RegionsComponent extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/regions/regionsStyle.css";
      </style>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active mnuRegion" aria-current="page" href="#" data-verocultar='["#regRegion",["#lstRegion"]]'>Registrar Región</a>
        </li>
        <li class="nav-item">
          <a class="nav-link mnuRegion" href="#" data-verocultar='["#lstRegion",["#regRegion"]]'>Listado de Regiones</a>
        </li>
      </ul>
      <div class="container" id="regRegion" style="display:block;">
        <reg-regions></reg-regions>
      </div>
      <div class="container" id="lstRegion" style="display:none;">
        <lst-regions></lst-regions>
      </div>    
    `;
    this.querySelectorAll(".mnuRegion").forEach((val) => {
      val.addEventListener("click", (e) => {
        let data = JSON.parse(e.target.dataset.verocultar);
        let cardVer = document.querySelector(data[0]);
        cardVer.style.display = 'block';
        data[1].forEach(card => {
          let cardActual = document.querySelector(card);
          cardActual.style.display = 'none';
        });
        e.stopImmediatePropagation();
        e.preventDefault();
      });
    });
  }
}

customElements.define("regions-component", RegionsComponent);