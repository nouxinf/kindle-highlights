export function parseClippingDate(dateStr) {
	const parts = dateStr.match(/\w+, (\d{1,2}) (\w+) (\d{4}) (\d{2}):(\d{2}):(\d{2})/);
	if (!parts) return new Date();
	const [ , day, monthName, year, hour, minute, second ] = parts;
	const months = {
		January: 0, February: 1, March: 2, April: 3,
		May: 4, June: 5, July: 6, August: 7,
		September: 8, October: 9, November: 10, December: 11
	};
	return new Date(
		parseInt(year),
		months[monthName],
		parseInt(day),
		parseInt(hour),
		parseInt(minute),
		parseInt(second)
	);
}
