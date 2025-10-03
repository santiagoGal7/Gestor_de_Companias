import { getAllRegions } from '../../../Apis/regions/regionsApi.js';

export class LstRegions extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.loadData();
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/regions/regionsStyle.css";
      </style>
      <div class="card mt-3">
        <div class="card-header">
          Listado de Regiones
        </div>
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>País ID</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="regionList"></tbody>
          </table>
        </div>
      </div>     
    `;
  }

  async loadData() {
    const regions = await getAllRegions();
    const tbody = this.querySelector('#regionList');
    tbody.innerHTML = '';
    regions.forEach(region => {
      tbody.innerHTML += `
        <tr>
          <td>${region.id}</td>
          <td>${region.name}</td>
          <td>${region.CountryId}</td>
          <td>
            <a href="#" class="btn btn-warning edit-btn" data-id="${region.id}">Editar</a>
            <a href="#" class="btn btn-danger delete-btn" data-id="${region.id}">Eliminar</a>
          </td>
        </tr>
      `;
    });
    this.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        this.dispatchEvent(new CustomEvent('editRegion', { detail: { id }, bubbles: true }));
        e.preventDefault();
      });
    });
    this.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        this.dispatchEvent(new CustomEvent('deleteRegion', { detail: { id }, bubbles: true }));
        e.preventDefault();
      });
    });
  }
}

customElements.define("lst-regions", LstRegions);