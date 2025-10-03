import { postCountry, patchCountry, deleteCountry, getCountryById } from '../../../Apis/countries/countriesApi.js';
import CountriesModel from '../../../Models/countriesModel.js';

export class RegCountries extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.saveData();
    this.enabledBtns();
    this.eventoEditar();
    this.eventoEliminar();
    this.disableFrm(true);
    this.addEventListeners();
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/countries/countriesStyle.css";
      </style>
      <div class="card mt-3">
        <div class="card-header">
          Registro de Países <span class="badge rounded-pill text-bg-primary" id="idView"></span>
        </div>
        <div class="card-body">
          <form id="frmDataCountry">
            <div class="row">
              <div class="col">
                <label for="name" class="form-label">Nombre País</label>
                <input type="text" class="form-control" id="name" name="name">
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

  addEventListeners() {
    this.addEventListener('editCountry', async (e) => {
      const country = await getCountryById(e.detail.id);
      if (country) {
        const frmRegistro = this.querySelector('#frmDataCountry');
        frmRegistro.elements['name'].value = country.name;
        this.querySelector('#idView').innerHTML = country.id;
        this.disableFrm(false);
        this.ctrlBtn('[["#btnEditar","#btnCancelar","#btnEliminar"],["#btnNuevo","#btnGuardar"]]');
      }
    });
    this.addEventListener('deleteCountry', (e) => {
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
    const frmRegistro = this.querySelector('#frmDataCountry');
    const datos = Object.fromEntries(new FormData(frmRegistro).entries());
    const idView = this.querySelector('#idView');
    let id = idView.textContent;
    patchCountry(datos, id)
      .then(responseData => {
        alert('País actualizado con éxito');
      })
      .catch(error => {
        alert('Error al actualizar el país');
      });
  }

  delData = () => {
    const idView = this.querySelector('#idView');
    let id = idView.textContent;
    deleteCountry(id)
      .then(() => {
        alert('País eliminado con éxito');
        this.resetIdView();
        this.disableFrm(true);
        this.ctrlBtn('[["#btnNuevo"],["#btnGuardar","#btnEditar","#btnEliminar","#btnCancelar"]]');
      })
      .catch(error => {
        alert('Error al eliminar el país');
      });   
  }

  saveData = () => {
    const frmRegistro = this.querySelector('#frmDataCountry');
    this.querySelector('#btnGuardar').addEventListener("click", (e) => {
      const datos = Object.fromEntries(new FormData(frmRegistro).entries());
      postCountry(datos)
        .then(responseData => {
          alert('País guardado con éxito');
          this.viewData(responseData.id);
        })
        .catch(error => {
          alert('Error al guardar el país');
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
    const frmRegistro = this.querySelector('#frmDataCountry');
    Object.keys(CountriesModel).forEach(key => {
      frmRegistro.elements[key].value = CountriesModel[key];
      frmRegistro.elements[key].disabled = estado;
    });
  }
}

customElements.define("reg-countries", RegCountries);