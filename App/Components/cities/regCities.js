import { postCity, patchCity, deleteCity, getCityById } from '../../../Apis/cities/citiesApi.js';
import { getAllRegions } from '../../../Apis/regions/regionsApi.js';
import CitiesModel from '../../../Models/citiesModel.js';

export class RegCities extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.saveData();
    this.enabledBtns();
    this.eventoEditar();
    this.eventoEliminar();
    this.disableFrm(true);
    this.addEventListeners();
    this.loadRegions();
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/cities/citiesStyle.css";
      </style>
      <div class="card mt-3">
        <div class="card-header">
          Registro de Ciudades <span class="badge rounded-pill text-bg-primary" id="idView"></span>
        </div>
        <div class="card-body">
          <form id="frmDataCity">
            <div class="row">
              <div class="col">
                <label for="name" class="form-label">Nombre Ciudad</label>
                <input type="text" class="form-control" id="name" name="name">
              </div>
              <div class="col">
                <label for="RegionId" class="form-label">Región</label>
                <select class="form-control" id="RegionId" name="RegionId"></select>
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

  async loadRegions() {
    const regions = await getAllRegions();
    const select = this.querySelector('#RegionId');
    select.innerHTML = '<option value="">Seleccione una región</option>';
    regions.forEach(region => {
      select.innerHTML += `<option value="${region.id}">${region.name}</option>`;
    });
  }

  addEventListeners() {
    this.addEventListener('editCity', async (e) => {
      const city = await getCityById(e.detail.id);
      if (city) {
        const frmRegistro = this.querySelector('#frmDataCity');
        frmRegistro.elements['name'].value = city.name;
        frmRegistro.elements['RegionId'].value = city.RegionId;
        this.querySelector('#idView').innerHTML = city.id;
        this.disableFrm(false);
        this.ctrlBtn('[["#btnEditar","#btnCancelar","#btnEliminar"],["#btnNuevo","#btnGuardar"]]');
      }
    });
    this.addEventListener('deleteCity', (e) => {
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
    const frmRegistro = this.querySelector('#frmDataCity');
    const datos = Object.fromEntries(new FormData(frmRegistro).entries());
    const idView = this.querySelector('#idView');
    let id = idView.textContent;
    patchCity(datos, id)
      .then(responseData => {
        alert('Ciudad actualizada con éxito');
      })
      .catch(error => {
        alert('Error al actualizar la ciudad');
      });
  }

  delData = () => {
    const idView = this.querySelector('#idView');
    let id = idView.textContent;
    deleteCity(id)
      .then(() => {
        alert('Ciudad eliminada con éxito');
        this.resetIdView();
        this.disableFrm(true);
        this.ctrlBtn('[["#btnNuevo"],["#btnGuardar","#btnEditar","#btnEliminar","#btnCancelar"]]');
      })
      .catch(error => {
        alert('Error al eliminar la ciudad');
      });   
  }

  saveData = () => {
    const frmRegistro = this.querySelector('#frmDataCity');
    this.querySelector('#btnGuardar').addEventListener("click", (e) => {
      const datos = Object.fromEntries(new FormData(frmRegistro).entries());
      if (!datos.RegionId) {
        alert('Seleccione una región');
        return;
      }
      postCity(datos)
        .then(responseData => {
          alert('Ciudad guardada con éxito');
          this.viewData(responseData.id);
        })
        .catch(error => {
          alert('Error al guardar la ciudad');
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
    const frmRegistro = this.querySelector('#frmDataCity');
    Object.keys(CitiesModel).forEach(key => {
      frmRegistro.elements[key].value = CitiesModel[key];
      frmRegistro.elements[key].disabled = estado;
    });
  }
}

customElements.define("reg-cities", RegCities);