const lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
  auth: {
    params: { scope: 'openid email' }
  }
});

$(document).ready(function() {
  localStorage.clear();
});

$(document).on('click', '.btn-login', function(e) {
  e.preventDefault();
  lock.show();
  retrieve_profile();
});

$(document).on('click', '.btn-logout', function(e) {
  e.preventDefault();
  logout();
});

lock.on('authenticated', function(authResult) {
  lock.getProfile(authResult.idToken, function(error, profile) {
    if (error) {
      return;
    }
    localStorage.setItem('id_token', authResult.idToken);
    show_profile_info(profile);
  });
  $('.poll-container').show();
});

retrieve_profile = () => {
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

show_profile_info = (profile) => {
  $('.name').text(profile.name);
  $('.btn-login').hide();
  $('.avatar').attr('src', profile.picture).show();
  $('.btn-logout').show();
  localStorage.setItem('photo', profile.picture);
  localStorage.setItem('name', profile.name);
};

logout = () => {
  localStorage.removeItem('id_token');
  window.location.href = '/';
};

