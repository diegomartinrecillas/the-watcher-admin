// React
import React from 'react';
// Material UI Components
import FlatButton from 'material-ui/FlatButton';
// My Components
import ArrowBack from 'app/components/misc/ArrowBack';
// Colors
import { primary, accent } from 'app/styles/colors';


const styles = {
    container: {
        paddingTop: '2%',
        paddingLeft: '2%',
        paddingRight: '2%',
        paddingBottom: '0%',
        textAlign: 'center',
    },
    innerContainer: {
        display: 'inline-block',
        width: '100%',
        maxWidth: 400
    },
    title: {
        paddingTop: '12%',
        paddingBottom: '5%',
        fontSize: 30,
        fontWeight: 500,
        color: primary
    },
    legend: {
        color: 'grey',
        paddingTop: '5%',
        paddingLeft: '10%',
        paddingRight: '10%',
        textAlign: 'center'
    },
    button: {
        margin: 12,
        width: '70%',
        height: 50
    },
    divider: {
        maxWidth: '80%',
        height: 1,
        border: 'none',
        backgroundColor: 'rgb(224, 224, 224)'
    },
    spacer: {
        height: '5vh'
    }
}

export default class Error extends React.Component {
    render() {
        return (
            <div style={styles.container} className='root background'>
                <ArrowBack/>
                <div style={styles.innerContainer}>
                    <section style={styles.title}>
                        <strong>404</strong>
                    </section>
                    <section style={styles.legend}>
                        Esta sección no existe.
                    </section>
                </div>
            </div>
        )
    }
}
