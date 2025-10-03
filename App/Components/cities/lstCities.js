import { getCiudades } from '../../../Apis/cities/citiesApi.js';
import { getRegiones } from '../../../Apis/regions/regApi.js';
export class LstCiudad extends HTMLElement {
  constructor() {
    super();
    this.ciudades = [];
    this.regiones = {};
    this.render();
    this.cargarCiudades();
  }

  async cargarCiudades() {
    try {
      const [ciudadesData, regionesData] = await Promise.all([
        getCiudades(),
        getRegiones()
      ]);
      
      this.ciudades = ciudadesData;
      
      // Crear un mapa de regiones para búsqueda rápida
      this.regiones = regionesData.reduce((acc, region) => {
        acc[region.id] = region.nombreRegion;
        return acc;
      }, {});
      
      this.mostrarCiudades();
    } catch (error) {
      console.error('Error al cargar ciudades:', error);
      this.mostrarError();
    }
  }

  mostrarCiudades() {
    const tbody = this.querySelector('#tbodyCiudades');
    
    if (this.ciudades.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="4" class="text-center">No hay ciudades registradas</td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = this.ciudades.map(ciudad => `
      <tr>
        <td>${ciudad.id}</td>
        <td>${ciudad.nombreCiudad || 'N/A'}</td>
        <td>${this.regiones[ciudad.regionId] || 'Región no encontrada'}</td>
        <td><span class="badge bg-info">${ciudad.regionId || 'N/A'}</span></td>
      </tr>
    `).join('');
  }

  mostrarError() {
    const tbody = this.querySelector('#tbodyCiudades');
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="text-center text-danger">
          Error al cargar las ciudades. Por favor, intente nuevamente.
        </td>
      </tr>
    `;
  }

  render() {
    this.innerHTML = /* html */ `
      <div class="card mt-3">
        <div class="card-header d-flex justify-content-between align-items-center">
          <span>Listado de Ciudades</span>
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
                  <th>Nombre de la Ciudad</th>
                  <th>Región</th>
                  <th>ID Región</th>
                </tr>
              </thead>
              <tbody id="tbodyCiudades">
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
      
      await this.cargarCiudades();
      
      btn.disabled = false;
      btn.innerHTML = 'Recargar';
    });
  }
}

customElements.define("lst-ciudad", LstCiudad);