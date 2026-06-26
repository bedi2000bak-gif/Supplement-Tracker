import api from "../api/axios";





function Register() {
  function handleRegister(event) {
      event.preventDefault();
      const email = event.target.email.value;
      const password = event.target.password.value;
  
      api.post("/api/auth/register", { email, password })
        .then(response => {
          console.log("User registered:", response.data);
        })
        .catch(error => {
          console.error("Error registering user:", error);
        });
      
    }
  return (
    <form onSubmit={handleRegister}>
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button name="submit" type="submit">Register</button>
    </form>
  )
}




export default Register;