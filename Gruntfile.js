var _ = require('underscore');

var vendorPaths = [
  { name: 'jquery', path: 'vendor/components/jquery/jquery.js'},
  { name: 'underscore', path: 'vendor/components/underscore/underscore.js'},
  { name: 'backbone', path: 'vendor/components/backbone/backbone.js'}
]

module.exports = function( grunt ) {

  require('load-grunt-tasks')( grunt );

  grunt.initConfig({

    sass: {
      main: {
        files: { 'public/screen.css': 'styles/screen.scss' }
      }
    },

    concat: {
      dist: {
        src: _.union( _( vendorPaths ).pluck('path'), [ 'scripts/app.js' ] ),
        dest: 'public/app.js'
      }
    },

    uglify: {
      scripts: {
        files: { 'public/app.js': [ 'public/app.js' ] }
      }
    },

    compress: {
      main: {
        options: {
          mode: 'gzip'
        },
        src: [ 'public/app.js' ],
        dest: 'public/app.js'
      }
    },

    watch: {
      sass: {
        files: [ 'styles/screen.scss' ],
        tasks: [ 'sass' ]
      },
      scripts: {
        files: [ 'scripts/**/*.js' ],
        tasks: [ 'concat', 'uglify' ]
      }
    }
  });

  grunt.registerTask( 'base', [ 'sass', 'concat' ])
  grunt.registerTask( 'dev', [ 'base', 'watch' ]);
  grunt.registerTask( 'default', [ 'dev' ] );
  grunt.registerTask( 'production', [ 'base', 'uglify', 'compress' ] );

};
