export function setupDarkModeToggle() {
	const btn = document.getElementById('darkModeToggleBtn');
	btn.addEventListener('click', () => {
		document.body.classList.toggle('dark-mode');
		const isDark = document.body.classList.contains('dark-mode');
		localStorage.setItem('darkMode', isDark);
		updateDarkIcon();
	});
}

export function applySystemDarkMode() {
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const saved = localStorage.getItem('darkMode');
	const enabled = saved !== null ? saved === 'true' : prefersDark;
	document.body.classList.toggle('dark-mode', enabled);
	updateDarkIcon();
}

function updateDarkIcon() {
	const btn = document.getElementById('darkModeToggleBtn');
	btn.innerHTML = document.body.classList.contains('dark-mode')
		? '<i class="fas fa-sun"></i>'
		: '<i class="fas fa-moon"></i>';
}
