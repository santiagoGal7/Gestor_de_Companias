import { postRegion, patchRegion, deleteRegion } from '../../../Apis/regions/regApi.js';
import { getPaises } from '../../../Apis/countries/countriesApi.js';

export class RegRegion extends HTMLElement {
  constructor() {
    super();
    this.paises = [];
    this.render();
    this.cargarPaises();
    this.setupEvents();
    this.disableFrm(true);
  }

  async cargarPaises() {
    try {
      this.paises = await getPaises();
      this.llenarSelectPaises();
    } catch (error) {
      console.error('Error al cargar países:', error);
    }
  }

  llenarSelectPaises() {
    const select = this.querySelector('#paisId');
    
    if (this.paises.length === 0) {
      select.innerHTML = '<option value="">No hay países registrados</option>';
      select.disabled = true;
      this.mostrarAlerta();
      return;
    }

    select.innerHTML = '<option value="">Seleccione un país</option>' +
      this.paises.map(pais => 
        `<option value="${pais.id}">${pais.nombrePais}</option>`
      ).join('');
    select.disabled = false;
    this.ocultarAlerta();
  }

  mostrarAlerta() {
    const alerta = this.querySelector('#alertaPaises');
    if (alerta) alerta.style.display = 'block';
  }

  ocultarAlerta() {
    const alerta = this.querySelector('#alertaPaises');
    if (alerta) alerta.style.display = 'none';
  }

  render() {
    this.innerHTML = /* html */ `
      <style>
        .disabled { opacity: 0.5; pointer-events: none; }
      </style>
      <div class="card mt-3">
        <div class="card-header">
          Registro de Región <span class="badge rounded-pill text-bg-primary" id="idView"></span>
        </div>
        <div class="card-body">
          <div class="alert alert-warning" role="alert" id="alertaPaises" style="display:none;">
            <strong>¡Atención!</strong> No hay países disponibles. Debe registrar al menos un país antes de crear una región.
          </div>
          <form id="frmRegion">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="nombreRegion" class="form-label">Nombre de la Región <span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="nombreRegion" name="nombreRegion" required>
              </div>
              <div class="col-md-6 mb-3">
                <label for="paisId" class="form-label">País <span class="text-danger">*</span></label>
                <select class="form-select" id="paisId" name="paisId" required>
                  <option value="">Paises registrados...</option>
                </select>
                <small class="text-muted">Debe existir al menos un país registrado</small>
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
    if (this.paises.length === 0) {
      alert('Debe registrar al menos un país antes de crear una región');
      return;
    }
    this.disableFrm(false);
    this.resetForm();
    this.toggleButtons(['btnGuardar', 'btnCancelar'], ['btnNuevo', 'btnEditar', 'btnEliminar']);
  }

  handleCancelar() {
    this.disableFrm(true);
    this.resetForm();
    this.toggleButtons(['btnNuevo'], ['btnGuardar', 'btnCancelar', 'btnEditar', 'btnEliminar']);
  }

  async handleGuardar() {
    const form = this.querySelector('#frmRegion');
    const data = Object.fromEntries(new FormData(form).entries());
    
    if (!data.nombreRegion || !data.paisId) {
      alert('Por favor complete todos los campos obligatorios (*)');
      return;
    }

    try {
      const response = await postRegion(data);
      if (response && response.id) {
        this.viewData(response.id);
        this.toggleButtons(['btnNuevo', 'btnEditar', 'btnCancelar', 'btnEliminar'], ['btnGuardar']);
        this.disableFrm(true); // AGREGADO
        alert('Región guardada exitosamente');
      }
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar la región');
    }
  }

  async handleEditar() {
    const idView = this.querySelector('#idView').textContent;
    if (!idView) return;

    const form = this.querySelector('#frmRegion');
    const data = Object.fromEntries(new FormData(form).entries());

    if (!data.nombreRegion || !data.paisId) {
      alert('Por favor complete todos los campos obligatorios (*)');
      return;
    }

    try {
      await patchRegion(data, idView);
      alert('Región actualizada exitosamente');
    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('Error al actualizar la región');
    }
  }

  async handleEliminar() {
    const idView = this.querySelector('#idView').textContent;
    if (!idView) return;

    if (!confirm('¿Está seguro de eliminar esta región?')) return;

    try {
      await deleteRegion(idView);
      this.resetForm();
      this.disableFrm(true);
      this.toggleButtons(['btnNuevo'], ['btnGuardar', 'btnCancelar', 'btnEditar', 'btnEliminar']);
      alert('Región eliminada exitosamente');
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar la región');
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
    this.querySelector('#frmRegion').reset();
    this.querySelector('#idView').textContent = '';
  }

  disableFrm(disabled) {
    const form = this.querySelector('#frmRegion');
    Array.from(form.elements).forEach(el => {
      if (el.tagName !== 'BUTTON') el.disabled = disabled;
    });
  }
}

customElements.define("reg-region", RegRegion);