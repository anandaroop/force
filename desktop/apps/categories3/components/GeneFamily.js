import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Waypoint from 'react-waypoint'

import Gene from './Gene'
import { alphabetizeGenes } from '../utils.js'
import FeaturedGenes from './FeaturedGenes'

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  genes: PropTypes.array.isRequired,
  featuredGenes: PropTypes.object,
  onHighlightFamily: PropTypes.func.isRequired
}

const GeneFamilyName = styled.h2`
  font-size: 37px;
  line-height: 1.2em;
`

const GeneList = styled.ul`
  margin: 1.5em 0;
  column-count: 1;

  @media (min-width: 768px) {
    column-count: 3;
    column-gap: 2em;
  }
`

class GeneFamily extends React.Component {
  constructor (props) {
    super(props)
    this.handleWaypointPositionChange = this.handleWaypointPositionChange.bind(this)
  }

  handleWaypointPositionChange ({ currentPosition, previousPosition }) {
    const { id, onHighlightFamily } = this.props
    const enteringAtTop =
      previousPosition === 'above' && currentPosition === 'inside'
    const exitingAtTop =
      previousPosition === 'inside' && currentPosition === 'above'
    if (enteringAtTop || exitingAtTop) onHighlightFamily(id)
  }

  render () {
    const { id, name, genes, featuredGenes } = this.props
    const sortedGenes = alphabetizeGenes(genes)
    return (
      <div id={id}>
        <Waypoint
          key={id}
          topOffset={95}
          onPositionChange={this.handleWaypointPositionChange}
        />
        <GeneFamilyName>{name}</GeneFamilyName>
        <FeaturedGenes featuredGenes={featuredGenes} />
        <GeneList>
          {sortedGenes.map(gene => <Gene key={gene.id} {...gene} />)}
        </GeneList>
      </div>
    )
  }
}

GeneFamily.propTypes = propTypes

export default GeneFamily
