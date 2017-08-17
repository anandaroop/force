import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import TAGPIntro from './TAGPIntro'
import GeneFamilies from './GeneFamilies'

const ResponsiveContent = styled.main`
  width: 100%;

  @media (min-width: 768px) {
    width: 74%;
  }
`
const propTypes = {
  geneFamilies: PropTypes.array.isRequired
}
const TAGPContent = ({ geneFamilies, allFeaturedGenesByFamily }) => {
  return (
    <ResponsiveContent>
      <TAGPIntro />
      <GeneFamilies geneFamilies={geneFamilies} allFeaturedGenesByFamily={allFeaturedGenesByFamily} />
    </ResponsiveContent>
  )
}

TAGPContent.propTypes = propTypes

export default TAGPContent
