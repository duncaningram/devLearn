// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
var Backendless = require('vendor/backendless');
var Log = require('utils/Log');

// TODO: Load from tiapp.xml
Backendless.initApp('18F03ACC-5BDA-13F2-FF4D-4A027A07FC00', '20C2CC94-A867-F193-FFBB-AB8468264C00', 'v1');

/* Example Registration Code should be in User.js
function userRegistered(user) {
    Log.info("user has registered");
}

function userError(err) {
    Log.error("error message - " + err.message);
    Log.error("error code - " + err.statusCode);
}

var user = new Backendless.User();
user.email = "tim@test.com";
user.password = "test123";
Backendless.UserService.register(user, new Backendless.Async(userRegistered, userError));
*/