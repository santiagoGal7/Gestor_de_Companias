const URL_API = "http://localhost:3001";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

const getAllCountries = async () => {
    try {
        const respuesta = await fetch(`${URL_API}/countries`);
        if (respuesta.status === 200) {
            return await respuesta.json();
        } else {
            throw new Error(`Error ${respuesta.status}`);
        }
    } catch (error) {
        console.error('Error en GET all countries:', error.message);
        return [];
    }
};

const getCountryById = async (id) => {
    try {
        const respuesta = await fetch(`${URL_API}/countries/${id}`);
        if (respuesta.status === 200) {
            return await respuesta.json();
        } else {
            throw new Error(`Error ${respuesta.status}`);
        }
    } catch (error) {
        console.error('Error en GET country by ID:', error.message);
        return null;
    }
};

const postCountry = async (datos) => {
    try {
        const respuesta = await fetch(`${URL_API}/countries`, {
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
        console.error('Error en POST country:', error.message);
    }
};

const patchCountry = async (datos, id) => {
    try {
        const respuesta = await fetch(`${URL_API}/countries/${id}`, {
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
        console.error('Error en PATCH country:', error.message);
    }
};

const deleteCountry = async (id) => {
    try {
        const respuesta = await fetch(`${URL_API}/countries/${id}`, {
            method: "DELETE",
            headers: myHeaders
        });
        if (respuesta.ok) {
            return await respuesta.json();
        } else {
            throw new Error(`Error ${respuesta.status}`);
        }
    } catch (error) {
        console.error('Error en DELETE country:', error.message);
    }
};

export {
    getAllCountries,
    getCountryById,
    postCountry,
    patchCountry,
    deleteCountry
};