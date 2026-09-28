import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm/ForgotPasswordForm"

import "./ForgotPassword.css"

function ForgotPassword() {
    return (
        <div className="forgot-password-page">
            <h1>Forgot Password</h1>
            <ForgotPasswordForm />
        </div>
    )
}

export default ForgotPassword