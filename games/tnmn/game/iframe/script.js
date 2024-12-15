// Override navigation methods to prompt on redirection attempts
(function () {
    const originalAssign = window.location.assign;
    const originalReplace = window.location.replace;

    const blockNavigation = (event) => {
        event.preventDefault();
        event.returnValue = '';
        console.warn('Redirection attempt blocked.');
    };

    window.location.assign = function (url) {
        console.warn('Redirect attempt blocked (assign):', url);
    };

    window.location.replace = function (url) {
        console.warn('Redirect attempt blocked (replace):', url);
    };
})();

// Block meta refresh tags
document.querySelectorAll('meta[http-equiv="refresh"]').forEach(meta => {
    console.warn('Meta refresh tag blocked:', meta);
    meta.parentNode.removeChild(meta);
});

// Intercept attempts to navigate away using beforeunload
let doNotAllowNavigation = true; // Set this flag to false to allow manual navigation
const blockNavigationGlobally = (event) => {
    if (doNotAllowNavigation) {
        event.preventDefault();
        event.returnValue = '';
        console.warn('Attempt to leave the page was blocked.');
    }
};
window.addEventListener('beforeunload', blockNavigationGlobally);

// Override form submissions to prevent redirects
document.addEventListener('submit', (event) => {
    event.preventDefault();
    console.warn('Form submission blocked:', event.target);
});

// Monitor and prevent changes in window.location.href or history.pushState
(function () {
    const originalPushState = history.pushState;
    history.pushState = function () {
        console.warn('History pushState blocked with arguments:', arguments);
    };

    const originalReplaceState = history.replaceState;
    history.replaceState = function () {
        console.warn('History replaceState blocked with arguments:', arguments);
    };
})();

console.log('Redirection prevention script active.');



