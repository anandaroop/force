import React from 'react'
import PropTypes from 'prop-types'

import GeneFamily from './GeneFamily'
import { featuredGenesForFamily } from '../utils.js'

const propTypes = {
  geneFamilies: PropTypes.array.isRequired,
  allFeaturedGenesByFamily: PropTypes.array.isRequired,
  onHighlightFamily: PropTypes.func.isRequired
}

const GeneFamilies = ({ geneFamilies, allFeaturedGenesByFamily, onHighlightFamily }) => {
  return (
    <div>
      {geneFamilies.map(geneFamily => {
        const featuredGenes = featuredGenesForFamily(geneFamily.name, allFeaturedGenesByFamily)
        return (
          <GeneFamily
            key={geneFamily.id}
            featuredGenes={featuredGenes}
            {...geneFamily}
            onHighlightFamily={onHighlightFamily}
          />
        )
      })}
    </div>
  )
}

GeneFamilies.propTypes = propTypes

export default GeneFamilies
