const Notification = ({message, messageType}) => {
    const stylesSuccess = {
        padding: '15px 30px',
        background: 'lightgray',
        margin: '10px 0',
        border: 'solid 2px green',
        color: 'green',
        borderRadius: '4px'
    }
    const stylesError = {
        padding: '15px 30px',
        background: 'lightgray',
        margin: '10px 0',
        border: 'solid 2px red',
        color: 'red',

    }
    if (message === null) {
        return null
    }
    switch (messageType) {
        case 'success':
            return (<div style={stylesSuccess}>{message}</div>)
        case 'error':
            return (<div style={stylesError}>{message}</div>)
    }
}
export default Notification