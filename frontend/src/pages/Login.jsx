import api from "../api/axios";

function Login() {
    function handleSubmit(event) {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        api.post("/api/auth/login", { email, password })
            .then(response => {
                console.log("User logged in:", response.data);
                // Store the token in localStorage
                localStorage.setItem("token", response.data.token);
                // Redirect to the dashboard or another page
                window.location.href = "/dashboard";
            })
            .catch(error => {
                console.error("Error logging in user:", error);
            });
        
        
    }
    return (
        <form onSubmit={handleSubmit}>
            <input name="email" type="email" placeholder="Email" />
            <input name="password" type="password" placeholder="Password" />
            <button name="submit" type="submit">Login</button>      
        </form>
    )
}

export default Login;
    