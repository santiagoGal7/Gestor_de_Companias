import { postCompania, patchCompania, deleteCompania } from '../../../Apis/companies/companyApi.js';
import { getCiudades } from '../../../Apis/cities/citiesApi.js';

export class RegCompania extends HTMLElement {
  constructor() {
    super();
    this.ciudades = [];
    this.render();
    this.cargarCiudades();
    this.setupEvents();
    this.disableFrm(true);
  }

  async cargarCiudades() {
    try {
      this.ciudades = await getCiudades();
      this.llenarSelectCiudades();
    } catch (error) {
      console.error('Error al cargar ciudades:', error);
    }
  }

  llenarSelectCiudades() {
    const select = this.querySelector('#ciudadId');
    
    if (this.ciudades.length === 0) {
      select.innerHTML = '<option value="">No hay ciudades registradas</option>';
      select.disabled = true;
      this.mostrarAlerta();
      return;
    }

    select.innerHTML = '<option value="">Seleccione una ciudad</option>' +
      this.ciudades.map(ciudad => 
        `<option value="${ciudad.id}">${ciudad.nombreCiudad}</option>`
      ).join('');
    select.disabled = false;
    this.ocultarAlerta();
  }

  mostrarAlerta() {
    const alerta = this.querySelector('#alertaCompanias');
    alerta.style.display = 'block';
  }

  ocultarAlerta() {
    const alerta = this.querySelector('#alertaCompanias');
    alerta.style.display = 'none';
  }

  render() {
    this.innerHTML = /* html */ `
      <style>
        .disabled { opacity: 0.5; pointer-events: none; }
      </style>
      <div class="card mt-3">
        <div class="card-header">
          Registro de Compañía <span class="badge rounded-pill text-bg-primary" id="idView"></span>
        </div>
        <div class="card-body">
          <div class="alert alert-warning" role="alert" id="alertaCompanias" style="display:none;">
            <strong>¡Atención!</strong> No hay ciudades disponibles. Debe registrar al menos una ciudad antes de crear una compañía.
          </div>
          <form id="frmCompania">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="nombreCompania" class="form-label">Nombre de la Compañía <span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="nombreCompania" name="nombreCompania" required>
              </div>
              <div class="col-md-6 mb-3">
                <label for="nitCompania" class="form-label">NIT de la Compañía <span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="nitCompania" name="nitCompania" required>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="direccionCompania" class="form-label">Dirección de la Compañía <span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="direccionCompania" name="direccionCompania" required>
              </div>
              <div class="col-md-6 mb-3">
                <label for="emailCompania" class="form-label">Email de la Compañía <span class="text-danger">*</span></label>
                <input type="email" class="form-control" id="emailCompania" name="emailCompania" required>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="ciudadId" class="form-label">Ciudad <span class="text-danger">*</span></label>
                <select class="form-select" id="ciudadId" name="ciudadId" required>
                  <option value="">Ciudades registradas...</option>
                </select>
                <small class="text-muted">Debe existir al menos una ciudad registrada</small>
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
    if (this.ciudades.length === 0) {
      alert('Debe registrar al menos una ciudad antes de crear una compañía');
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
    const form = this.querySelector('#frmCompania');
    const data = Object.fromEntries(new FormData(form).entries());
    
    if (!data.nombreCompania || !data.ciudadId || !data.direccionCompania || 
        !data.emailCompania || !data.nitCompania) {
      alert('Por favor complete todos los campos obligatorios (*)');
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.emailCompania)) {
      alert('Por favor ingrese un email válido');
      return;
    }

    try {
      const response = await postCompania(data);
      if (response && response.id) {
        this.viewData(response.id);
        this.toggleButtons(['btnNuevo', 'btnEditar', 'btnCancelar', 'btnEliminar'], ['btnGuardar']);
        this.disableFrm(true); // AGREGADO
        alert('Compañía guardada exitosamente');
      }
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar la compañía');
    }
  }

  async handleEditar() {
    const idView = this.querySelector('#idView').textContent;
    if (!idView) return;

    const form = this.querySelector('#frmCompania');
    const data = Object.fromEntries(new FormData(form).entries());

    if (!data.nombreCompania || !data.ciudadId || !data.direccionCompania || 
        !data.emailCompania || !data.nitCompania) {
      alert('Por favor complete todos los campos obligatorios (*)');
      return;
    }

    try {
      await patchCompania(data, idView);
      alert('Compañía actualizada exitosamente');
    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('Error al actualizar la compañía');
    }
  }

  async handleEliminar() {
    const idView = this.querySelector('#idView').textContent;
    if (!idView) return;

    if (!confirm('¿Está seguro de eliminar esta compañía?')) return;

    try {
      await deleteCompania(idView);
      this.resetForm();
      this.disableFrm(true);
      this.toggleButtons(['btnNuevo'], ['btnGuardar', 'btnCancelar', 'btnEditar', 'btnEliminar']);
      alert('Compañía eliminada exitosamente');
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar la compañía');
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
    this.querySelector('#frmCompania').reset();
    this.querySelector('#idView').textContent = '';
  }

  disableFrm(disabled) {
    const form = this.querySelector('#frmCompania');
    Array.from(form.elements).forEach(el => {
      if (el.tagName !== 'BUTTON') el.disabled = disabled;
    });
  }
}

customElements.define("reg-compania", RegCompania);