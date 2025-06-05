export function setupHelp() {
	let helpBtn = document.getElementById("helpBtn");
	let helpBox = document.getElementById("helpbox");
	helpBtn.addEventListener("click", () => {
		if (helpBox.style.display === "none") {
			helpBox.style.display = "inline";
		} else if (helpBox.style.display === "inline") {
			helpBox.style.display = "none";
		} else {
			console.error("AAAAAAAAAAAAAAAAAAAAAAAAA\nDetails: in funciton setupHelp, helpBox.style.display is neither none nor inline.");
		}
	})
};
export function fetchHelp() {
	let helpBox = document.getElementById("helpbox");
	fetch('help.md')
		.then(res => res.text())
		.then(md => {
			helpBox.innerHTML = marked.parse(md);
			console.log("Markdown fetched:", md);
		})
		.catch(err => {
			helpBox.textContent = 'Error loading Markdown';
			console.error(err);
		});
}