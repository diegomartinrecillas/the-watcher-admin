import React, {Component, PropTypes} from 'react';

export default class FBComments extends Component {

    static propTypes = {
        appId: PropTypes.string.isRequired,
        colorScheme: PropTypes.oneOf(['light', 'dark']),
        href: PropTypes.string.isRequired,
        locale: PropTypes.string,
        mobile: PropTypes.bool,
        numPosts: PropTypes.number,
        orderBy: PropTypes.oneOf(['social', 'reverse_time', 'time']),
        version: PropTypes.string,
        //width: PropTypes.number,
        xfbml: PropTypes.bool
    }

    static defaultProps = {
        colorScheme: 'light',
        locale: 'es_ES',
        numPosts: 10,
        orderBy: 'social',
        version: 'v2.8',
        width: 500,
        xfbml: true
    }

    componentDidMount() {
        if (window.FB) {
            window.FB.XFBML.parse();
        }
    }

    render() {
        const {colorScheme, href, mobile, numPosts, orderBy, width} = this.props;
        const mobileParam = mobile ? {'data-mobile': mobile} : {};
        const widthParam = width ? {'data-width': width} : {};
        return (
            <span>
                <div id="fb-root"></div>
                <div className="fb-comments"
                    data-href={href}
                    data-colorscheme={colorScheme}
                    data-numposts={numPosts}
                    data-order-by={orderBy}
                    {...mobileParam}
                    {...widthParam}></div>
            </span>
        );
    }
}
