/*

Modify

*/

const path = require('path');
const webpack = require('webpack')
/**
 * Smart function to find Vulcan packages
 * 
 * You can either provide a path to Vulcan as VULCAN_DIR env
 * or set the METEOR_PACKAGE_DIR variable
 */
const findPathToVulcanPackages = () => {
  // look for VULCAN_DIR env variable
  if (process.env.VULCAN_DIR) return `${process.env.VULCAN_DIR}/packages`
  // look for METEOR_PACKAGE_DIRS variable
  const rawPackageDirs = process.env.METEOR_PACKAGE_DIRS
  if (rawPackageDirs) {
    const dirs = rawPackageDirs.split(':')
    // Vulcan dir should be '/some-folder/Vulcan/packages'
    const vulcanPackagesDir = dirs.find((dir) => !!dir.match(/\/Vulcan\//))
    if (vulcanPackagesDir) {
      return vulcanPackagesDir
    }
    console.log(`
      Please either set the VULCAN_DIR variable to your Vulcan folder or
      set METEOR_PACKAGE_DIRS to your <Vulcan>/packages folder.
      Fallback to default value: '../../Vulcan'.`
    )
  }
  // default value
  return '../../Vulcan/packages'
}
// path to your Vulcan repo (see 2-repo install in docs)
const pathToVulcanPackages = path.resolve(__dirname, findPathToVulcanPackages());

// path to your Vulcan UI library package
//const pathToUILibrary = `${pathToVulcanPackages}/vulcan-ui-bootstrap`;

/*

Do Not Modify

*/

module.exports = ({ config }) => {
  config.resolve = {
    ...config.resolve,
    // this way node_modules are always those of current project and not of Vulcan
    alias: {
      ...config.resolve.alias,

      // Components
      CoreComponentsLoader: path.resolve(__dirname, `${pathToVulcanPackages}/vulcan-core/lib/modules/components.js`),
//      UIComponentsLoader: path.resolve(__dirname, `${pathToUILibrary}/lib/modules/components.js`),
//      UILibrary: path.resolve(__dirname, pathToUILibrary),
      //'meteor/vulcan:ui-bootstrap': path.resolve(__dirname, `${pathToVulcanPackages}/vulcan-ui-bootstrap`),
      //'meteor/vulcan:ui-material': path.resolve(__dirname, `${pathToVulcanPackages}/vulcan-ui-material`),

      // Locales
      //EnUS: path.resolve(__dirname, `${pathToVulcanPackages}/vulcan-i18n-en-us/lib/en_US.js`),
      //EsES: path.resolve(__dirname, `${pathToVulcanPackages}/vulcan-i18n-es-es/lib/es_ES.js`),
      //FrFR: path.resolve(__dirname, `${pathToVulcanPackages}/vulcan-i18n-fr-fr/lib/fr_FR.js`),

      // Vulcan Packages
      //'meteor/vulcan:lib': path.resolve(__dirname, './helpers.js'),
      //'meteor/vulcan:core': path.resolve(__dirname, './helpers.js'),
      //'meteor/vulcan:events': path.resolve(__dirname, './helpers.js'),
      //'meteor/vulcan:i18n': 'react-intl',
      //'meteor/vulcan:users': path.resolve(__dirname, './helpers'),
      'meteor/apollo': path.resolve(__dirname, './mocks/meteor-apollo')
    },
  };

  // force the config to use local node_modules instead the modules from Vulcan install
  config.resolve.modules.push(
      path.resolve(__dirname, '../node_modules')
  )

  config.plugins.push(
    new webpack.ProvidePlugin({
      // mock global variables
      'Meteor': path.resolve(__dirname, './mocks/Meteor'),
      'Vulcan': path.resolve(__dirname, './mocks/Vulcan'),
      'Mongo': path.resolve(__dirname, './mocks/Mongo'),
      '_': 'underscore',
    })
  )


  // handle meteor packages
  config.module.rules.push({
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loaders: [
      {
        loader: path.resolve(__dirname, './loaders/vulcan-loader'),
        options: {
          vulcanPackagesDir: pathToVulcanPackages,
          environment: 'client',
          // those package are mocked using an alias instead
          //exclude: ['meteor/vulcan:i18n']
        },
      },
      {
        loader: path.resolve(__dirname, './loaders/scrap-meteor-loader'),
        options:{
          // those package will be preserved, we provide a mock instead
          preserve: ['meteor/apollo']
        }
      }
    ]
  });
  /*

  Parse JSX files outside of Storybook directory

  */
  config.module.rules.push({
    test: /\.(js|jsx)$/,
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['@babel/react', {
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          }],
        }
      }],
  });

  /*

  Parse SCSS files

  */
  config.module.rules.push({
    test: /\.scss$/,
    loaders: ["style-loader", "css-loader", "sass-loader"],
    // include: path.resolve(__dirname, "../")
  });

  // Return the altered config
  return config;
};
