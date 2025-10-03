export class NavMenu extends HTMLElement{
    constructor(){
        super();
        this.render();
    }
    render(){
        this.innerHTML = /* html */ `
        <style rel="stylesheet">
          @import "./App/Components/navMenu/menuStyle.css";
        </style>
          <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link" href="#" data-module="pais">Country</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#" data-module="region">Region</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#" data-module="ciudad">City</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#" data-module="compania">Company</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#" data-module="sucursal">Branch</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>        
        `;
        
        this.querySelectorAll(".nav-link").forEach((link) => {
          link.addEventListener("click", (e) => {
              e.preventDefault();
              e.stopImmediatePropagation();
              
              const module = e.target.dataset.module;
              const mainContent = document.querySelector('#mainContent');
              mainContent.innerHTML = "";
              
              this.querySelectorAll(".nav-link").forEach(l => l.classList.remove('active'));
              e.target.classList.add('active');
              
              switch (module) {
                case 'pais':
                  mainContent.innerHTML = "<pais-component></pais-component>";
                  break;
                case 'region':
                  mainContent.innerHTML = "<region-component></region-component>";
                  break;
                case 'ciudad':
                  mainContent.innerHTML = "<ciudad-component></ciudad-component>";
                  break;
                case 'compania':
                  mainContent.innerHTML = "<compania-component></compania-component>";
                  break;
                case 'sucursal':
                  mainContent.innerHTML = "<sucursal-component></sucursal-component>";
                  break;
              }
          });
        });
    }
}
customElements.define("nav-menu", NavMenu);