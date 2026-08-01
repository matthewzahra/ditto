import UpdatePasswordForm from "../../../components/UpdatePasswordForm/UpdatePasswordForm"

import "./UpdatePassword.css"

function UpdatePassword() {
    return (
        <div className="update-password-page">
            <h1>Forgot Password</h1>
            {<UpdatePasswordForm />}
        </div>
    )
}

export default UpdatePassword