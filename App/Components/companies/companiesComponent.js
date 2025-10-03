import './regCompanies.js';
import './lstCompanies.js';

export class CompaniesComponent extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/companies/companiesStyle.css";
      </style>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active mnuCompany" aria-current="page" href="#" data-verocultar='["#regCompany",["#lstCompany"]]'>Registrar Empresa</a>
        </li>
        <li class="nav-item">
          <a class="nav-link mnuCompany" href="#" data-verocultar='["#lstCompany",["#regCompany"]]'>Listado de Empresas</a>
        </li>
      </ul>
      <div class="container" id="regCompany" style="display:block;">
        <reg-companies></reg-companies>
      </div>
      <div class="container" id="lstCompany" style="display:none;">
        <lst-companies></lst-companies>
      </div>    
    `;
    this.querySelectorAll(".mnuCompany").forEach((val) => {
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

customElements.define("companies-component", CompaniesComponent);