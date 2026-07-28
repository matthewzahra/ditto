import apiRequest from "./apiRequest"

async function logoutRequest() {

    try{
        const response = await apiRequest("/api/user_auth/logout/", {
            method: "POST"
        })

        return response
    } catch (err) {
        console.error("Logout failed: ", err)
        throw err
    }
}

export default logoutRequest