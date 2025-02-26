document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita que se recargue la página

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    try {
        const response = await fetch("http://localhost:3001/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            message.style.color = "green";
            message.textContent = "✅ Inicio de sesión exitoso";
            // Redirigir a la página de bienvenida o dashboard
            window.location.href = "/bienvenido"; // Cambia esto según tu lógica
        } else {
            message.style.color = "red";
            message.textContent = `❌ Error: ${data.message}`;
        }
    } catch (error) {
        message.style.color = "red";
        message.textContent = "❌ Error en el servidor";
    }
});
