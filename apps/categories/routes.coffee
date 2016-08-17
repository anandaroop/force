Q = require 'bluebird-q'
{ API_URL } = require('sharify').data
Items = require '../../collections/items'
Genes = require '../../collections/genes'
OrderedSets = require '../../collections/ordered_sets'

@index = (req, res) ->
  featuredGenes = new Items [], id: '51ba3bd10abd8521b3000049'
  geneCategories = new OrderedSets key: 'browse:gene-categories'
  genes = new Genes

  Q.all([
    featuredGenes.fetch(cache: true)
    geneCategories.fetchAll(cache: true)
    genes.fetchUntilEndInParallel(cache: true, data: published: true, sort: 'name')
  ]).done ->
    aToZGroup = genes.groupByAlphaWithColumns 3

    res.render 'index',
      featuredGenes: featuredGenes
      geneCategories: geneCategories
      aToZGroup: aToZGroup

@index2 = (req, res) ->
  featuredGenes = new Items [], id: '51ba3bd10abd8521b3000049'
  geneCategories = new OrderedSets key: 'browse:gene-categories'
  genes = new Genes

  # hackathon yolo
  geneFamilyOrderedSetMapping = {
    'Design Concepts and Techniques': '57b4edc7139b21352c005073'
    'Furniture & Lighting': '57b4ef2fcd530e65f70008ea'
    'Jewelry and Fashion Object Types': '57b4ef2fcd530e65f70008ea'
    'Materials': '57b4b2af139b21352c004ca7'
    'Medium and Techniques': '51ba3bcc0abd8521b300002f'
    'Style or Movement': '51ba3bcf0abd8521b300003e'
    'Subject Matter': '51ba3bcb0abd8521b3000022'
    'Tableware, Vessels, Objects': '57b4ebdb139b2135c00050c8'
    'Visual Qualities': '57b4b3977622dd65f80006dc'
    'Time Period': '57b4ec8db202a369610009de'
    'Geographic Region': '555cc2ab726169708aa50300'
    'Discipline': '57b4ecb0b202a369610009e0'
    'Antiquities, Artifacts and Religious Objects': '57b4ed478b3b811bc8004d29'
    'Cultural or Religious Styles': '57b4ed98b202a367ac000a9e'
  }


  Q.all([
    featuredGenes.fetch(cache: true)
    geneCategories.fetchAll(cache: true)
    genes.fetchUntilEndInParallel(cache: true, data: published: true, sort: 'name')
  ]).done ->
    geneFamilies = genes.groupByFamily()
    geneFamilyColumns = genes.groupByFamilyWithColumns 3

    res.render 'index2',
      featuredGenes: featuredGenes
      geneCategories: geneCategories
      genes: genes
      geneFamilies: geneFamilies
      geneFamilyColumns: geneFamilyColumns
      geneFamilyOrderedSetMapping: geneFamilyOrderedSetMapping

@redirectCategory = (req, res) ->
  res.redirect 301, req.url.replace 'category', 'categories'

@redirectGene = (req, res) ->
  res.redirect 301, req.url.replace 'gene', 'categories'
