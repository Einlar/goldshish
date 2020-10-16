Package.describe({
  name:'vulcan:verify-email',
  summary:'Verify email addresses',
  version:'0.0.1',
  git:''
})

Package.onUse(function(api){


  api.versionsFrom('1.11.1');

  api.use(["vulcan:core", "vulcan:accounts",
  "vulcan:email"])

  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');
})