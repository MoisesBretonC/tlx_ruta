document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita que se recargue la página

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    try {
        const response = await fetch("http://localhost:3001/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();
        if (response.ok) {
            message.style.color = "green";
            message.textContent = "✅ Registro exitoso";
        } else {
            message.style.color = "red";
            message.textContent = `❌ Error: ${data.message}`;
        }
    } catch (error) {
        message.style.color = "red";
        message.textContent = "❌ Error en el servidor";
    }
});
