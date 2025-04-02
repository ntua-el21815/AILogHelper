// Main application script

// Function to initialize the application
function initApp() {
    // Add JSZip library dynamically
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
    script.integrity = 'sha512-XMVd28F1oH/O71fzwBnV7HucLxVwtxf26XV8P4wPk26EDxuGZ91N8bsOttmnomcCD3CS5ZMRL50H0GgOHvegtg==';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    // Show validation messages on form submit
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.addEventListener('click', function() {
        const isValid = validateForm();
        
        if (!isValid) {
            alert('Please complete the form with valid selections.');
        }
    });
    const uploadBtn = document.getElementById('uploadBtn');
    uploadBtn.addEventListener('click', function() {
        const isValid = validateForm();
        
        if (!isValid) {
            alert('Please complete the form with valid selections.');
        }
    });
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});