// Function to capitalize the first letter of a string
export function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to play a notification sound
export function playNotificationSound(soundPath) {
	const audio = new Audio(soundPath);
	audio.play();
}

// Example: A function to format date
export function formatDate(date) {
	return new Date(date).toLocaleDateString();
}

// Format Thousands
export function formatThousands(value) {
	return value.toLocaleString();
}

// Replace Commas with Colons
export function replaceCommasWithColons(str) {
	return str.replace(/,/g, ':');
}