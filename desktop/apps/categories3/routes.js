import App from './components/App'
import { renderReactLayout } from 'desktop/components/react/utils/renderReactLayout'
import metaphysics from 'lib/metaphysics.coffee'
import GeneFamiliesQuery from './queries/geneFamilies'
import FeaturedGenesQuery from './queries/featuredGenes'

export const index = async (req, res, next) => {
  try {
    const { gene_families: geneFamilies } = await metaphysics({
      query: GeneFamiliesQuery()
    })
    const { gene_families: allFeaturedGenesByFamily } = await metaphysics({
      query: FeaturedGenesQuery()
    })

    const layout = renderReactLayout({
      basePath: req.app.get('views'),
      blocks: {
        head: 'meta.jade',
        body: App
      },
      locals: {
        ...res.locals,
        assetPackage: 'categories3'
      },
      data: {
        geneFamilies,
        allFeaturedGenesByFamily
      }
    })

    res.send(layout)
  } catch (err) {
    next(err)
  }
}
