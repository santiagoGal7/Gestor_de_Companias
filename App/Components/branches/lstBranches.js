import { getAllBranches } from '../../../Apis/branches/branchesApi.js';

export class LstBranches extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.loadData();
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/branches/branchesStyle.css";
      </style>
      <div class="card mt-3">
        <div class="card-header">
          Listado de Sucursales
        </div>
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Número Comercial</th>
                <th>Dirección</th>
                <th>Email</th>
                <th>Nombre Contacto</th>
                <th>Teléfono</th>
                <th>Ciudad ID</th>
                <th>Empresa ID</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="branchList"></tbody>
          </table>
        </div>
      </div>     
    `;
  }

  async loadData() {
    const branches = await getAllBranches();
    const tbody = this.querySelector('#branchList');
    tbody.innerHTML = '';
    branches.forEach(branch => {
      tbody.innerHTML += `
        <tr>
          <td>${branch.id}</td>
          <td>${branch.number_commercial}</td>
          <td>${branch.address}</td>
          <td>${branch.email}</td>
          <td>${branch.contact_name}</td>
          <td>${branch.phone}</td>
          <td>${branch.CityId}</td>
          <td>${branch.CompanyId}</td>
          <td>
            <a href="#" class="btn btn-warning edit-btn" data-id="${branch.id}">Editar</a>
            <a href="#" class="btn btn-danger delete-btn" data-id="${branch.id}">Eliminar</a>
          </td>
        </tr>
      `;
    });
    this.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        this.dispatchEvent(new CustomEvent('editBranch', { detail: { id }, bubbles: true }));
        e.preventDefault();
      });
    });
    this.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        this.dispatchEvent(new CustomEvent('deleteBranch', { detail: { id }, bubbles: true }));
        e.preventDefault();
      });
    });
  }
}

customElements.define("lst-branches", LstBranches);