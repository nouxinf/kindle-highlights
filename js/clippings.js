import { parseClippingDate } from './utils.js';

export let parsedClippings = [];

export function handleFileUpload(e) {
	const file = e.target.files[0];
	if (!file) return;
	const reader = new FileReader();
	reader.onload = function(e) {
		const content = e.target.result;
		const clippings = content.split('==========').map(c => c.trim()).filter(Boolean);
		parsedClippings = clippings.map(clip => {
			const lines = clip.split('\n').filter(Boolean);
			if (lines.length < 3) return null;
			const title = lines[0];
			const meta = lines[1];
			const text = lines.slice(2).join('\n');
			const dateMatch = meta.match(/Added on (.+)/);
			const date = dateMatch ? parseClippingDate(dateMatch[1].trim()) : new Date();
			return { title, meta, text, date: date.toISOString() }; // Store date as string
		}).filter(Boolean);
		localStorage.setItem('clippings', JSON.stringify(parsedClippings));
		displayClippings();
	};
	reader.readAsText(file);
}

export function loadClippingsFromStorage() {
	const stored = localStorage.getItem('clippings');
	if (stored) {
		parsedClippings = JSON.parse(stored).map(c => ({
			...c,
			date: new Date(c.date)
		}));
		displayClippings();
	}
}

export function displayClippings() {
	const sortOrder = document.getElementById('sortOrder').value;
	const searchQuery = document.getElementById('searchInput').value.toLowerCase();
	const output = document.getElementById('output');
	output.innerHTML = '';

	const filtered = parsedClippings.filter(clip =>
		clip.text.toLowerCase().includes(searchQuery) ||
		clip.title.toLowerCase().includes(searchQuery)
	);

	document.getElementById('clippingsCount').textContent = `Total clippings: ${filtered.length}`;

	filtered.sort((a, b) => sortOrder === 'newest' ? b.date - a.date : a.date - b.date);

	filtered.forEach(clip => {
		const div = document.createElement('div');
		div.className = 'highlight';
		div.innerHTML = `<div class="meta"><strong>${clip.title}</strong><br>${clip.meta}</div><div class="text">${clip.text}</div>`;

		const copyBtn = document.createElement('button');
		copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
		copyBtn.className = 'copy-btn';
		copyBtn.style.margin = '5px 0';
		copyBtn.title = 'Copy highlight';
		copyBtn.onclick = () => {
			navigator.clipboard.writeText(clip.text);
			copyBtn.innerHTML = '<i class="fas fa-check"></i>';
			copyBtn.classList.add('clicked');
			setTimeout(() => {
				copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
				copyBtn.classList.remove('clicked');
			}, 1000);
		};
		div.appendChild(copyBtn);

		output.appendChild(div);
	});
}
