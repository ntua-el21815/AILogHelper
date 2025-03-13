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
        // Get phase from form data and current date formatted as YYYY-MM-DD
        const phase = document.getElementById('aiTaskForm').phase.value;
        const currentDate = new Date().toISOString().split('T')[0];
        zip.file(`ai_answers_${phase}_${currentDate}.json`, jsonBlob);
        zip.file(`ai_txt_${phase}_${currentDate}.txt`, textBlob);
        
        // Generate and download the zip file
        zip.generateAsync({ type: 'blob' })
            .then(function(content) {
                const zipBlob = new Blob([content], { type: 'application/zip' });
                downloadSingleFile(zipBlob, `ai_log_${phase}_${currentDate}.zip`);
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

// Initialize file handling when DOM is loaded
document.addEventListener('DOMContentLoaded', initFileHandling);