import { getSucursales } from '../../../Apis/branch/branchApi.js';
import { getCiudades } from '../../../Apis/cities/citiesApi.js';
import { getCompanias } from '../../../Apis/companies/companyApi.js';

export class LstSucursal extends HTMLElement {
  constructor() {
    super();
    this.sucursales = [];
    this.ciudades = {};
    this.companias = {};
    this.render();
    this.cargarSucursales();
  }

  async cargarSucursales() {
    try {
      const [sucursalesData, ciudadesData, companiasData] = await Promise.all([
        getSucursales(),
        getCiudades(),
        getCompanias()
      ]);
      
      this.sucursales = sucursalesData;
      
      // Crear mapas para búsqueda rápida
      this.ciudades = ciudadesData.reduce((acc, ciudad) => {
        acc[ciudad.id] = ciudad.nombreCiudad;
        return acc;
      }, {});

      this.companias = companiasData.reduce((acc, compania) => {
        acc[compania.id] = compania.nombreCompania;
        return acc;
      }, {});
      
      this.mostrarSucursales();
    } catch (error) {
      console.error('Error al cargar sucursales:', error);
      this.mostrarError();
    }
  }

  mostrarSucursales() {
    const tbody = this.querySelector('#tbodySucursales');
    
    if (this.sucursales.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center">No hay sucursales registradas</td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = this.sucursales.map(sucursal => `
      <tr>
        <td>${sucursal.id}</td>
        <td>${sucursal.nitSucursal || 'N/A'}</td>
        <td>${sucursal.direccionSucursal || 'N/A'}</td>
        <td>${sucursal.emailSucursal || 'N/A'}</td>
        <td>${sucursal.nroContacto || 'N/A'}</td>
        <td>${sucursal.nroFijo || 'N/A'}</td>
        <td>${this.ciudades[sucursal.ciudadId] || 'Ciudad no encontrada'}</td>
        <td>${this.companias[sucursal.companiaId] || 'Compañía no encontrada'}</td>
      </tr>
    `).join('');
  }

  mostrarError() {
    const tbody = this.querySelector('#tbodySucursales');
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="text-center text-danger">
          Error al cargar las sucursales. Por favor, intente nuevamente.
        </td>
      </tr>
    `;
  }

  render() {
    this.innerHTML = /* html */ `
      <div class="card mt-3">
        <div class="card-header d-flex justify-content-between align-items-center">
          <span>Listado de Sucursales</span>
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
                  <th>NIT</th>
                  <th>Dirección</th>
                  <th>Email</th>
                  <th>Contacto</th>
                  <th>Teléfono</th>
                  <th>Ciudad</th>
                  <th>Compañía</th>
                </tr>
              </thead>
              <tbody id="tbodySucursales">
                <tr>
                  <td colspan="8" class="text-center">
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
      
      await this.cargarSucursales();
      
      btn.disabled = false;
      btn.innerHTML = 'Recargar';
    });
  }
}

customElements.define("lst-sucursal", LstSucursal);