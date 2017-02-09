$(document).ready(function() {
	localStorage.clear()
  var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
    auth: {
      params: { scope: 'openid email' }
    }
  });

  $('.btn-login').click(function(e) {
    e.preventDefault();
    lock.show();
		retrieve_profile()
  });

  $('.btn-logout').click(function(e) {
    e.preventDefault();
    logout();
  })

  lock.on("authenticated", function(authResult) {
    lock.getProfile(authResult.idToken, function(error, profile) {
      if (error) {
        return;
      }
      localStorage.setItem('id_token', authResult.idToken);
      show_profile_info(profile);
    });
		$('.poll-container').show()
  });

  var retrieve_profile = function() {
    var id_token = localStorage.getItem('id_token');
    if (id_token) {
      lock.getProfile(id_token, function (err, profile) {
        if (err) {
          return alert('There was an error getting the profile: ' + err.message);
        }
        show_profile_info(profile);
      });
    }
  };

  var show_profile_info = function(profile) {
     $('.name').text(profile.name);
     $('.btn-login').hide();
     $('.avatar').attr('src', profile.picture).show();
     $('.btn-logout').show();
		 localStorage.setItem('photo', profile.picture);
		 localStorage.setItem('name', profile.name);
  };

  var logout = function() {
    localStorage.removeItem('id_token');
    window.location.href = "/";
  };


});
