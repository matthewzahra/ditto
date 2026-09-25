import API from "./API"

import getCookie from "./getCookie"

async function apiRequest(endpoint, options = {}) {
    const {
        method = "GET",
        body = null,
        headers = {},
        signal = null
    } = options


    try {

        const requestOptions = {
            method: method,
            credentials: "include",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                ...headers
            },
            signal
        }

        if (body !== null) {
            if (body instanceof FormData) {
                requestOptions.body = body
            } else {
                requestOptions.headers["Content-Type"] = "application/json"
                requestOptions.body = JSON.stringify(body)
            }
        }

        const response = await fetch(`${API}${endpoint}`, requestOptions)

        if (!response.ok) {
            let errorData

            try {
                errorData = await response.json()
            } catch {
                errorData = null
            }

            const error = new Error(
                errorData?.detail ||
                errorData?.error ||
                "API request failed"
            )

            error.status = response.status
            error.data = errorData

            throw error
        }

        return response

    } catch (err) {
        if (err.name !== "AbortError"){
            console.error("API request failed: ", err)
        }
        throw err
    }
}

export default apiRequest