Package.describe({
  name: "example-permissions",
});

Package.onUse(function (api) {
  api.use([
    "promise",

    // vulcan core
    "vulcan:core@=1.15.2",

    // vulcan packages
    "vulcan:forms@=1.15.2",
    "vulcan:accounts@=1.15.2",
    "vulcan:forms-upload@=1.15.2",
    "vulcan:ui-bootstrap@=1.15.2",

    // third-party packages
    "fourseven:scss@4.12.0",
  ]);

  api.addFiles("lib/stylesheets/style.scss");

  api.addAssets(["lib/static/vulcanstagram.png"], ["client"]);

  api.mainModule("lib/server/main.js", "server");
  api.mainModule("lib/client/main.js", "client");
});
