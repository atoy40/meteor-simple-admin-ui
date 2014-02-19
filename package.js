Package.describe({
  summary: "A simple UI to manage users and roles"
});

Package.on_use(function (api) {
  api.use('templating', 'client');
  api.use('handlebars', 'client');
  api.use('jquery', 'client');
  api.use('underscore', 'client');
  api.use('reactive-table', 'client');
  api.use('roles', ['client', 'server']);

  api.add_files('simple_admin_ui.html', 'client');
  api.add_files('simple_admin_ui_commons.js', ['client', 'server']);
  api.add_files('simple_admin_ui_client.js', 'client');
  api.add_files('simple_admin_ui_server.js', 'server');
  api.add_files('simple_admin_ui.css', 'client');
});