/* Exports an object that defines
 *  all of the configuration needed by the projects'
 *  depended-on grunt tasks.
 *
 * You can find the parent object in: node_modules/lineman/config/application.coffee
 */

module.exports = require(process.env['LINEMAN_MAIN']).config.extend('application', {
  //Override application configuration here. Common examples follow in the comments.

  // API Proxying
  //
  // During development, you'll likely want to make XHR (AJAX) requests to an API on the same
  // port as your lineman development server. By enabling the API proxy and setting the port, all
  // requests for paths that don't match a static asset in ./generated will be forwarded to
  // whatever service might be running on the specified port.
  //
  // server: {
  //   apiProxy: {
  //     enabled: true,
  //     host: 'localhost',
  //     port: 3000
  //   }
  // }

  loadNpmTasks: [
    "grunt-concat-sourcemap", "grunt-contrib-stylus"
  ],

  removeTasks: {
    common: ["concat", "less"]
  },

  appendTasks: {
    common: ["concat_sourcemap"]
  },

  prependTasks: {
    common: ["stylus"]
  },

  stylus: {
    compile: {
      use: [require('nib')],
      src: 'app/css/app.styl',
      dest: "<%= files.stylus.generatedApp %>"
    }
  },

  concat_sourcemap: {
    options: {
      sourcesContent: true
    },
    js: {
      src: ["<banner:meta.banner>", "<%= files.js.vendor %>", "<%= files.template.generated %>", "<%= files.js.app %>", "<%= files.coffee.generated %>" ],
      dest: "<%= files.js.concatenated %>"
    },
    spec: {
      src: ["<%= files.js.specHelpers %>", "<%= files.coffee.generatedSpecHelpers %>", "<%= files.js.spec %>", "<%= files.coffee.generatedSpec %>"],
      dest: "<%= files.js.concatenatedSpec %>"
    },
    css: {
      src: ["<%= files.stylus.generatedVendor %>", "<%= files.css.vendor %>", "<%= files.stylus.generatedApp %>", "<%= files.css.app %>"],
      dest: "<%= files.css.concatenated %>"
    }
  },

  watch: {
    js: {
      files: ["<%= files.js.vendor %>", "<%= files.js.app %>"],
      tasks: ["concat_sourcemap:js"]
    },
    coffee: {
      files: "<%= files.coffee.app %>",
      tasks: ["coffee", "concat_sourcemap:js"]
    },
    jsSpecs: {
      files: ["<%= files.js.specHelpers %>", "<%= files.js.spec %>"],
      tasks: ["concat_sourcemap:spec"]
    },
    coffeeSpecs: {
      files: ["<%= files.coffee.specHelpers %>", "<%= files.coffee.spec %>"],
      tasks: ["coffee", "concat_sourcemap:spec"]
    },
    css: {
      files: ["<%= files.css.vendor %>", "<%= files.css.app %>"],
      tasks: ["concat_sourcemap:css"]
    },
    stylus: {
      files: ["<%= files.stylus.vendor %>", "<%= files.stylus.app %>"],
      tasks: ["stylus", "concat_sourcemap:css"]
    },
    handlebars: {
      tasks: ["handlebars", "concat_sourcemap:js"]
    },
    underscore: {
      tasks: ["jst", "concat_sourcemap:js"]
    }
  }

});
