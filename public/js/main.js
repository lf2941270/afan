
// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
	paths: {
		"jquery": "http://cdn.bootcss.com/jquery/1.11.2/jquery.min",
		"underscore": "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min",
		"backbone": "https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min",
		"bootstrap": "http://cdn.bootcss.com/bootstrap/3.3.2/js/bootstrap.min",
		"avoscloud": "https://leancloud.cn/scripts/lib/av-0.4.7.min"
	},
	shim: {
		'backbone': {
			//These script dependencies should be loaded before loading
			//backbone.js
			deps: ['underscore', 'jquery'],
			//Once loaded, use the global 'Backbone' as the
			//module value.
			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		},
		'bootstrap': {
			deps: ['jquery']
		}
	}
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app']);



