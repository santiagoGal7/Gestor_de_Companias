const URL_API = "http://localhost:3001";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

const getAllBranches = async () => {
    try {
        const respuesta = await fetch(`${URL_API}/branches`);
        if (respuesta.status === 200) {
            return await respuesta.json();
        } else {
            throw new Error(`Error ${respuesta.status}`);
        }
    } catch (error) {
        console.error('Error en GET all branches:', error.message);
        return [];
    }
};

const getBranchById = async (id) => {
    try {
        const respuesta = await fetch(`${URL_API}/branches/${id}`);
        if (respuesta.status === 200) {
            return await respuesta.json();
        } else {
            throw new Error(`Error ${respuesta.status}`);
        }
    } catch (error) {
        console.error('Error en GET branch by ID:', error.message);
        return null;
    }
};

const postBranch = async (datos) => {
    try {
        const respuesta = await fetch(`${URL_API}/branches`, {
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
        console.error('Error en POST branch:', error.message);
    }
};

const patchBranch = async (datos, id) => {
    try {
        const respuesta = await fetch(`${URL_API}/branches/${id}`, {
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
        console.error('Error en PATCH branch:', error.message);
    }
};

const deleteBranch = async (id) => {
    try {
        const respuesta = await fetch(`${URL_API}/branches/${id}`, {
            method: "DELETE",
            headers: myHeaders
        });
        if (respuesta.ok) {
            return await respuesta.json();
        } else {
            throw new Error(`Error ${respuesta.status}`);
        }
    } catch (error) {
        console.error('Error en DELETE branch:', error.message);
    }
};

export {
    getAllBranches,
    getBranchById,
    postBranch,
    patchBranch,
    deleteBranch
};