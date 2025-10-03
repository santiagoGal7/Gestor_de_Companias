import './regBranches.js';
import './lstBranches.js';

export class BranchesComponent extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/branches/branchesStyle.css";
      </style>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active mnuBranch" aria-current="page" href="#" data-verocultar='["#regBranch",["#lstBranch"]]'>Registrar Sucursal</a>
        </li>
        <li class="nav-item">
          <a class="nav-link mnuBranch" href="#" data-verocultar='["#lstBranch",["#regBranch"]]'>Listado de Sucursales</a>
        </li>
      </ul>
      <div class="container" id="regBranch" style="display:block;">
        <reg-branches></reg-branches>
      </div>
      <div class="container" id="lstBranch" style="display:none;">
        <lst-branches></lst-branches>
      </div>    
    `;
    this.querySelectorAll(".mnuBranch").forEach((val) => {
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

customElements.define("branches-component", BranchesComponent);