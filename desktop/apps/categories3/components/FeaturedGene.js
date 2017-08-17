import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  overflow: hidden;
`

const GeneLink = styled.a`
  position: absolute;
  left: 1em;
  bottom: 1em;
  text-decoration: none;

  color: white;
  text-shadow: 0 0 10px rgba(0,0,0, 0.7);

  font-family: 'ITC Avant Garde Gothic W04', 'AvantGardeGothicITCW01D 731075',
    'AvantGardeGothicITCW01Dm', 'Helvetica', 'sans-serif';
  font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 1px;

  font-size: 13px;
  line-height: 1.33em;
  font-weight: bold;
`

const GeneImage = styled.img`width: 90%;`

const FeaturedGene = ({ title, href, image: { url: imageSrc } }) => {
  return (
    <Container>
      <GeneLink href={href}>
        {title}
      </GeneLink>
      <GeneImage src={imageSrc} />
    </Container>
  )
}

export default FeaturedGene
