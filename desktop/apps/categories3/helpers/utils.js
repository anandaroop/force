import _ from 'underscore'

export const alphabetizeGenes = genes => _.sortBy(genes, gene => gene.name)

export const featuredGenesForFamily = (familyName, featuredGenesList) => {
  // console.log(featuredGenesList)
  return _.find(
    featuredGenesList,
    featuredGenesFamily => featuredGenesFamily.name === familyName
  )
}
