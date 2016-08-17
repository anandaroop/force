module.exports.init = ->
  $('.js-categories-header-jump-link').click ->
    offset = $('#main-layout-header').outerHeight()
    top = $('.js-categories-az-header').offset().top - offset
    $('html, body').animate scrollTop: top

  $('.js-family-link').on 'click', ->
    selectedName = $(@).data('name')
    $('.js-family-link').removeClass('active')
    $(@).addClass('active')
    family = $('.gene-families__family[data-name="' + selectedName + '"]')

     # hack(athon)!
    if selectedName is 'Style or Movement'
      offset = 1000
    else
      offset = 100
    top = family.offset().top - offset
    $('html, body').animate scrollTop: top
