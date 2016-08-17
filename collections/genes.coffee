_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Gene = require '../models/gene.coffee'
{ API_URL } = require('sharify').data
{ Fetch, AToZ } = require 'artsy-backbone-mixins'

module.exports = class Genes extends Backbone.Collection

  _.extend @prototype, AToZ
  _.extend @prototype, Fetch(API_URL)

  model: Gene

  url: "#{sd.API_URL}/api/v1/genes"

  groupByFamily: ->
    grouped = @groupBy (g) -> g.familyName()
    for familyName, genes of grouped
      {
        name: familyName
        genes: _.sortBy genes, (g) -> g.get('name')
      }

  groupByFamilyWithColumns: (numColumns = 3) ->
    families = @groupByFamily()

    toCols = (numCols, arr) ->
      columns = []
      columnLength = Math.ceil(arr.length/numCols)
      for i in [0..(numCols-1)]
        columns[i] = arr.slice i*columnLength, (i+1)*columnLength
      columns

    familyColumns = for family in families
      {
        name: family.name
        columns: toCols(numColumns, family.genes)
      }
