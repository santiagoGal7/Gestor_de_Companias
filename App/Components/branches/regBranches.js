import { postBranch, patchBranch, deleteBranch, getBranchById } from '../../../Apis/branches/branchesApi.js';
import { getAllCities } from '../../../Apis/cities/citiesApi.js';
import { getAllCompanies } from '../../../Apis/companies/companiesApi.js';
import BranchesModel from '../../../Models/branchesModel.js';

export class RegBranches extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.saveData();
    this.enabledBtns();
    this.eventoEditar();
    this.eventoEliminar();
    this.disableFrm(true);
    this.addEventListeners();
    this.loadCities();
    this.loadCompanies();
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/branches/branchesStyle.css";
      </style>
      <div class="card mt-3">
        <div class="card-header">
          Registro de Sucursales <span class="badge rounded-pill text-bg-primary" id="idView"></span>
        </div>
        <div class="card-body">
          <form id="frmDataBranch">
            <div class="row">
              <div class="col">
                <label for="number_commercial" class="form-label">Número Comercial</label>
                <input type="text" class="form-control" id="number_commercial" name="number_commercial">
              </div>
              <div class="col">
                <label for="address" class="form-label">Dirección</label>
                <input type="text" class="form-control" id="address" name="address">
              </div>
              <div class="col">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" name="email">
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label for="contact_name" class="form-label">Nombre Contacto</label>
                <input type="text" class="form-control" id="contact_name" name="contact_name">
              </div>
              <div class="col">
                <label for="phone" class="form-label">Teléfono</label>
                <input type="text" class="form-control" id="phone" name="phone">
              </div>
              <div class="col">
                <label for="CityId" class="form-label">Ciudad</label>
                <select class="form-control" id="CityId" name="CityId"></select>
              </div>
              <div class="col">
                <label for="CompanyId" class="form-label">Empresa</label>
                <select class="form-control" id="CompanyId" name="CompanyId"></select>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col">
                <div class="container mt-4 text-center">
                  <a href="#" class="btn btn-primary" id="btnNuevo" data-ed='[["#btnGuardar","#btnCancelar"],["#btnNuevo","#btnEditar","#btnEliminar"]]'>Nuevo</a>
                  <a href="#" class="btn btn-dark" id="btnCancelar" data-ed='[["#btnNuevo"],["#btnGuardar","#btnEditar","#btnEliminar","#btnCancelar"]]'>Cancelar</a>
                  <a href="#" class="btn btn-success" id="btnGuardar" data-ed='[["#btnEditar","#btnCancelar","#btnNuevo","#btnEliminar"],["#btnGuardar"]]'>Guardar</a>
                  <a href="#" class="btn btn-warning" id="btnEditar" data-ed='[[],[]]'>Editar</a>
                  <a href="#" class="btn btn-danger" id="btnEliminar" data-ed='[["#btnNuevo"],["#btnGuardar","#btnEditar","#btnEliminar","#btnCancelar"]]'>Eliminar</a>
                </div>
              </div>
            </div> 
          </form>
        </div>
      </div>
    `;
    this.querySelector("#btnNuevo").addEventListener("click", (e) => {
      this.ctrlBtn(e.target.dataset.ed);
      this.resetIdView();
      this.disableFrm(false);
      e.preventDefault();
    });
    this.querySelector("#btnCancelar").addEventListener("click", (e) => {
      this.ctrlBtn(e.target.dataset.ed);
      this.resetIdView();
      this.disableFrm(true);
      e.preventDefault();
    });
  }

  async loadCities() {
    const cities = await getAllCities();
    const select = this.querySelector('#CityId');
    select.innerHTML = '<option value="">Seleccione una ciudad</option>';
    cities.forEach(city => {
      select.innerHTML += `<option value="${city.id}">${city.name}</option>`;
    });
  }

  async loadCompanies() {
    const companies = await getAllCompanies();
    const select = this.querySelector('#CompanyId');
    select.innerHTML = '<option value="">Seleccione una empresa</option>';
    companies.forEach(company => {
      select.innerHTML += `<option value="${company.id}">${company.name}</option>`;
    });
  }

  addEventListeners() {
    this.addEventListener('editBranch', async (e) => {
      const branch = await getBranchById(e.detail.id);
      if (branch) {
        const frmRegistro = this.querySelector('#frmDataBranch');
        frmRegistro.elements['number_commercial'].value = branch.number_commercial;
        frmRegistro.elements['address'].value = branch.address;
        frmRegistro.elements['email'].value = branch.email;
        frmRegistro.elements['contact_name'].value = branch.contact_name;
        frmRegistro.elements['phone'].value = branch.phone;
        frmRegistro.elements['CityId'].value = branch.CityId;
        frmRegistro.elements['CompanyId'].value = branch.CompanyId;
        this.querySelector('#idView').innerHTML = branch.id;
        this.disableFrm(false);
        this.ctrlBtn('[["#btnEditar","#btnCancelar","#btnEliminar"],["#btnNuevo","#btnGuardar"]]');
      }
    });
    this.addEventListener('deleteBranch', (e) => {
      this.querySelector('#idView').innerHTML = e.detail.id;
      this.delData();
    });
  }

  resetIdView = () => {
    const idView = this.querySelector('#idView');
    idView.innerHTML = '';   
  }

  eventoEditar = () => {
    this.querySelector('#btnEditar').addEventListener("click", (e) => {
      this.editData();
      e.stopImmediatePropagation();
      e.preventDefault();        
    });
  }

  eventoEliminar = () => {
    this.querySelector('#btnEliminar').addEventListener("click", (e) => {
      this.delData();
      e.stopImmediatePropagation();
      e.preventDefault();        
    });
  }

  ctrlBtn = (e) => {
    let data = JSON.parse(e);
    data[0].forEach(boton => {
      let btnActual = this.querySelector(boton);
      if (btnActual) btnActual.classList.remove('disabled-btn');
    });
    data[1].forEach(boton => {
      let btnActual = this.querySelector(boton);
      if (btnActual) btnActual.classList.add('disabled-btn');
    });
  }

  enabledBtns = () => {
    this.querySelectorAll(".btn").forEach((val) => {
      this.ctrlBtn(val.dataset.ed);
    });
  }

  editData = () => {
    const frmRegistro = this.querySelector('#frmDataBranch');
    const datos = Object.fromEntries(new FormData(frmRegistro).entries());
    const idView = this.querySelector('#idView');
    let id = idView.textContent;
    patchBranch(datos, id)
      .then(responseData => {
        alert('Sucursal actualizada con éxito');
      })
      .catch(error => {
        alert('Error al actualizar la sucursal');
      });
  }

  delData = () => {
    const idView = this.querySelector('#idView');
    let id = idView.textContent;
    deleteBranch(id)
      .then(() => {
        alert('Sucursal eliminada con éxito');
        this.resetIdView();
        this.disableFrm(true);
        this.ctrlBtn('[["#btnNuevo"],["#btnGuardar","#btnEditar","#btnEliminar","#btnCancelar"]]');
      })
      .catch(error => {
        alert('Error al eliminar la sucursal');
      });   
  }

  saveData = () => {
    const frmRegistro = this.querySelector('#frmDataBranch');
    this.querySelector('#btnGuardar').addEventListener("click", (e) => {
      const datos = Object.fromEntries(new FormData(frmRegistro).entries());
      if (!datos.CityId || !datos.CompanyId) {
        alert('Seleccione una ciudad y una empresa');
        return;
      }
      postBranch(datos)
        .then(responseData => {
          alert('Sucursal guardada con éxito');
          this.viewData(responseData.id);
        })
        .catch(error => {
          alert('Error al guardar la sucursal');
        });
      this.ctrlBtn(e.target.dataset.ed);
      e.stopImmediatePropagation();
      e.preventDefault();
    });
  }

  viewData = (id) => {
    const idView = this.querySelector('#idView');
    idView.innerHTML = id;
  }

  disableFrm = (estado) => {
    const frmRegistro = this.querySelector('#frmDataBranch');
    Object.keys(BranchesModel).forEach(key => {
      frmRegistro.elements[key].value = BranchesModel[key];
      frmRegistro.elements[key].disabled = estado;
    });
  }
}

customElements.define("reg-branches", RegBranches);