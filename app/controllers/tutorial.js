// Google Oath module initialization
var GoogleAuth = require('googleAuth');
var googleAuth = new GoogleAuth({
    clientId : 'CLIENT_ID',
    clientSecret : 'CLIENT_SECRET',
    propertyName : 'googleToken',
    scope : ['https://www.googleapis.com/auth/tasks', 'https://www.googleapis.com/auth/tasks.readonly'],
    loginHint : 'someuser@gmail.com' 
});

function updateProgress(e) {
	$.progress.setValue(e.currentPage);
}

$.scrollable.addEventListener("scrollend", updateProgress);

$.signin.addEventListener('click', function() {
    googleAuth.isAuthorized(function() {
        Ti.API.info('Access Token: ' + googleAuth.getAccessToken());
        //user is authorized so do something... just dont forget to add accessToken to your requests

    }, function() {
        //authorize first
        googleAuth.authorize();
    });
});