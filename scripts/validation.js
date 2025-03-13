// Validation rules based on phase selection
const validationRules = {
    "requirements gathering": {
        action: [
            "application domain understanding", 
            "stakeholder statement", 
            "requirements (functional)", 
            "requirements (non-functional)"
        ],
        scope: [
            "documentation (text)", 
            "uml object", 
            "uml activity", 
            "other diagram"
        ],
        target: [
            "n/a", 
            "md", 
            "txt/doc", 
            "uml object", 
            "uml activity", 
            "other diagram"
        ]
    },
    "requirements specification": {
        action: [
            "requirements (functional)", 
            "requirements (non-functional)", 
            "use case specification"
        ],
        scope: [
            "uml use case", 
            "uml object", 
            "uml activity", 
            "uml sequence", 
            "data flow diagram", 
            "other diagram", 
            "UX design", 
            "test cases"
        ],
        target: [
            "n/a", 
            "md", 
            "txt/doc", 
            "uml use case", 
            "uml object", 
            "uml activity", 
            "uml sequence", 
            "data flow diagram", 
            "other diagram", 
            "UX design", 
            "test cases"
        ]
    },
    "architecture": {
        action: [
            "architectural style selection", 
            "architectural decision"
        ],
        scope: [
            "uml component",
            "uml deployment",
            "uml class",
            "uml other",
            "ER diagram"
        ],
        target: [
            "n/a",
            "md",
            "txt/doc",
            "client-server",
            "multi-tier",
            "microservices",
            "SOA",
            "MVC",
            "other architecture"
        ]
    },
    "design": {
        action: [
            "design decision", 
            "data design"
        ],
        scope: [
            "uml sequence", 
            "uml component", 
            "uml class", 
            "uml other", 
            "UX design", 
            "ER diagram", 
            "frontend", 
            "backend", 
            "api", 
            "cli", 
            "test cases"
        ],
        target: [
            "n/a", 
            "md", 
            "txt/doc"
        ]
    },
    "coding": {
        action: [
            "source code authoring", 
            "code management"
        ],
        scope: [
            "frontend", 
            "backend", 
            "data management", 
            "api", 
            "cli", 
            "code management actions"
        ],
        target: [
            "js / node", 
            "python", 
            "sql", 
            "nosql db", 
            "java", 
            "shell", 
            "C/C++", 
            "php", 
            "typescript", 
            "yaml/json", 
            "C#"
        ]
    },
    "testing": {
        action: [
            "unit testing", 
            "functional testing", 
            "integration testing", 
            "performance testing", 
            "other testing", 
            "user acceptance testing (uat)"
        ],
        scope: [
            "frontend", 
            "backend", 
            "api", 
            "cli", 
            "test cases", 
            "test code driver", 
            "test execution scripts"
        ],
        target: [
            "js / node", 
            "python", 
            "sql", 
            "nosql db", 
            "java", 
            "shell", 
            "C/C++", 
            "php", 
            "typescript", 
            "yaml/json", 
            "C#"
        ]
    },
    "deployment": {
        action: [
            "dev-ops", 
            "container operations", 
            "network operations", 
            "deployment"
        ],
        scope: [
            "frontend", 
            "backend", 
            "api", 
            "data management", 
            "deployment scripts"
        ],
        target: [
            "shell", 
            "yaml/json", 
            "sql", 
            "nosql db", 
            "uml deployment"
        ]
    }
};

// Function to populate dropdown based on phase selection
function populateDropdowns(phase) {
    const actionSelect = document.getElementById('action');
    const scopeSelect = document.getElementById('scope');
    const targetSelect = document.getElementById('target');
    
    // Clear previous options
    actionSelect.innerHTML = '<option value="" disabled selected>Select an action</option>';
    scopeSelect.innerHTML = '<option value="" disabled selected>Select a scope</option>';
    targetSelect.innerHTML = '<option value="" disabled selected>Select a target</option>';
    
    // Enable the dropdowns
    actionSelect.disabled = false;
    scopeSelect.disabled = false;
    targetSelect.disabled = false;
    
    // Get valid options for the selected phase
    const phaseRules = validationRules[phase];
    
    if (phaseRules) {
        // Populate action dropdown
        phaseRules.action.forEach(action => {
            const option = document.createElement('option');
            option.value = action;
            option.textContent = action;
            actionSelect.appendChild(option);
        });
        
        // Populate scope dropdown
        phaseRules.scope.forEach(scope => {
            const option = document.createElement('option');
            option.value = scope;
            option.textContent = scope;
            scopeSelect.appendChild(option);
        });
        
        // Populate target dropdown
        phaseRules.target.forEach(target => {
            const option = document.createElement('option');
            option.value = target;
            option.textContent = target;
            targetSelect.appendChild(option);
        });
    }
}

// Function to validate the form
function validateForm() {
    const phase = document.getElementById('phase').value;
    const action = document.getElementById('action').value;
    const scope = document.getElementById('scope').value;
    const target = document.getElementById('target').value;
    
    if (!phase || !action || !scope || !target) {
        return false;
    }
    
    const phaseRules = validationRules[phase];
    
    if (!phaseRules) {
        return false;
    }
    
    // Check if selected values are valid for the phase
    return (
        phaseRules.action.includes(action) &&
        phaseRules.scope.includes(scope) &&
        phaseRules.target.includes(target)
    );
}

// Initialize event listeners for validation
function initValidation() {
    const phaseSelect = document.getElementById('phase');
    
    phaseSelect.addEventListener('change', function() {
        if (this.value) {
            populateDropdowns(this.value);
        }
    });
}

// Initialize validation when DOM is loaded
document.addEventListener('DOMContentLoaded', initValidation);