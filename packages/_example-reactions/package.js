Package.describe({
  name: 'example-reactions',
});

Package.onUse(function (api) {

  api.use([

    'promise',

    // vulcan core
    'vulcan:core@1.13.4',

    // vulcan packages
    'vulcan:voting@1.13.4',
    'vulcan:forms@1.13.4',
    'vulcan:accounts@1.13.4',
    'vulcan:ui-bootstrap@1.13.4',
    
  ]);

  api.addFiles('lib/stylesheets/style.css');
  
  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');

});
