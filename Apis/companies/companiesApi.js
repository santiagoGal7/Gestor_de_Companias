const URL_API = "http://localhost:3001";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

const getAllCompanies = async () => {
    try {
        const respuesta = await fetch(`${URL_API}/companies`);
        if (respuesta.status === 200) {
            return await respuesta.json();
        } else {
            throw new Error(`Error ${respuesta.status}`);
        }
    } catch (error) {
        console.error('Error en GET all companies:', error.message);
        return [];
    }
};

const getCompanyById = async (id) => {
    try {
        const respuesta = await fetch(`${URL_API}/companies/${id}`);
        if (respuesta.status === 200) {
            return await respuesta.json();
        } else {
            throw new Error(`Error ${respuesta.status}`);
        }
    } catch (error) {
        console.error('Error en GET company by ID:', error.message);
        return null;
    }
};

const postCompany = async (datos) => {
    try {
        const respuesta = await fetch(`${URL_API}/companies`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
        if (respuesta.ok) {
            return await respuesta.json();
        } else {
            throw new Error(`Error ${respuesta.status}`);
        }
    } catch (error) {
        console.error('Error en POST company:', error.message);
    }
};

const patchCompany = async (datos, id) => {
    try {
        const respuesta = await fetch(`${URL_API}/companies/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
        if (respuesta.ok) {
            return await respuesta.json();
        } else {
            throw new Error(`Error ${respuesta.status}`);
        }
    } catch (error) {
        console.error('Error en PATCH company:', error.message);
    }
};

const deleteCompany = async (id) => {
    try {
        const respuesta = await fetch(`${URL_API}/companies/${id}`, {
            method: "DELETE",
            headers: myHeaders
        });
        if (respuesta.ok) {
            return await respuesta.json();
        } else {
            throw new Error(`Error ${respuesta.status}`);
        }
    } catch (error) {
        console.error('Error en DELETE company:', error.message);
    }
};

export {
    getAllCompanies,
    getCompanyById,
    postCompany,
    patchCompany,
    deleteCompany
};