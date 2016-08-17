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
    'Subject Matter': '51ba3bcb0abd8521b3000022'
    'Medium and Techniques': '51ba3bcc0abd8521b300002f'
    'Style or Movement': '51ba3bcf0abd8521b300003e'
    'Geographic Region': '555cc2ab726169708aa50300'
    'Materials': '57b4b2af139b21352c004ca7'
    'Visual Qualities': '57b4b3977622dd65f80006dc'
    # 'Design Concepts and Techniques': 'tk'
    # 'Furniture & Lighting': 'tk'
    # 'Jewelry and Fashion Object Types': 'tk'
    # 'Tableware, Vessels, Objects': 'tk'
    # 'Textiles': 'tk'
    # 'Time Period': 'tk'
    # 'Artistic Discipline': 'tk'
    # 'Antiquities, Artifacts and Religious Objects': 'tk'
    # 'Cultural or Religious Styles'    : 'tk'
  }


  Q.all([
    featuredGenes.fetch(cache: true)
    geneCategories.fetchAll(cache: true)
    genes.fetchUntilEndInParallel(cache: true, data: published: true, sort: 'name')
  ]).done ->
    geneFamilies = genes.groupByFamily()
    geneFamilyColumns = genes.groupByFamilyWithColumns 4

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
