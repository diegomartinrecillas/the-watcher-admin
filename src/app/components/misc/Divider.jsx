import React from 'react';

const styles = {
    divider: {
        maxWidth: '80%',
        height: 1,
        border: 'none',
        backgroundColor: 'rgb(224, 224, 224)'
    }
}

const Divider = () => {
    return (
        <hr style={styles.divider}/>
    );
}

export default Divider;
