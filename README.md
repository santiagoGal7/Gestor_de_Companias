# Gestión de Sucursales

Una aplicación web para gestionar sucursales, ciudades, compañías, regiones y países, construida con componentes web personalizados, JavaScript moderno, y un backend simulado con `json-server`. La interfaz utiliza Bootstrap para un diseño responsivo y amigable.

## Tabla de Contenidos
- [Gestión de Sucursales](#gestión-de-sucursales)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Descripción](#descripción)
  - [Características](#características)
  - [Tecnologías](#tecnologías)
  - [Estructura del Proyecto](#estructura-del-proyecto)
  - [Requisitos Previos](#requisitos-previos)
  - [Instalación](#instalación)
  - [Ejecución](#ejecución)
  - [Uso](#uso)
  - [Estructura de la Base de Datos](#estructura-de-la-base-de-datos)
  - [✉️ Autor y Contacto](#️-autor-y-contacto)

## Descripción
Esta aplicación permite a los usuarios registrar, listar, editar y eliminar información de sucursales, ciudades, compañías, regiones y países. Cada entidad tiene un componente de registro (`reg-`) para crear/editar datos y un componente de listado (`lst-`) para visualizarlos en tablas. La aplicación utiliza una API REST simulada con `json-server` para manejar los datos.

## Características
- **Gestión de Sucursales**: Crear, listar, actualizar y eliminar sucursales con información como NIT, dirección, email, contacto, ciudad y compañía.
- **Gestión de Ciudades**: Registrar y listar ciudades asociadas a regiones.
- **Gestión de Compañías**: Administrar compañías con detalles como nombre, NIT, dirección, email y ciudad.
- **Gestión de Regiones**: Crear y listar regiones asociadas a países.
- **Gestión de Países**: Registrar y listar países.
- **Interfaz Responsiva**: Diseñada con Bootstrap para una experiencia de usuario consistente en diferentes dispositivos.
- **Componentes Web**: Utiliza Custom Elements para una arquitectura modular y reutilizable.

## Tecnologías
- **Frontend**:
  - JavaScript (ES Modules)
  - HTML5
  - Bootstrap 5.3.0
  - Componentes Web (Custom Elements)
- **Backend**:
  - `json-server` para simular una API REST
- **Herramientas**:
  - Node.js
  - npm
  - `live-server` o `http-server` para servir archivos estáticos

## Estructura del Proyecto
```
gestion-sucursales/
├── Apis/
│   ├── branch/
│   │   └── branchApi.js
│   ├── cities/
│   │   └── citiesApi.js
│   ├── companies/
│   │   └── companyApi.js
│   ├── regions/
│   │   └── regApi.js
│   └── countries/
│       └── countriesApi.js
├── App/
│   └── Components/
│       ├── branch/
│       │   ├── regBranch.js
│       │   └── lstBranch.js
│       ├── cities/
│       │   ├── lstCities.js
│       │   └── regCities.js
│       ├── companies/
│       │   ├── lstCompany.js
│       │   └── regCompanys.js
│       ├── countries/
│       │   ├── lstCountries.js
│       │   └── regCountry.js
│       ├── regions/
│       │   ├── regRegion.js
│       │   └── lstRegion.js
│       └── navMenu.js
├── db.json
├── index.html
├── app.js
└── README.md
```

- **`Apis/`**: Contiene los archivos de API que manejan las solicitudes HTTP al backend (`json-server`).
- **`App/Components/`**: Componentes web para registro y listado de entidades.
- **`db.json`**: Archivo de datos para el backend simulado.
- **`index.html`**: Página principal que incluye todos los componentes.
- **`app.js`**: Punto de entrada que importa los componentes web.
- **`navMenu.js`**: Componente para la barra de navegación.

## Requisitos Previos
- **Node.js** (v16 o superior): [Descargar](https://nodejs.org/)
- **npm**: Incluido con Node.js
- Un navegador moderno (Chrome, Firefox, Edge, etc.)
- Opcional: Un editor de código como Visual Studio Code

## Instalación
1. Clona o descarga el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd gestion-sucursales
   ```
2. Instala las dependencias necesarias:
   ```bash
   npm install -g json-server live-server
   ```
   - `json-server`: Para simular el backend.
   - `live-server`: Para servir los archivos estáticos.

## Ejecución
1. **Inicia el backend (`json-server`)**:
   ```bash
   json-server --watch db.json
   ```
   Esto sirve la API en `http://localhost:3000`.

2. **Inicia el servidor web**:
   En otra terminal, desde el directorio raíz:
   ```bash
   live-server .
   ```
   Esto abre la aplicación en `http://127.0.0.1:5500` (o el puerto configurado).

3. Abre el navegador y navega a `http://127.0.0.1:5500`.

## Uso
- **Navegación**: Usa el menú de navegación para alternar entre las secciones de sucursales, ciudades, compañías, regiones y países.
- **Registro**:
  - Completa los formularios en las secciones de registro (`Nuevo`).
  - Los campos marcados con `*` son obligatorios.
  - Presiona `Guardar` para crear un nuevo registro o `Editar` para actualizar uno existente.
- **Listado**:
  - Las tablas muestran los datos registrados.
  - Usa el botón `Recargar` para actualizar los datos.
- **Eliminación**:
  - Selecciona un registro y presiona `Eliminar` para borrarlo (se pedirá confirmación).

## Estructura de la Base de Datos
El archivo `db.json` contiene las siguientes colecciones:
```json
{
  "paises": [
    { "id": 1, "nombrePais": "Colombia" },
    ...
  ],
  "regiones": [
    { "id": 1, "nombreRegion": "Antioquia", "paisId": 1 },
    ...
  ],
  "ciudades": [
    { "id": 1, "nombreCiudad": "Medellín", "regionId": 1 },
    ...
  ],
  "companias": [
    { "id": 1, "nombreCompania": "Empresa XYZ", "nitCompania": "123456789", "direccionCompania": "Calle 123", "emailCompania": "contacto@xyz.com", "ciudadId": 1 },
    ...
  ],
  "sucursales": [
    { "id": 1, "nitSucursal": "987654321", "direccionSucursal": "Avenida 456", "emailSucursal": "sucursal@xyz.com", "nroContacto": "1234567890", "nroFijo": "9876543210", "ciudadId": 1, "companiaId": 1 },
    ...
  ]
}
```

- **Dependencias**: Una sucursal depende de una ciudad y una compañía; una ciudad depende de una región; una región depende de un país.
- Puedes agregar datos manualmente en `db.json` o a través de los formularios en la aplicación.

## ✉️ Autor y Contacto

Desarrollado por:

*   **Nombre:** Santiago Andres Gallo Salamanca
*   **Grupo:** J3
*   **Correo Electrónico:** santiagogal7i@gmail.com