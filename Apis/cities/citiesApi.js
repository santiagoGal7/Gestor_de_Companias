const URL_API = "http://localhost:3001";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

const getAllCities = async () => {
    try {
        const respuesta = await fetch(`${URL_API}/cities`);
        if (respuesta.status === 200) {
            return await respuesta.json();
        } else {
            throw new Error(`Error ${respuesta.status}`);
        }
    } catch (error) {
        console.error('Error en GET all cities:', error.message);
        return [];
    }
};

const getCityById = async (id) => {
    try {
        const respuesta = await fetch(`${URL_API}/cities/${id}`);
        if (respuesta.status === 200) {
            return await respuesta.json();
        } else {
            throw new Error(`Error ${respuesta.status}`);
        }
    } catch (error) {
        console.error('Error en GET city by ID:', error.message);
        return null;
    }
};

const postCity = async (datos) => {
    try {
        const respuesta = await fetch(`${URL_API}/cities`, {
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
        console.error('Error en POST city:', error.message);
    }
};

const patchCity = async (datos, id) => {
    try {
        const respuesta = await fetch(`${URL_API}/cities/${id}`, {
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
        console.error('Error en PATCH city:', error.message);
    }
};

const deleteCity = async (id) => {
    try {
        const respuesta = await fetch(`${URL_API}/cities/${id}`, {
            method: "DELETE",
            headers: myHeaders
        });
        if (respuesta.ok) {
            return await respuesta.json();
        } else {
            throw new Error(`Error ${respuesta.status}`);
        }
    } catch (error) {
        console.error('Error en DELETE city:', error.message);
    }
};

export {
    getAllCities,
    getCityById,
    postCity,
    patchCity,
    deleteCity
};