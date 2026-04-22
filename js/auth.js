document.addEventListener("DOMContentLoaded", initLoginForm);

function initLoginForm() {
	const form = document.getElementById("login-form");

	if (!form) {
		return;
	}

	form.addEventListener("submit", (event) => {
		var users = JSON.parse(document.getElementById("users").innerHTML);
		// event.preventDefault();
		for (var i = 0; i < users.length; i++) {
			if (users[i].username == form.username.value && users[i].password == form.password.value) {
				event.preventDefault();
				if (users[i].account_type == "player") {
					window.location.href = "pages/dashboard.html";
				} else {
					// window.location.href = "pages/admin.html";
				}
			}
		}
	});
}
