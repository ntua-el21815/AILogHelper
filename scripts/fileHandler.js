// Function to convert form data to JSON
function getFormDataAsJson() {
    const form = document.getElementById('aiTaskForm');
    
    // Extract form values
    const phase = form.phase.value;
    const action = form.action.value;
    const scope = form.scope.value;
    const target = form.target.value;
    const actionExperience = parseInt(form.actionExperience.value);
    const aimodel = form.aimodel.value;
    const toolOption = form.toolOption.value;
    const experienceWithTool = parseInt(form.experienceWithTool.value);
    const timeAllocated = form.timeAllocated.value;
    const timeSavedEstimate = form.timeSavedEstimate.value;
    const qualityOfAiHelp = parseInt(form.qualityOfAiHelp.value);
    const knowledgeAcquired = parseInt(form.knowledgeAcquired.value);
    const genericFeelingNow = parseInt(form.genericFeelingNow.value);
    const genericFeelingFuture = parseInt(form.genericFeelingFuture.value);
    const threatLevel = parseInt(form.threatLevel.value);
    const notes = form.notes.value;
    
    // Create JSON structure exactly matching the provided template structure
    const jsonData = {
        "answers": {
            "phase": phase,
            "action": action,
            "scope": scope,
            "action experience": actionExperience,
            "target": target,
            "aimodel": aimodel,
            "tool option": toolOption,
            "experience with tool": experienceWithTool,
            "time allocated (h)": timeAllocated,
            "time saved estimate (h)": timeSavedEstimate,
            "quality of ai help": qualityOfAiHelp,
            "knowledge acquired": knowledgeAcquired,
            "generic feeling - now": genericFeelingNow,
            "generic feeling - future": genericFeelingFuture,
            "threat level": threatLevel,
            "notes": notes
        }
    };
    
    return jsonData;
}

// Function to get AI log text
function getAiLogText() {
    return document.getElementById('aiLog').value;
}

// Function to download files as a zip
function downloadFiles() {
    // Check if the form is valid
    if (!validateForm()) {
        alert('Please complete the form with valid selections.');
        return;
    }
    
    // Get form data as JSON
    const jsonData = getFormDataAsJson();
    const jsonBlob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    
    // Get AI log text
    const aiLogText = getAiLogText();
    const textBlob = new Blob([aiLogText], { type: 'text/plain' });
    
    // Create a zip file using JSZip (we'll include this via CDN)
    if (typeof JSZip === 'undefined') {
        // If JSZip is not available, download files separately
        downloadSingleFile(jsonBlob, 'ai_task_answers.json');
        downloadSingleFile(textBlob, 'ai_log.txt');
        
        alert('Downloaded files separately as zip functionality is not available. Please install JSZip library for zip functionality.');
    } else {
        // Create a zip file
        const zip = new JSZip();
        // Get phase from form data and current date formatted as DD-MM-YYYY with time
        const phase = document.getElementById('aiTaskForm').phase.value;
        const now = new Date();
        const formattedDate = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;
        const formattedTime = `${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}`;
        const dateTimeStamp = `${formattedDate}_${formattedTime}`;
        
        zip.file(`ai_answers_${phase}_${dateTimeStamp}.json`, jsonBlob);
        zip.file(`ai_txt_${phase}_${dateTimeStamp}.txt`, textBlob);
        
        // Generate and download the zip file
        zip.generateAsync({ type: 'blob' })
            .then(function(content) {
            const zipBlob = new Blob([content], { type: 'application/zip' });
            // Download the file first
            downloadSingleFile(zipBlob, `ai_log_${phase}_${dateTimeStamp}.zip`);
            // Make zipBlob available externally
            window.generatedZipBlob = zipBlob;
            window.phase = phase;
            window.dateTimeStamp = dateTimeStamp;
        });
    }
}

function uploadToServer() {
    function uploadToServer() {
        // Then proceed with upload process
        // Ask user for credentials
        const endpointUrl = 'http://galileo.softlab.ntua.gr:5000/upload';
        const username = prompt('Please enter your username:');
        const password = prompt('Please enter your password:');

        zipBlob = window.generatedZipBlob;
        phase = window.phase;
        dateTimeStamp = window.dateTimeStamp;
        // Check if zipBlob is available
        if (!zipBlob) {
            alert('No zip file generated. Please download the zip file first.');
            return;
        }
        // Check if phase and dateTimeStamp are available
        if (!phase || !dateTimeStamp) {
            alert('Phase or dateTimeStamp is not available. Please download the zip file first.');
            return;
        }

        // Only proceed if credentials were provided
        if (!username || !password) {
            alert('Username and password are required for uploading.');
            return;
        }

        // Add credentials to form data
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('file', zipBlob, `@ai_log_${phase}_${dateTimeStamp}.zip`);

        // Show initial upload status message
        const statusMessage = document.createElement('div');
        statusMessage.id = 'uploadStatus';
        statusMessage.style.margin = '10px 0';
        statusMessage.textContent = 'Uploading file to server...';
        document.querySelector('form').appendChild(statusMessage);
        
        fetch(endpointUrl, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Upload successful:', data);
            statusMessage.textContent = `Upload successful: ${data.message}`;
            statusMessage.style.color = 'green';
            setTimeout(() => {
                statusMessage.remove();
            }, 5000);
        })
        .catch(error => {
            console.error('Error uploading file:', error);
            statusMessage.textContent = `Upload failed: ${error.message}`;
            statusMessage.style.color = 'red';
            setTimeout(() => {
                statusMessage.remove();
            }, 5000);
        });
    }
}

// Function to download a single file
function downloadSingleFile(blob, filename) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}

// Initialize event listeners for file handling
function initFileHandling() {
    const downloadBtn = document.getElementById('downloadBtn');
    
    downloadBtn.addEventListener('click', downloadFiles);
}

// Initialize event listeners for upload button
const uploadBtn = document.getElementById('uploadBtn');
uploadBtn.addEventListener('click', function() {
    // Check if the form is valid
    if (!validateForm()) {
        alert('Please complete the form with valid selections.');
        return;
    }
    
    // Proceed with upload
    uploadToServer();
});


// Initialize file handling when DOM is loaded
document.addEventListener('DOMContentLoaded', initFileHandling);