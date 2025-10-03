import { getAllCities } from '../../../Apis/cities/citiesApi.js';

export class LstCities extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.loadData();
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/cities/citiesStyle.css";
      </style>
      <div class="card mt-3">
        <div class="card-header">
          Listado de Ciudades
        </div>
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Región ID</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="cityList"></tbody>
          </table>
        </div>
      </div>     
    `;
  }

  async loadData() {
    const cities = await getAllCities();
    const tbody = this.querySelector('#cityList');
    tbody.innerHTML = '';
    cities.forEach(city => {
      tbody.innerHTML += `
        <tr>
          <td>${city.id}</td>
          <td>${city.name}</td>
          <td>${city.RegionId}</td>
          <td>
            <a href="#" class="btn btn-warning edit-btn" data-id="${city.id}">Editar</a>
            <a href="#" class="btn btn-danger delete-btn" data-id="${city.id}">Eliminar</a>
          </td>
        </tr>
      `;
    });
    this.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        this.dispatchEvent(new CustomEvent('editCity', { detail: { id }, bubbles: true }));
        e.preventDefault();
      });
    });
    this.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        this.dispatchEvent(new CustomEvent('deleteCity', { detail: { id }, bubbles: true }));
        e.preventDefault();
      });
    });
  }
}

customElements.define("lst-cities", LstCities);