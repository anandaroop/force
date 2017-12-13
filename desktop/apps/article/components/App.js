import PropTypes from 'prop-types'
import React from 'react'
import { ArticleLayout } from './layouts/Article'
import { SeriesLayout } from './layouts/Series'
import { EditButton } from 'desktop/apps/article/components/EditButton'

export default class App extends React.Component {
  static propTypes = {
    article: PropTypes.object,
    isMobile: PropTypes.bool,
    isSuper: PropTypes.bool,
    subscribed: PropTypes.bool,
    templates: PropTypes.object
  }

  getArticleLayout = () => {
    const { article } = this.props

    switch (article.layout) {
      case 'series': {
        return <SeriesLayout {...this.props} />
      }
      default: {
        return <ArticleLayout {...this.props} />
      }
    }
  }

  render () {
    const { article } = this.props

    return (
      <div>
        <EditButton
          channelId={article.channel_id}
          slug={article.slug}
        />

        {this.getArticleLayout()}
      </div>
    )
  }
}
