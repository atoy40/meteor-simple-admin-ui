Package.describe({
  summary: "A simple UI to manage users and roles",
  version: "0.0.1",
  name: "atoy40:simple-admin-ui",
  git: "https://github.com/atoy40/meteor-simple-admin-ui.git"
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@0.9.0');
  api.use('templating', 'client');
  api.use('jquery', 'client');
  api.use('underscore', 'client');
  api.use('aslagle:reactive-table', 'client');
  api.use('alanning:roles', ['client', 'server']);
  api.use('anti:i18n', 'client');

  api.add_files('simple_admin_ui.html', 'client');
  api.add_files('simple_admin_ui_commons.js', ['client', 'server']);
  api.add_files('simple_admin_ui_client.js', 'client');
  api.add_files('simple_admin_ui_server.js', 'server');
  api.add_files('simple_admin_ui.css', 'client');
  api.add_files('i18n/fr.js', 'client');
  api.add_files('i18n/en.js', 'client');
});
