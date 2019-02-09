Package.describe({
  name: 'example-reactions',
});

Package.onUse(function (api) {

  api.use([

    'promise',

    // vulcan core
    'vulcan:core@1.12.16',

    // vulcan packages
    'vulcan:voting@1.12.16',
    'vulcan:forms@1.12.16',
    'vulcan:accounts@1.12.16',
    'vulcan:ui-bootstrap@1.12.16',
    
  ]);

  api.addFiles('lib/stylesheets/style.css');
  
  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');

});
