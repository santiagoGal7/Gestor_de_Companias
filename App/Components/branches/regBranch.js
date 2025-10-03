import { postSucursal, patchSucursal, deleteSucursal } from '../../../Apis/branch/branchApi.js';
import { getCiudades } from '../../../Apis/cities/citiesApi.js';
import { getCompanias } from '../../../Apis/companies/companyApi.js';

export class RegSucursal extends HTMLElement {
  constructor() {
    super();
    this.ciudades = [];
    this.companias = [];
    this.render();
    this.cargarDatos();
    this.setupEvents();
    this.disableFrm(true);
  }

  async cargarDatos() {
    try {
      const [ciudadesData, companiasData] = await Promise.all([
        getCiudades(),
        getCompanias()
      ]);
      
      this.ciudades = ciudadesData;
      this.companias = companiasData;
      
      this.llenarSelectCiudades();
      this.llenarSelectCompanias();
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  }

  llenarSelectCiudades() {
    const select = this.querySelector('#ciudadId');
    
    if (this.ciudades.length === 0) {
      select.innerHTML = '<option value="">No hay ciudades registradas</option>';
      select.disabled = true;
      this.mostrarAlertaCiudades();
      return;
    }

    select.innerHTML = '<option value="">Seleccione una ciudad</option>' +
      this.ciudades.map(ciudad => 
        `<option value="${ciudad.id}">${ciudad.nombreCiudad}</option>`
      ).join('');
    select.disabled = false;
    this.ocultarAlertaCiudades();
  }

  llenarSelectCompanias() {
    const select = this.querySelector('#companiaId');
    
    if (this.companias.length === 0) {
      select.innerHTML = '<option value="">No hay compañías registradas</option>';
      select.disabled = true;
      this.mostrarAlertaCompanias();
      return;
    }

    select.innerHTML = '<option value="">Seleccione una compañía</option>' +
      this.companias.map(compania => 
        `<option value="${compania.id}">${compania.nombreCompania}</option>`
      ).join('');
    select.disabled = false;
    this.ocultarAlertaCompanias();
  }

  mostrarAlertaCiudades() {
    const alerta = this.querySelector('#alertaCiudades');
    if (alerta) alerta.style.display = 'block';
  }

  ocultarAlertaCiudades() {
    const alerta = this.querySelector('#alertaCiudades');
    if (alerta) alerta.style.display = 'none';
  }

  mostrarAlertaCompanias() {
    const alerta = this.querySelector('#alertaCompanias');
    if (alerta) alerta.style.display = 'block';
  }

  ocultarAlertaCompanias() {
    const alerta = this.querySelector('#alertaCompanias');
    if (alerta) alerta.style.display = 'none';
  }

  render() {
    this.innerHTML = /* html */ `
      <style>
        .disabled { opacity: 0.5; pointer-events: none; }
      </style>
      <div class="card mt-3">
        <div class="card-header">
          Registro de Sucursal <span class="badge rounded-pill text-bg-primary" id="idView"></span>
        </div>
        <div class="card-body">
          <div class="alert alert-warning" role="alert" id="alertaCiudades" style="display:none;">
            <strong>¡Atención!</strong> No hay ciudades disponibles. Debe registrar al menos una ciudad antes de crear una sucursal.
          </div>
          <div class="alert alert-warning" role="alert" id="alertaCompanias" style="display:none;">
            <strong>¡Atención!</strong> No hay compañías disponibles. Debe registrar al menos una compañía antes de crear una sucursal.
          </div>
          <form id="frmSucursal">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="nitSucursal" class="form-label">NIT de la Sucursal <span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="nitSucursal" name="nitSucursal" required placeholder="800058709">
              </div>
              <div class="col-md-6 mb-3">
                <label for="direccionSucursal" class="form-label">Dirección <span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="direccionSucursal" name="direccionSucursal" required placeholder="Calle 14 # 27-55">
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="emailSucursal" class="form-label">Email <span class="text-danger">*</span></label>
                <input type="email" class="form-control" id="emailSucursal" name="emailSucursal" required placeholder="branch@company.com.co">
              </div>
              <div class="col-md-6 mb-3">
                <label for="nroContacto" class="form-label">Número de Contacto <span class="text-danger">*</span></label>
                <input type="tel" class="form-control" id="nroContacto" name="nroContacto" required placeholder="310 123 4567">
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="nroFijo" class="form-label">Número de Telefono</label>
                <input type="tel" class="form-control" id="nroFijo" name="nroFijo" placeholder="601 555 1234">
              </div>
              <div class="col-md-6 mb-3">
                <label for="ciudadId" class="form-label">Ciudad <span class="text-danger">*</span></label>
                <select class="form-select" id="ciudadId" name="ciudadId" required>
                  <option value="">Ciudades registradas...</option>
                </select>
                <small class="text-muted">Debe existir al menos una ciudad registrada</small>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="companiaId" class="form-label">Compañía <span class="text-danger">*</span></label>
                <select class="form-select" id="companiaId" name="companiaId" required>
                  <option value="">Compañías registradas...</option>
                </select>
                <small class="text-muted">Debe existir al menos una compañía registrada</small>
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
      alert('Debe registrar al menos una ciudad antes de crear una sucursal');
      return;
    }
    if (this.companias.length === 0) {
      alert('Debe registrar al menos una compañía antes de crear una sucursal');
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
    const form = this.querySelector('#frmSucursal');
    const data = Object.fromEntries(new FormData(form).entries());
    
    // Validación de campos obligatorios
    if (!data.nitSucursal || !data.direccionSucursal || !data.emailSucursal || 
        !data.nroContacto || !data.ciudadId || !data.companiaId) {
      alert('Por favor complete todos los campos obligatorios (*)');
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.emailSucursal)) {
      alert('Por favor ingrese un email válido');
      return;
    }

    try {
      const response = await postSucursal(data);
      if (response && response.id) {
        this.viewData(response.id);
        this.toggleButtons(['btnNuevo', 'btnEditar', 'btnCancelar', 'btnEliminar'], ['btnGuardar']);
        this.disableFrm(true);
        alert('Sucursal guardada exitosamente');
      }
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar la sucursal');
    }
  }

  async handleEditar() {
    const idView = this.querySelector('#idView').textContent;
    if (!idView) return;

    const form = this.querySelector('#frmSucursal');
    const data = Object.fromEntries(new FormData(form).entries());

    // Validación
    if (!data.nitSucursal || !data.direccionSucursal || !data.emailSucursal || 
        !data.nroContacto || !data.ciudadId || !data.companiaId) {
      alert('Por favor complete todos los campos obligatorios (*)');
      return;
    }

    try {
      await patchSucursal(data, idView);
      alert('Sucursal actualizada exitosamente');
    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('Error al actualizar la sucursal');
    }
  }

  async handleEliminar() {
    const idView = this.querySelector('#idView').textContent;
    if (!idView) return;

    if (!confirm('¿Está seguro de eliminar esta sucursal?')) return;

    try {
      await deleteSucursal(idView);
      this.resetForm();
      this.disableFrm(true);
      this.toggleButtons(['btnNuevo'], ['btnGuardar', 'btnCancelar', 'btnEditar', 'btnEliminar']);
      alert('Sucursal eliminada exitosamente');
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar la sucursal');
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
    this.querySelector('#frmSucursal').reset();
    this.querySelector('#idView').textContent = '';
  }

  disableFrm(disabled) {
    const form = this.querySelector('#frmSucursal');
    Array.from(form.elements).forEach(el => {
      if (el.tagName !== 'BUTTON') el.disabled = disabled;
    });
  }
}

customElements.define("reg-sucursal", RegSucursal);