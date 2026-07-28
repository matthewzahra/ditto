import API from "./API"

import getCookie from "./getCookie"

async function apiRequest(endpoint, options = {}) {
    const {
        method = "GET",
        body = null,
        headers = {}
    } = options


    try {

        const requestOptions = {
            method: method,
            credentials: "include",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                ...headers
            }
        }

        if (body !== null) {
            requestOptions.headers["Content-Type"] = "application/json"
            requestOptions.body = JSON.stringify(body)
        }

        const response = await fetch(`${API}${endpoint}`, requestOptions)

        return response

    } catch (err) {
        console.error("API request failed: ", err)
        throw err
    }
}

export default apiRequest