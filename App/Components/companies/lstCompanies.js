import { getAllCompanies } from '../../../Apis/companies/companiesApi.js';

export class LstCompanies extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.loadData();
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/companies/companiesStyle.css";
      </style>
      <div class="card mt-3">
        <div class="card-header">
          Listado de Empresas
        </div>
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>UKNiU</th>
                <th>Dirección</th>
                <th>Ciudad ID</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="companyList"></tbody>
          </table>
        </div>
      </div>     
    `;
  }

  async loadData() {
    const companies = await getAllCompanies();
    const tbody = this.querySelector('#companyList');
    tbody.innerHTML = '';
    companies.forEach(company => {
      tbody.innerHTML += `
        <tr>
          <td>${company.id}</td>
          <td>${company.name}</td>
          <td>${company.UKNiU}</td>
          <td>${company.address}</td>
          <td>${company.CityId}</td>
          <td>${company.email}</td>
          <td>
            <a href="#" class="btn btn-warning edit-btn" data-id="${company.id}">Editar</a>
            <a href="#" class="btn btn-danger delete-btn" data-id="${company.id}">Eliminar</a>
          </td>
        </tr>
      `;
    });
    this.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        this.dispatchEvent(new CustomEvent('editCompany', { detail: { id }, bubbles: true }));
        e.preventDefault();
      });
    });
    this.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        this.dispatchEvent(new CustomEvent('deleteCompany', { detail: { id }, bubbles: true }));
        e.preventDefault();
      });
    });
  }
}

customElements.define("lst-companies", LstCompanies);