export function apiGenerator({ method, path, body }) {
    let API_SERVER = import.meta.env.VITE_API_URL;
    const contentType = { "Content-Type": "application/json" };
    
    switch (method) {
        case "GET":
            return fetch(API_SERVER + path, {
                method: "GET",
                body: JSON.stringify(body),
                headers: contentType,
            }).then((res) => res.json());
        case "PUT":
            return fetch(API_SERVER + path, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: contentType,
            }).then((res) => res.json());
        case "POST":
            return fetch(API_SERVER + path, {
                method: "POST",
                body: JSON.stringify(body),
                headers: contentType,
            }).then((res) => res.json());
        case "DELETE":
            return fetch(API_SERVER + path, {
                method: "DELETE",
                body: JSON.stringify(body),
                headers: contentType,
            }).then((res) => res.json());
    }
}

export function POST(action, path, body) {
    return action({ method: "POST", path, body });
}

export function PUT(action, path, body) {
    return action({ method: "PUT", path, body });
}

export function GET(action, path, body) {
    return action({ method: "GET", path, body });
}

export function DELETE(action, path, body) {
    return action({ method: "DELETE", path, body });
}
