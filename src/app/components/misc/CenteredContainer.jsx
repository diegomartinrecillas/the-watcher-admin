// React
import React from 'react';

// Styles
const styles = {
    centeredContainer: {
        paddingTop: '2%',
        paddingLeft: '2%',
        paddingRight: '2%',
        paddingBottom: '0%',
        textAlign: 'center',
    }
}
const CenteredContainer = (props) => {
    return (
        <div style={styles.centeredContainer}>
            {props.children}
        </div>
    )
}

export default CenteredContainer;
