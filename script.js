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
        checkAccess();
        logoutButton.style.display = "block";
      }
    });
  }]);

  // Connect logout button
  var logoutButton = document.getElementById("logout");
  logoutButton.addEventListener("click", function() {
    tp.pianoId.logout(() => {
      document.cookie = "has_access_refresh_completion=False";
      logoutButton.style.display = "none";
      window.location.reload();
    });
  });

  // Check access to specific resource with RID: RVYAS7T
  function checkAccess() {
    var params = { rid: "RVYAS7T" };
    var callback = function(response) {
      if (response.access && response.access.granted) {
        // if user has access, check for cookie "has_access_refresh_completion=True"
        if (document.cookie.replace(/(?:(?:^|.*;\s*)has_access_refresh_completion\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== "True") {

          // if not True set cookie and refresh
          document.cookie = "has_access_refresh_completion=True";
          window.location.reload();
        }

        console.log("user has access");
        console.log("cookies:", document.cookie);
      } else {
        console.log("user does not have access");
      }
    }
    tp.api.callApi("/access/check", params, callback);
  }
});