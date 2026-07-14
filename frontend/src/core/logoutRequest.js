import API from "./API"

import getCookie from "./getCookie"

async function logoutRequest() {

    const response = await fetch(`${API}/api/user_auth/logout/`, {
        method: "POST",
        credentials: "include",
        headers: {
            "X-CSRFToken": getCookie("csrftoken")
        }
    })

    return response
}

export default logoutRequest