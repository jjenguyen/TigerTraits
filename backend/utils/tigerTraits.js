//front end
//quiz logic
//fetches data from /submit-quiz
//displays the response

function processUserName(name) {
    if (!name.trim() ||  trimmedName.length < 2) {
        return { error: "You must enter a valid name."};
    }

    return { message: `Nice to meet you, ${name}! Let's begin the personality quiz...`}
}


// Export for Node.js, but also make it accessible in the browser
if (typeof module !== "undefined" && module.exports) {
    module.exports = { processUserName };
} else {
    window.processUserName = processUserName; // attach to 'window' for browser
}