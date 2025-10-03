import { postRegion, patchRegion, deleteRegion, getRegionById } from '../../../Apis/regions/regionsApi.js';
import { getAllCountries } from '../../../Apis/countries/countriesApi.js';
import RegionsModel from '../../../Models/regionsModel.js';

export class RegRegions extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.saveData();
    this.enabledBtns();
    this.eventoEditar();
    this.eventoEliminar();
    this.disableFrm(true);
    this.addEventListeners();
    this.loadCountries();
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/regions/regionsStyle.css";
      </style>
      <div class="card mt-3">
        <div class="card-header">
          Registro de Regiones <span class="badge rounded-pill text-bg-primary" id="idView"></span>
        </div>
        <div class="card-body">
          <form id="frmDataRegion">
            <div class="row">
              <div class="col">
                <label for="name" class="form-label">Nombre Región</label>
                <input type="text" class="form-control" id="name" name="name">
              </div>
              <div class="col">
                <label for="CountryId" class="form-label">País</label>
                <select class="form-control" id="CountryId" name="CountryId"></select>
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

  async loadCountries() {
    const countries = await getAllCountries();
    const select = this.querySelector('#CountryId');
    select.innerHTML = '<option value="">Seleccione un país</option>';
    countries.forEach(country => {
      select.innerHTML += `<option value="${country.id}">${country.name}</option>`;
    });
  }

  addEventListeners() {
    this.addEventListener('editRegion', async (e) => {
      const region = await getRegionById(e.detail.id);
      if (region) {
        const frmRegistro = this.querySelector('#frmDataRegion');
        frmRegistro.elements['name'].value = region.name;
        frmRegistro.elements['CountryId'].value = region.CountryId;
        this.querySelector('#idView').innerHTML = region.id;
        this.disableFrm(false);
        this.ctrlBtn('[["#btnEditar","#btnCancelar","#btnEliminar"],["#btnNuevo","#btnGuardar"]]');
      }
    });
    this.addEventListener('deleteRegion', (e) => {
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
    const frmRegistro = this.querySelector('#frmDataRegion');
    const datos = Object.fromEntries(new FormData(frmRegistro).entries());
    const idView = this.querySelector('#idView');
    let id = idView.textContent;
    patchRegion(datos, id)
      .then(responseData => {
        alert('Región actualizada con éxito');
      })
      .catch(error => {
        alert('Error al actualizar la región');
      });
  }

  delData = () => {
    const idView = this.querySelector('#idView');
    let id = idView.textContent;
    deleteRegion(id)
      .then(() => {
        alert('Región eliminada con éxito');
        this.resetIdView();
        this.disableFrm(true);
        this.ctrlBtn('[["#btnNuevo"],["#btnGuardar","#btnEditar","#btnEliminar","#btnCancelar"]]');
      })
      .catch(error => {
        alert('Error al eliminar la región');
      });   
  }

  saveData = () => {
    const frmRegistro = this.querySelector('#frmDataRegion');
    this.querySelector('#btnGuardar').addEventListener("click", (e) => {
      const datos = Object.fromEntries(new FormData(frmRegistro).entries());
      if (!datos.CountryId) {
        alert('Seleccione un país');
        return;
      }
      postRegion(datos)
        .then(responseData => {
          alert('Región guardada con éxito');
          this.viewData(responseData.id);
        })
        .catch(error => {
          alert('Error al guardar la región');
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
    const frmRegistro = this.querySelector('#frmDataRegion');
    Object.keys(RegionsModel).forEach(key => {
      frmRegistro.elements[key].value = RegionsModel[key];
      frmRegistro.elements[key].disabled = estado;
    });
  }
}

customElements.define("reg-regions", RegRegions);