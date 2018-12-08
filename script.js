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
        logoutButton.style.display = "block";
      },
      loggedOut: function() {
        console.log('user logged out');
        logoutButton.style.display = "none";
      }
    });
  }]);

  // Logout button
  const logoutButton = document.getElementById("logout");
  logoutButton.addEventListener("click", function() {
    tp.pianoId.logout(() => console.log('other logout callback'));
  });

  // Check access to specific resource with RID: RVYAS7T

});