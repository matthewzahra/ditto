import { useAuth } from "@/context/AuthContext"

import LoggedInLayout from "../LoggedInLayout/LoggedInLayout"
import LoggedOutLayout from "../LoggedOutLayout/LoggedOutLayout"

function AboutLayout() {

    const { loggedIn, loadingIn } = useAuth()

    if (loadingIn) {
        return null
    }

    if (loggedIn) {
        return <LoggedInLayout />
    }

    return <LoggedOutLayout />
}

export default AboutLayout