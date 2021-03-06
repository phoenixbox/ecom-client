var _ = require('lodash');
var Hapi = require('hapi');
var server = new Hapi.Server();
var path = require('path');
var config = require('config');
var url = require('url');
var http = require("http");

server.connection({
  host: '0.0.0.0',
  port: process.env.PORT || 3700,
  routes: { cors: true }
});

server.views({
  engines: {
    html: require('swig')
  },
  path: path.join(__dirname, 'views'),
  isCached: process.env.NODE_ENV === 'production',
  compileOptions: {
    isPretty: true
  }
});

var plugins = [
  {
    register: require('good'),
    options: {
      opsInterval: 1000,
      reporters: [
        {
          reporter: require('good-console'),
          args: [{ log: '*', response: '*', error: '*' }]
        }
      ]
    }
  },
  require('./lib/oauth'),
  require('./lib/facebook'),
  require('./lib/api/user'),
]

server.register(plugins
  , function(err) {
  if (err) {
    throw err;
  }

  server.route([
    {
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        if (request.auth.isAuthenticated) {
          reply.redirect('/inviter')
        } else {
          var viewVars = internals.viewVars(request);
          reply.view('home.html', viewVars);
        }
      }
    },
    {
      method: 'GET',
      path: '/inviter',
      config: {
        auth: 'session'
      },
      handler: function (request, reply) {
        var viewVars = internals.viewVars(request);
        // Template has the client JS
        reply.view('eventercom.html', viewVars);
      }
    },
    {
      method: 'GET',
      path: '/login',
      handler: function (request, reply) {
        console.log('CREDS AT LOGIN: ', request.auth.credentials);

        var viewVars = internals.viewVars(request);
        reply.view('login.html', viewVars);
      }
    },
    {
        method: 'GET',
        path: '/{p*}',
        handler: {
          directory: {
            path: 'public'
          }
        }
      }
  ]);

  server.start(function () {
    console.log('Server running at:', server.info.uri);
  })
})

module.exports.server = server;


var internals = {
  viewVars: function(request) {
    var creds = request.auth.credentials ? internals.pluckAuthAttrs(request.auth.credentials.profile) : {};

    if (process.env.NODE_ENV === 'production') {
      _.assign(creds, {prod: true})
    }

    return creds
  },

  pluckAuthAttrs: function(profile) {
    var authAttrs = ['access_token', 'uuid', 'name', 'email'];

    return _.reduce(profile, function(memo, val, key) {
      if (_.contains(authAttrs, key)) {
        memo[key] = val;
      }

      return memo;
    }, {});
  }
}

module.exports.internals = internals;
