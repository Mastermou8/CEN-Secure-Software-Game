document.addEventListener("DOMContentLoaded", initLoginForm);

function initLoginForm() {
	const form = document.getElementById("login-form");

	if (!form) {
		return;
	}

	form.addEventListener("submit", (event) => {
		event.preventDefault();
		window.location.href = "pages/dashboard.html";
	});
}
