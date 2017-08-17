import React from 'react'

const FeaturedGene = ({ title, href, image: { url: imageSrc } }) => {
  return (
    <div>
      <a href={href}>
        {title}
      </a>
      <img src={imageSrc} />
    </div>
  )
}

export default FeaturedGene
