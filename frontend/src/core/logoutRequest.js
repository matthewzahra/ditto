import API from "./API"

import getCookie from "./getCookie"

async function logoutRequest() {

    try{
        const response = await fetch(`${API}/api/user_auth/logout/`, {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CSRFToken": getCookie("csrftoken")
            }
        })

        return response
    } catch (err) {
        console.error("Logout failed: ", error)
        throw error
    }
}

export default logoutRequest