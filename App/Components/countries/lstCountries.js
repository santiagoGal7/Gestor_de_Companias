import { getAllCountries } from '../../../Apis/countries/countriesApi.js';

export class LstCountries extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.loadData();
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/countries/countriesStyle.css";
      </style>
      <div class="card mt-3">
        <div class="card-header">
          Listado de Países
        </div>
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="countryList"></tbody>
          </table>
        </div>
      </div>     
    `;
  }

  async loadData() {
    const countries = await getAllCountries();
    const tbody = this.querySelector('#countryList');
    tbody.innerHTML = '';
    countries.forEach(country => {
      tbody.innerHTML += `
        <tr>
          <td>${country.id}</td>
          <td>${country.name}</td>
          <td>
            <a href="#" class="btn btn-warning edit-btn" data-id="${country.id}">Editar</a>
            <a href="#" class="btn btn-danger delete-btn" data-id="${country.id}">Eliminar</a>
          </td>
        </tr>
      `;
    });
    this.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        this.dispatchEvent(new CustomEvent('editCountry', { detail: { id }, bubbles: true }));
        e.preventDefault();
      });
    });
    this.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        this.dispatchEvent(new CustomEvent('deleteCountry', { detail: { id }, bubbles: true }));
        e.preventDefault();
      });
    });
  }
}

customElements.define("lst-countries", LstCountries);