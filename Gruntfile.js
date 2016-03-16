module.exports = function (grunt) {

  // load all grunt tasks in package.json
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jsFiles: [
      'www/app.js',
      'www/app.*.js',
      'www/{*,components/*}/*.module.js',
      'www/{*,components/*}/*.js',
      '!www/{*,components/*}/*.spec.js'
    ],
    cssFiles: [
      'www/components/assets/styles/*.css',
      'www/{*,components/*}/*.css',
      'www/app.css'
    ],
    watch: {
      main: {
        files: '<%= jsFiles %>',
        tasks: ['jsdoc', 'jshint', 'jscs'],
        options: {
          interrupt: true
        }
      }
    },
    clean: {
      build: ['build/dist/', 'build/temp/'],
      docs: ['build/temp/docs/'],
      phonegap: ['build/phonegap/', 'build/temp/'],
      templates: ['build/temp/app.templates.js'],
      temp: ['build/temp/']
    },
    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      main: {
        files: {
          'build/temp/app.full.min.js': '<%= jsFiles %>'
        }
      },
      mock: {
        files: {
          'build/temp/app.full.min.js': ['<%= jsFiles %>', 'www/app-mock.js']
        }
      }
    },
    cssmin: {
      main: {
        files: {
          'build/temp/app.full.min.css': '<%= cssFiles %>'
        }
      }
    },
    uglify: {
      main: {
        files: {
          'build/temp/app.full.min.js': ['build/temp/app.full.min.js']
        }
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'www',
            src: ['components/assets/**/*', 'bower_components/**/*',
              'app.config.json', 'favicon.ico'],
            dest: 'build/temp/'
          },
          {src: 'package.json', dest: 'build/temp/'}
        ]
      },
      phonegap: {
        files: [
          {
            expand: true,
            cwd: 'www',
            src: ['components/assets/**/*', 'bower_components/**/*',
              'app.config.json',
              '!bower_components/**/index.html'],
            dest: 'build/temp/'
          },
          {src: 'package.json', dest: 'build/temp/'},
          {src: 'resources/**/*', dest: 'build/temp/'},
          {src: 'phonegap/**/*', dest: 'build/temp/'},
          {
            expand: true,
            cwd: 'phonegap',
            src: ['config.xml', 'icon.png', 'splash.png'],
            dest: 'build/temp/'
          }
        ]
      },
      doc: {
        files: [
          {
            expand: true,
            cwd: 'jsdoc-custom',
            src: ['**/*'],
            dest: 'build/temp/docs/'
          }
        ]
      }
    },
    processhtml: {
      main: {
        files: {
          'build/temp/index.html': ['www/index.html']
        }
      }
    },
    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true,
        caseSensitive: true,
        minifyJS: true,
        minifyCSS: true

      },
      main: {
        src: 'build/temp/index.html',
        dest: 'build/temp/index.html'
      }
    },
    compress: {
      main: {
        options: {
          archive: 'build/dist/<%= pkg.name %>_<%= pkg.version %>.tar.gz',
          mode: 'tgz'
        },
        files: [
          {
            expand: true,
            cwd: 'build/temp',
            src: ['**/*'],
            dest: '<%= pkg.name %>_<%= pkg.version %>/'
          }
        ]
      },
      phonegap: {
        options: {
          archive: 'build/phonegap/<%= pkg.name %>_<%= pkg.version %>.zip',
          mode: 'zip'
        },
        files: [
          {
            expand: true,
            cwd: 'build/temp',
            src: ['**/*'],
            dest: '<%= pkg.name %>_<%= pkg.version %>/',
            dot: true
          }
        ]
      }
    },
    jsdoc: {
      main: {
        src: ['<%= jsFiles %>'],
        options: {
          destination: 'build/temp/docs/',
          configure: 'node_modules/angular-jsdoc/conf.json',
          template: 'node_modules/angular-jsdoc/template'
        }
      }
    },
    jshint: {
      options: {
        jshintrc: true
      },
      main: {
        src: ['<%= jsFiles %>', 'www/{*,components/*}/*.spec.js']
      }
    },
    jscs: {
      main: {
        src: ['<%= jsFiles %>', 'www/{*,components/*}/*.spec.js'],
        options: {
          config: '.jscsrc',
          fix: true
        }
      }
    },
    ngtemplates: {
      g4line: {
        cwd: 'www',
        src: '{*,components/*}/*.html',
        dest: 'build/temp/app.templates.js',
        options: {
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true
          }
        }
      }
    },
    concat: {
      main: {
        src: ['build/temp/app.full.min.js', '<%= ngtemplates.g4line.dest %>'],
        dest: 'build/temp/app.full.min.js'
      }
    },
    bump: {
      options: {
        files: ['config.xml', 'phonegap/config.xml'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release %VERSION%',
        commitFiles: ['package.json', 'config.xml', 'phonegap/config.xml'],
        createTag: false,
        tagName: '%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        pushTo: 'upstream',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
      }
    },
    babel: {
      options: {
        sourceMaps: true,
        presets: ['es2015']
      },
      files: {
        src: '<%= jsFiles %>'
      }
    }
  });

  // TODO: combine build tasks to one release build
  grunt.registerTask('build',
    ['clean:build', 'lint', 'minify:main', 'copy:main', 'doc',
      'compress:main']);

  grunt.registerTask('build-phonegap',
    ['clean:phonegap', 'lint', 'minify:main', 'copy:phonegap',
      'compress:phonegap']);

  grunt.registerTask('build-phonegap-mock',
    ['clean:phonegap', 'lint', 'minify:mock', 'copy:phonegap',
      'compress:phonegap']);

  grunt.registerTask('minify:main',
    ['ngAnnotate:main', 'ngtemplates', 'concat', 'clean:templates', 'uglify',
      'processhtml', 'htmlmin', 'cssmin']);

  grunt.registerTask('minify:mock',
    ['ngAnnotate:mock', 'ngtemplates', 'concat', 'clean:templates', 'uglify',
      'processhtml', 'htmlmin', 'cssmin']);

  grunt.registerTask('doc', ['jsdoc', 'copy:doc']);
  grunt.registerTask('lint', ['jshint', 'jscs']);
  grunt.registerTask('templates', ['ngtemplates']);
};
