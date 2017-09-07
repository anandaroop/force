import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import GeneFamilyNav from './GeneFamilyNav'
import TAGPContent from './TAGPContent'

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
`
class App extends Component {
  static propTypes = {
    geneFamilies: PropTypes.array.isRequired,
    allFeaturedGenesByFamily: PropTypes.array.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      highlightedFamily: null
    }
    this.highlightFamily = this.highlightFamily.bind(this)
  }

  highlightFamily (id) {
    this.setState({
      highlightedFamily: id
    })
  }

  render () {
    const { geneFamilies, allFeaturedGenesByFamily } = this.props
    const { highlightedFamily } = this.state
    return (
      <Layout>
        <GeneFamilyNav
          geneFamilies={geneFamilies}
          highlightedFamily={highlightedFamily}
        />
        <TAGPContent
          geneFamilies={geneFamilies}
          allFeaturedGenesByFamily={allFeaturedGenesByFamily}
          onHighlightFamily={this.highlightFamily}
        />
      </Layout>
    )
  }
}

export default App
