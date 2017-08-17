import _ from 'underscore'

export const alphabetizeGenes = genes => _.sortBy(genes, gene => gene.name)

export const featuredGenesForFamily = (familyName, featuredGenesList) => {
  return _.find(
    featuredGenesList,
    featuredGenesFamily => featuredGenesFamily.name === familyName
  )
}

export const scrollToFamily = e => {
  e.preventDefault()
  const hrefString = e.target.href
  const scrollToElementId = hrefString.substring(hrefString.lastIndexOf('#') + 1)
  const scrollToElement = document.getElementById(scrollToElementId)
  const bodyRect = document.body.getBoundingClientRect()
  const elemRect = scrollToElement.getBoundingClientRect()
  const offset = elemRect.top - bodyRect.top
  scrollTo(document.body, offset, 200)
}

export const scrollTo = (element, target, duration) => {
  target = Math.round(target)
  duration = Math.round(duration)
  // invalid duration
  if (duration < 0) {
    return
  }
  // instant scroll
  if (duration === 0) {
    element.scrollTop = target
    return
  }

  const startTime = Date.now()
  const endTime = startTime + duration

  const startTop = element.scrollTop
  const distance = target - startTop

  // based on http://en.wikipedia.org/wiki/Smoothstep
  const smoothStep = (start, end, point) => {
    if (point <= start) {
      return 0
    }
    if (point >= end) {
      return 1
    }
    const x = (point - start) / (end - start) // interpolation
    return x * x * (3 - 2 * x)
  }

  let previousTop = element.scrollTop

  const scrollFrame = () => {
    // animation was interrupted by other actions
    if (element.scrollTop != previousTop) {
      return
    }

    // set the scrollTop for this frame
    const now = Date.now()
    const point = smoothStep(startTime, endTime, now)
    const frameTop = Math.round(startTop + distance * point)
    element.scrollTop = frameTop

    // check if we're done!
    if (now >= endTime) {
      return
    }

    // If we were supposed to scroll but didn't, then we
    // probably hit the limit, so consider it done;
    if (element.scrollTop === previousTop && element.scrollTop !== frameTop) {
      return
    }

    previousTop = element.scrollTop

    // schedule next frame for execution
    window.requestAnimationFrame(scrollFrame)
  }

  // start the animation process
  scrollFrame()
}
