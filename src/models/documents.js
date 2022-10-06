const baseUrl = window.location.href.includes("localhost") ?
    "http://localhost:1337" :
    "https://jsramverk-editor-sisl19.azurewebsites.net";

export async function create(title: string) {
    let input = JSON.stringify({
        title: title,
        text: "",
    });

    return await fetch(`${baseUrl}/docs/create`, {
        method: "POST",
        body: input,
        headers: {
            "content-type": "application/json",
        },
    })
        .then((data) => data.json())
        .then(function (data) {
            localStorage.setItem("id", data.data._id);
        })
        .catch((error) => {
            console.log(error);
            return "";
        });
}

export async function readAll() {
    return await fetch(`${baseUrl}/docs`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    })
        .then((data) => data.json())
        .then((data) => {
            localStorage.setItem("all", JSON.stringify(data.data.msg));
            return data.data.msg;
        })
        .catch((error) => {
            console.log(error);
            return "";
        });
}

export async function read(id: any) {
    return await fetch(`${baseUrl}/${id}`)
        .then((data) => data.json())
        .then((data) => {
            localStorage.setItem("id", data.data._id);
            localStorage.setItem("text", data.data.text);
            localStorage.setItem("title", data.data.title);
        })
        .catch((error) => {
            console.log(error);
            return "";
        });
}

export async function update(id: any, title: string, text: string) {
    let input;
    input = JSON.stringify({
        id: id,
        title: title,
        text: text
    });
    return await fetch(`${baseUrl}/docs/update`, {
        method: "PUT",
        body: input,
        headers: {
            "content-type": "application/json",
        },
    })
        .then((data) => data.json())
        .catch((error) => {
            console.log(error);
            return "";
        });
}

const docs = {
    getAllDocs: async function getAllDocs() {
        const response = await fetch(`${baseUrl}/docs`);
        const result = await response.json();

        return result.data;
    },
};

export default docs;
