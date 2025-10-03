import './regCities.js';
import './lstCities.js';

export class CitiesComponent extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/cities/citiesStyle.css";
      </style>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active mnuCity" aria-current="page" href="#" data-verocultar='["#regCity",["#lstCity"]]'>Registrar Ciudad</a>
        </li>
        <li class="nav-item">
          <a class="nav-link mnuCity" href="#" data-verocultar='["#lstCity",["#regCity"]]'>Listado de Ciudades</a>
        </li>
      </ul>
      <div class="container" id="regCity" style="display:block;">
        <reg-cities></reg-cities>
      </div>
      <div class="container" id="lstCity" style="display:none;">
        <lst-cities></lst-cities>
      </div>    
    `;
    this.querySelectorAll(".mnuCity").forEach((val) => {
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

customElements.define("cities-component", CitiesComponent);