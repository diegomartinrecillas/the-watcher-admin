import React from 'react';

const styles = {
    subtitle: {
        textAlign: 'left',
        color: '#424242',
        fontSize: 24
    },
    underline: {
        border: 0,
        height: 1,
        background: '#333',
        backgroundImage: 'linear-gradient(to right, #ccc, #333, #ccc)'
    }
}

const Subtitle = (props) => {
    return (
        <div style={props.style} className={props.className}>
            <section style={styles.subtitle}>
                {props.text}
            </section>
            <hr style={styles.underline}/>
        </div>
    );
}

Subtitle.propTypes = {
  text: React.PropTypes.string.isRequired,
  style: React.PropTypes.object,
  className: React.PropTypes.string
};

export default Subtitle;
