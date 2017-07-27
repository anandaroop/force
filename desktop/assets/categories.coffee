require('backbone').$ = $

routes =
  '''
  /categories$
  /category$
  /gene$
  ''': require('../apps/categories/client.coffee').init

  '''
  /categories2$
  ''': require('../apps/categories2/client/index.coffee').init

  '''
  /categories2b$
  ''': require('../apps/categories2b/client.js').default

  '''
  /tag
  ''': require('../apps/tag/client.js').default.init

  '''
  /gene/.*
  ''': require('../apps/gene/client.js').default.setupGenePage

for paths, init of routes
  for path in paths.split('\n')
    $(init) if location.pathname.match path
