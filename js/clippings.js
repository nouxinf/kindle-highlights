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
			return { title, meta, text, date };
		}).filter(Boolean);
		displayClippings();
	};
	reader.readAsText(file);
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

	filtered.sort((a, b) => sortOrder === 'newest' ? b.date - a.date : a.date - b.date);

	filtered.forEach(clip => {
		const div = document.createElement('div');
		div.className = 'highlight';
		div.innerHTML = `<div class="meta"><strong>${clip.title}</strong><br>${clip.meta}</div><div class="text">${clip.text}</div>`;
		output.appendChild(div);
	});
}
