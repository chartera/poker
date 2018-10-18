var exec = require('child_process').exec;
var path = require('path');
exports.config = {
  // See http://brunch.io/#documentation for docs.
  files: {
    javascripts: {
	joinTo: {	    
	    "js/shell.js": /^(js\/shell)/,
	    "js/head.js": /^(js\/head)/,
	    "js/content.js": /^(js\/content)/,
	    "js/auth.js": /^(js\/auth)/,
	    "js/moments.js": /^(js\/moments)/,
	    "js/home.js": /^(js\/home)/

	},

	order: {
         before: [
         ]
       }

    },
    stylesheets: {
	//joinTo: "css/app.css",
	joinTo: {
	    "css/poker.css": "css/*.css" , 
	} /*,
	order: {
	    after: ["css/app.css"] // concat app.css last
	}*/
    },

      templates: {
	joinTo: {
	    "js/shell.js": /^(js\/shell)/,
	    "js/head.js": /^(js\/head)/,
	    "js/content.js": /^(js\/content)/,
	    "js/auth.js": /^(js\/auth)/,
	    "js/moments.js": /^(js\/moments)/,
	    "js/home.js": /^(js\/home)/
	}
    }
  },

  hooks: {
      onCompile(generatedFiles, changedAssets) {
	  if(changedAssets[0] && changedAssets[0].path.includes("static/wasm/")){

	    let env =
		process.env["PATH"] +
		"<<path/to/emscripton>>";

	    var file = path.join(process.env.PWD,
				 "apps",
				 "fileserver",
				 "priv",
				 "static",
				 "templates",
				 "poker",
				 "wasm",
				 "src")

	    console.log("time to compile wasm poker");
	    // emcc main.c deal.c -s WASM=1 -o index.html
	    // emcmake cmake -H. -B../build  --> first time
	    // cmake --build ../build -- -j3 --> then
	    exec('cmake --build ../build -- -j3', {
		cwd: file,
		env: {'PATH': env}
	    }, function(error, stdout, stderr) {
		// work with result
		console.log("wasm compile finish", stdout || error || stderr);
		
	    });
	}
    },
  },

  conventions: {
    // This option sets where we should place non-css and non-js assets in.
    // By default, we set this to "/assets/static". Files in this directory
    // will b e copied to `paths.public`, which is "priv/static" by default.
    assets: /^(static)/
  },

  paths: {
    // Dependencies and current project directories to watch
      watched: ["static", "css", "js", "vendor", "wasm"],
    // Where to compile files to
    public: "../../priv/static/templates/poker"
  },

  // Configure your plugins
  plugins: { 
      babel: {
	  // Do not use ES6 compiler in vendor code
	  ignore: [/vendor/]
      },
      gzip: {
	  paths: {
	      javascript: 'js',
	      stylesheet: 'css'
	  },
	  removeOriginalFiles: true,
	  renameGzipFilesToOriginalFiles: false
      },
      
      autoReload: {
	  enabled: {
              css: true,
              js: true,
              assets: true
	  },
	  host: "localhost",
	  port: 5005,
	  forcewss: true,
	  delay: 3000
    }
  },

  modules: {
      autoRequire: {
	  "js/shell.js": ["js/shell/shell"]
      }
  },

  npm: {
    enabled: false
  }
};
