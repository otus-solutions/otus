if (window.sessionStorage.getItem('pageUpdated') !== "true") {
    window.sessionStorage.setItem('pageUpdated', "true");
    window.location.reload(true);
} else {
    window.sessionStorage.setItem('pageUpdated', "false");
}