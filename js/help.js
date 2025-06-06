export function setupHelp() {
    const helpBtn = document.getElementById("helpBtn");
    const helpBox = document.getElementById("helpbox");

    helpBtn.addEventListener("click", () => {
        const isShowing = helpBox.classList.contains("showing");
        const isHiding = helpBox.classList.contains("hiding");

        if (!isShowing && !isHiding) {
            helpBox.classList.add("showing");
        } else if (isShowing) {
            helpBox.classList.remove("showing");
            helpBox.classList.add("hiding");

            const onTransitionEnd = (e) => {
                if (e.propertyName === "opacity") {
                    helpBox.classList.remove("hiding");
                    helpBox.removeEventListener("transitionend", onTransitionEnd);
                }
            };
            void helpBox.offsetWidth;

            helpBox.addEventListener("transitionend", onTransitionEnd);
        }
    });
}


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