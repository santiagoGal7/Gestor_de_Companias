import './regCountries.js';
import './lstCountries.js';

export class CountriesComponent extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/countries/countriesStyle.css";
      </style>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active mnuCountry" aria-current="page" href="#" data-verocultar='["#regCountry",["#lstCountry"]]'>Registrar País</a>
        </li>
        <li class="nav-item">
          <a class="nav-link mnuCountry" href="#" data-verocultar='["#lstCountry",["#regCountry"]]'>Listado de Países</a>
        </li>
      </ul>
      <div class="container" id="regCountry" style="display:block;">
        <reg-countries></reg-countries>
      </div>
      <div class="container" id="lstCountry" style="display:none;">
        <lst-countries></lst-countries>
      </div>    
    `;
    this.querySelectorAll(".mnuCountry").forEach((val) => {
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

customElements.define("countries-component", CountriesComponent);