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
        console.log('user ', data.user, ' logged in with token', data.token);
        checkAccess(); // Check user access to specific resource
        logoutButton.style.display = "block";
      },
      loggedOut: function() {
        logoutButton.style.display = "none";
        window.location.reload();
      }
    });
  }]);

  // Logout button
  var logoutButton = document.getElementById("logout");
  logoutButton.addEventListener("click", function() {
    tp.pianoId.logout();
  });

  // Check access to specific resource with RID: RVYAS7T
  function checkAccess() {
    var params = { rid: "RVYAS7T" };
    var callback = function(response) {
      if (response.access && response.access.granted) {
        window.location.reload(false);
        console.log("user has access");
      } else {
        console.log("user does not have access");
      }
    }
    tp.api.callApi("/access/check", params, callback);
  }
});