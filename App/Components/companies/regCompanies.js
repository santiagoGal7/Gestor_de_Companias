import { postCompany, patchCompany, deleteCompany, getCompanyById } from '../../../Apis/companies/companiesApi.js';
import { getAllCities } from '../../../Apis/cities/citiesApi.js';
import CompaniesModel from '../../../Models/companiesModel.js';

export class RegCompanies extends HTMLElement {
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
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/companies/companiesStyle.css";
      </style>
      <div class="card mt-3">
        <div class="card-header">
          Registro de Empresas <span class="badge rounded-pill text-bg-primary" id="idView"></span>
        </div>
        <div class="card-body">
          <form id="frmDataCompany">
            <div class="row">
              <div class="col">
                <label for="name" class="form-label">Nombre Empresa</label>
                <input type="text" class="form-control" id="name" name="name">
              </div>
              <div class="col">
                <label for="UKNiU" class="form-label">UKNiU</label>
                <input type="text" class="form-control" id="UKNiU" name="UKNiU">
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label for="address" class="form-label">Dirección</label>
                <input type="text" class="form-control" id="address" name="address">
              </div>
              <div class="col">
                <label for="CityId" class="form-label">Ciudad</label>
                <select class="form-control" id="CityId" name="CityId"></select>
              </div>
              <div class="col">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" name="email">
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

  addEventListeners() {
    this.addEventListener('editCompany', async (e) => {
      const company = await getCompanyById(e.detail.id);
      if (company) {
        const frmRegistro = this.querySelector('#frmDataCompany');
        frmRegistro.elements['name'].value = company.name;
        frmRegistro.elements['UKNiU'].value = company.UKNiU;
        frmRegistro.elements['address'].value = company.address;
        frmRegistro.elements['CityId'].value = company.CityId;
        frmRegistro.elements['email'].value = company.email;
        this.querySelector('#idView').innerHTML = company.id;
        this.disableFrm(false);
        this.ctrlBtn('[["#btnEditar","#btnCancelar","#btnEliminar"],["#btnNuevo","#btnGuardar"]]');
      }
    });
    this.addEventListener('deleteCompany', (e) => {
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
    const frmRegistro = this.querySelector('#frmDataCompany');
    const datos = Object.fromEntries(new FormData(frmRegistro).entries());
    const idView = this.querySelector('#idView');
    let id = idView.textContent;
    patchCompany(datos, id)
      .then(responseData => {
        alert('Empresa actualizada con éxito');
      })
      .catch(error => {
        alert('Error al actualizar la empresa');
      });
  }

  delData = () => {
    const idView = this.querySelector('#idView');
    let id = idView.textContent;
    deleteCompany(id)
      .then(() => {
        alert('Empresa eliminada con éxito');
        this.resetIdView();
        this.disableFrm(true);
        this.ctrlBtn('[["#btnNuevo"],["#btnGuardar","#btnEditar","#btnEliminar","#btnCancelar"]]');
      })
      .catch(error => {
        alert('Error al eliminar la empresa');
      });   
  }

  saveData = () => {
    const frmRegistro = this.querySelector('#frmDataCompany');
    this.querySelector('#btnGuardar').addEventListener("click", (e) => {
      const datos = Object.fromEntries(new FormData(frmRegistro).entries());
      if (!datos.CityId) {
        alert('Seleccione una ciudad');
        return;
      }
      postCompany(datos)
        .then(responseData => {
          alert('Empresa guardada con éxito');
          this.viewData(responseData.id);
        })
        .catch(error => {
          alert('Error al guardar la empresa');
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
    const frmRegistro = this.querySelector('#frmDataCompany');
    Object.keys(CompaniesModel).forEach(key => {
      frmRegistro.elements[key].value = CompaniesModel[key];
      frmRegistro.elements[key].disabled = estado;
    });
  }
}

customElements.define("reg-companies", RegCompanies);