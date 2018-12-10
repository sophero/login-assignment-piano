document.addEventListener("DOMContentLoaded", function() {

  // Configure Piano ID login screen
  tp = window.tp || [];
  tp.push(['setUsePianoIdUserProvider', true]);
  tp.push(["init", function() {
    tp.pianoId.show({
      disableSignUp: true,
      displayMode: 'inline',
      screen: 'login',
      containerSelector: '#login-form',
      loggedIn: function(data) {
        console.log('User ', data.user, ' logged in with token', data.token);
        logoutButton.style.display = "block";
      }
    });
  }]);

  // Set login success callback handler
  tp.push(["addHandler", "loginSuccess", checkAccess]);

  // Connect logout button
  var logoutButton = document.getElementById("logout");
  logoutButton.addEventListener("click", function() {
    tp.pianoId.logout(function() {
      logoutButton.style.display = "none";
      window.location.reload();
    });
  });

  // Check access to specific resource with RID: RVYAS7T
  function checkAccess() {
    var params = { rid: "RVYAS7T" };
    var callback = function(response) {
      if (response.access && response.access.granted) {
        window.location.reload();
        console.log("User has access");
      } else {
        console.log("User does not have access");
      }
    }
    tp.api.callApi("/access/check", params, callback);
  }
});