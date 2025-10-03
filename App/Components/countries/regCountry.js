import { postPais, patchPais, deletePais } from '../../../Apis/countries/countriesApi.js';

export class RegPais extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.setupEvents();
    this.disableFrm(true);
  }

  render() {
    this.innerHTML = /* html */ `
      <style>
        .disabled { opacity: 0.5; pointer-events: none; }
      </style>
      <div class="card mt-3">
        <div class="card-header">
          Registro de País <span class="badge rounded-pill text-bg-primary" id="idView"></span>
        </div>
        <div class="card-body">
          <form id="frmPais">
            <div class="row">
              <div class="col-md-12 mb-3">
                <label for="nombrePais" class="form-label">Nombre del País <span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="nombrePais" name="nombrePais" required placeholder="Ingrese el nombre del país">
              </div>
            </div>
            <div class="row mt-3">
              <div class="col">
                <div class="container mt-4 text-center">
                  <button type="button" class="btn btn-primary" id="btnNuevo">Nuevo</button>
                  <button type="button" class="btn btn-dark disabled" id="btnCancelar">Cancelar</button>
                  <button type="button" class="btn btn-success disabled" id="btnGuardar">Guardar</button>
                  <button type="button" class="btn btn-warning disabled" id="btnEditar">Editar</button>
                  <button type="button" class="btn btn-danger disabled" id="btnEliminar">Eliminar</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  setupEvents() {
    this.querySelector("#btnNuevo").addEventListener("click", () => this.handleNuevo());
    this.querySelector("#btnCancelar").addEventListener("click", () => this.handleCancelar());
    this.querySelector("#btnGuardar").addEventListener("click", () => this.handleGuardar());
    this.querySelector("#btnEditar").addEventListener("click", () => this.handleEditar());
    this.querySelector("#btnEliminar").addEventListener("click", () => this.handleEliminar());
  }

  handleNuevo() {
    this.disableFrm(false);
    this.resetForm();
    this.toggleButtons(['btnGuardar', 'btnCancelar'], ['btnNuevo', 'btnEditar', 'btnEliminar']);
    this.querySelector('#nombrePais').focus();
  }

  handleCancelar() {
    this.disableFrm(true);
    this.resetForm();
    this.toggleButtons(['btnNuevo'], ['btnGuardar', 'btnCancelar', 'btnEditar', 'btnEliminar']);
  }

  async handleGuardar() {
    const form = this.querySelector('#frmPais');
    const data = Object.fromEntries(new FormData(form).entries());
    
    if (!data.nombrePais) {
      alert('Por favor complete el campo obligatorio');
      return;
    }

    try {
      const response = await postPais(data);
      if (response && response.id) {
        this.viewData(response.id);
        this.toggleButtons(['btnNuevo', 'btnEditar', 'btnCancelar', 'btnEliminar'], ['btnGuardar']);
        this.disableFrm(true);
        alert('País guardado exitosamente');
      }
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar el país');
    }
  }

  async handleEditar() {
    const idView = this.querySelector('#idView').textContent;
    if (!idView) return;

    const form = this.querySelector('#frmPais');
    const data = Object.fromEntries(new FormData(form).entries());

    if (!data.nombrePais) {
      alert('Por favor complete el campo obligatorio');
      return;
    }

    try {
      await patchPais(data, idView);
      alert('País actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('Error al actualizar el país');
    }
  }

  async handleEliminar() {
    const idView = this.querySelector('#idView').textContent;
    if (!idView) return;

    if (!confirm('¿Está seguro de eliminar este país?')) return;

    try {
      await deletePais(idView);
      this.resetForm();
      this.disableFrm(true);
      this.toggleButtons(['btnNuevo'], ['btnGuardar', 'btnCancelar', 'btnEditar', 'btnEliminar']);
      alert('País eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar el país');
    }
  }

  toggleButtons(enable, disable) {
    enable.forEach(id => this.querySelector(`#${id}`).classList.remove('disabled'));
    disable.forEach(id => this.querySelector(`#${id}`).classList.add('disabled'));
  }

  viewData(id) {
    this.querySelector('#idView').textContent = id;
  }

  resetForm() {
    this.querySelector('#frmPais').reset();
    this.querySelector('#idView').textContent = '';
  }

  disableFrm(disabled) {
    const form = this.querySelector('#frmPais');
    Array.from(form.elements).forEach(el => {
      if (el.tagName !== 'BUTTON') el.disabled = disabled;
    });
  }
}

customElements.define("reg-pais", RegPais);