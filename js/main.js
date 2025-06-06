import { handleFileUpload, displayClippings, parsedClippings, loadClippingsFromStorage } from './clippings.js';
import { applySystemDarkMode, setupDarkModeToggle } from './darkMode.js';
import { setupHelp, fetchHelp } from "./help.js";
document.getElementById('fileInput').addEventListener('change', handleFileUpload);
document.getElementById('sortOrder').addEventListener('change', displayClippings);
document.getElementById('searchInput').addEventListener('input', displayClippings);

window.addEventListener('DOMContentLoaded', loadClippingsFromStorage);

applySystemDarkMode();
setupDarkModeToggle();

setupHelp();
fetchHelp();
