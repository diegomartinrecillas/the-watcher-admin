// React
import React from 'react';

// Styles
const styles = {
    innerContainer: {
        display: 'inline-block',
        width: '100%',
        maxWidth: 400
    }
}
const InnerContainer = (props) => {
    return (
        <div style={styles.innerContainer}>
            {props.children}
        </div>
    )
}

export default InnerContainer;
