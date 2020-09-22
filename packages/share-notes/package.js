Package.describe({
    name: "share-notes",
  });
  
  Package.onUse(function (api) {
    api.use([
      // Here are our dependencies:
  
      // vulcan core
      'promise',
      'vulcan:core@=1.16.0', //1.16
  
      // vulcan packages
      'vulcan:forms@=1.16.0',
      'vulcan:accounts@=1.16.0',
      //'vulcan:forms-upload@=1.16.0',
      'vulcan:ui-bootstrap@=1.16.0',

      //'origenstudio:vulcan-files@=0.0.4', //Use previous version
  
    ]);
  
    api.addFiles("lib/stylesheets/style.css");
  
    // Here is the entry point for client & server:
    api.mainModule("lib/server/main.js", "server");
    api.mainModule("lib/client/main.js", "client");
  });
  