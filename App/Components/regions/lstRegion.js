import { getRegiones } from '../../../Apis/regions/regApi.js';
import { getPaises } from '../../../Apis/countries/countriesApi.js';
export class LstRegion extends HTMLElement {
  constructor() {
    super();
    this.regiones = [];
    this.paises = {};
    this.render();
    this.cargarRegiones();
  }

  async cargarRegiones() {
    try {
      const [regionesData, paisesData] = await Promise.all([
        getRegiones(),
        getPaises()
      ]);
      
      this.regiones = regionesData;
      
      // Crear un mapa de países para búsqueda rápida
      this.paises = paisesData.reduce((acc, pais) => {
        acc[pais.id] = pais.nombrePais;
        return acc;
      }, {});
      
      this.mostrarRegiones();
    } catch (error) {
      console.error('Error al cargar regiones:', error);
      this.mostrarError();
    }
  }

  mostrarRegiones() {
    const tbody = this.querySelector('#tbodyRegiones');
    
    if (this.regiones.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="4" class="text-center">No hay regiones registradas</td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = this.regiones.map(region => `
      <tr>
        <td>${region.id}</td>
        <td>${region.nombreRegion || 'N/A'}</td>
        <td>${this.paises[region.paisId] || 'País no encontrado'}</td>
        <td><span class="badge bg-secondary">${region.paisId || 'N/A'}</span></td>
      </tr>
    `).join('');
  }

  mostrarError() {
    const tbody = this.querySelector('#tbodyRegiones');
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="text-center text-danger">
          Error al cargar las regiones. Por favor, intente nuevamente.
        </td>
      </tr>
    `;
  }

  render() {
    this.innerHTML = /* html */ `
      <div class="card mt-3">
        <div class="card-header d-flex justify-content-between align-items-center">
          <span>Listado de Regiones</span>
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
                  <th>Nombre de la Región</th>
                  <th>País</th>
                  <th>ID País</th>
                </tr>
              </thead>
              <tbody id="tbodyRegiones">
                <tr>
                  <td colspan="4" class="text-center">
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
      
      await this.cargarRegiones();
      
      btn.disabled = false;
      btn.innerHTML = 'Recargar';
    });
  }
}

customElements.define("lst-region", LstRegion);