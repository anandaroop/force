Backbone        = require 'backbone'
Backbone.$      = $
HeaderView      = require './header/view.coffee'
FooterView      = require './footer/view.coffee'
sd              = require('sharify').data
analytics       = require '../../lib/analytics.coffee'
iframePopover   = require '../iframe_popover/index.coffee'

{ readCookie, createCookie } = require '../util/cookie.coffee'

module.exports = ->
  setupJquery()
  syncAuth()
  setupViews()

syncAuth = module.exports.syncAuth = ->
  # Log in to Force if you're logged in to Gravity
  if sd.AUTO_GRAVITY_LOGIN and not sd.CURRENT_USER
    $.ajax
      type: "POST"
      url: "#{sd.ARTSY_URL}/api/v1/me/trust_token"
      success: (response) ->
        $.ajax
          type: "POST"
          url: "/users/sign_in_trust_token?" +
               "token=#{response.trust_token}&redirect-to=#{window.location.pathname}"
          success: (response) ->
            window.location.reload()
  # Log out of Force if you're not logged in to Gravity
  if sd.CURRENT_USER
    $.ajax
      url: "#{sd.ARTSY_URL}/api/v1/me"
      error: -> window.location = '/users/sign_out'

setupAnalytics = ->
  # Initialize analytics & track page view if we included mixpanel
  # (not included in test environment).
  return if not mixpanel? or mixpanel is 'undefined'
  analytics(mixpanel: mixpanel, ga: ga)
  analytics.trackPageview()

  # Log a visit once per session
  unless readCookie('active_session')?
    createCookie 'active_session', true
    analytics.track.funnel if sd.CURRENT_USER
      'Visited logged in'
    else
      'Visited logged out'

setupViews = ->
  new HeaderView el: $('#main-layout-header'), $window: $(window), $body: $('body')
  new FooterView el: $('#main-layout-footer')

setupJquery = ->
  require '../../node_modules/typeahead.js/dist/typeahead.min.js'
  require 'jquery.transition'
  require 'jquery.fillwidth'
  require 'jquery.dotdotdot'
  require 'jquery.poplockit'
  require '../../lib/jquery/infinitescroll.coffee'
  require '../../lib/jquery/hidehover.coffee'
  $.ajaxSettings.headers =
    'X-XAPP-TOKEN'  : sd.ARTSY_XAPP_TOKEN
    'X-ACCESS-TOKEN': sd.CURRENT_USER?.accessToken


setupAnalytics()