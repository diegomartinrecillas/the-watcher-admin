import React, { PropTypes } from 'react';

export default class FBPage extends React.Component {

    static propTypes = {
        adaptContainerWidth: PropTypes.bool,
        appId: PropTypes.string.isRequired,
        height: PropTypes.number,
        hideCover: PropTypes.bool,
        hideCta: PropTypes.bool,
        href: PropTypes.string.isRequired,
        locale: PropTypes.string,
        showFacepile: PropTypes.bool,
        smallHeader: PropTypes.bool,
        tabs: PropTypes.arrayOf(PropTypes.string),
        version: PropTypes.string,
        width: PropTypes.number,
        xfbml: PropTypes.bool

    }

    static defaultProps = {
        adaptContainerWidth: true,
        locale: 'es_ES',
        height: 500,
        hideCover: false,
        hideCta: true,
        showFacepile: false,
        smallHeader: false,
        tabs: ['timeline'],
        version: 'v2.8',
        width: 340,
        xfbml: true
    }

    componentDidMount() {
        if (window.FB) {
            window.FB.XFBML.parse()
        }
    }

    render() {
        const {adaptContainerWidth, height, hideCover, hideCta, href, showFacepile, smallHeader, tabs, width} = this.props;
        return (
            <span>
                <div id="fb-root"></div>
                <div className="fb-page"
                    data-href={href}
                    data-width={width}
                    data-height={height}
                    data-adapt-container-width={adaptContainerWidth}
                    data-tabs={tabs.join()}
                    data-hide-cover={hideCover}
                    data-show-facepile={showFacepile}
                    data-hide-cta={hideCta}
                    data-small-header={smallHeader}
                    ></div>
            </span>
        );
    }
}
