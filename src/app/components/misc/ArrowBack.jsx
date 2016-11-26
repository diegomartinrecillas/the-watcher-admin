// React
import React from 'react';
// React Router
import { hashHistory } from 'react-router';
// Material UI Components
import IconButton from 'material-ui/IconButton';
// Material Icons
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
// Colors
import { primary, accent } from 'app/styles/colors';

const styles = {
    icon: {
        width: 40,
        height: 40,
        color: primary
    },
    iconButton: {
        position: 'relative',
        width: 80,
        height: 80,
        padding: 20,
    }
}

const ArrowBack = () => {
    const goBack = () => {
        hashHistory.goBack();
    };
    return (
        <IconButton
            onClick={goBack}
            iconStyle={styles.icon}
            style={styles.iconButton}
            >
            <ArrowBackIcon />
        </IconButton>
    );
}

export default ArrowBack;
