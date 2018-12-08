document.addEventListener("DOMContentLoaded", function() {
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
          },
          loggedOut: function() {
              console.log('user logged out');
          }
      });
  }]);
  console.log(tp);
});