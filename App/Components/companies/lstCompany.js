import { getCompanias } from '../../../Apis/companies/companyApi.js';
import { getCiudades } from '../../../Apis/cities/citiesApi.js';
export class LstCompany extends HTMLElement {
  constructor() {
    super();
    this.companias = [];
    this.ciudades = {};
    this.render();
    this.cargarCompania();
  }

  async cargarCompania() {
    try {
      const [companiasData, ciudadesData] = await Promise.all([
        getCompanias(),
        getCiudades()
      ]);
      
      this.companias = companiasData;
      
      // Crear un mapa de ciudades para búsqueda rápida
      this.ciudades = ciudadesData.reduce((acc, ciudad) => {
        acc[ciudad.id] = ciudad.nombreCiudad;
        return acc;
      }, {});
      
      this.mostrarCompanias();
    } catch (error) {
      console.error('Error al cargar compañías:', error);
      this.mostrarError();
    }
  }

  mostrarCompanias() {
    const tbody = this.querySelector('#tbodyCompanias');
    
    if (this.companias.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center">No hay compañías registradas</td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = this.companias.map(compania => `
      <tr>
        <td>${compania.id}</td>
        <td>${compania.nombreCompania || 'N/A'}</td>
        <td>${compania.nitCompania || 'N/A'}</td>
        <td>${compania.direccionCompania || 'N/A'}</td>
        <td>${compania.emailCompania || 'N/A'}</td>
        <td>${this.ciudades[compania.ciudadId] || 'Ciudad no encontrada'}</td>
      </tr>
    `).join('');
  }

  mostrarError() {
    const tbody = this.querySelector('#tbodyCompanias');
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-danger">
          Error al cargar las compañías. Por favor, intente nuevamente.
        </td>
      </tr>
    `;
  }

  render() {
    this.innerHTML = /* html */ `
      <div class="card mt-3">
        <div class="card-header d-flex justify-content-between align-items-center">
          <span>Listado de Compañías</span>
          <button class="btn btn-primary btn-sm" id="btnRecargar">
            Recargar
          </button>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead class="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Nit</th>
                  <th>Dirección</th>
                  <th>Email</th>
                  <th>Ciudad</th>
                </tr>
              </thead>
              <tbody id="tbodyCompanias">
                <tr>
                  <td colspan="5" class="text-center">
                    <div class="spinner-border text-primary" role="status">
                      <span class="visually-hidden">Cargando...</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>     
    `;

    this.querySelector('#btnRecargar').addEventListener('click', async () => {
      const btn = this.querySelector('#btnRecargar');
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Cargando...';
      
      await this.cargarCompania();
      
      btn.disabled = false;
      btn.innerHTML = 'Recargar';
    });
  }
}

customElements.define("lst-company", LstCompany);