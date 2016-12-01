const linkState = (component, key) => {
    const createHandler = (component, key) => {
        return (event) => {
            const element = event.target;
            const value = element.type === 'checkbox' ? element.checked : element.value;
            component.setState({
                [key]: value
            });
        };
    }
    const cache = component.__linkStateHandlers ||
    (component.__linkStateHandlers = {});

    return cache[key] || (cache[key] = createHandler(component, key));
};

export default linkState;
