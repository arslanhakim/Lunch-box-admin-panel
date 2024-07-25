export const TimeoutWarning = ({ isOpen, onRequestClose }) => {
    const onLogOffCall = () => {
        window.location.href = '/'
    }

    return (
        <div>
            <h2>Session Timeout</h2>
            <div>
                You're being timed out due to inactivity. Please choose to stay
                signed in or to logoff. Otherwise, you will be logged off
                automatically
            </div>
            <br />
            <button onClick={onLogOffCall}>Log off</button>
            <button onClick={onRequestClose}>Stay Logged In</button>
        </div>
    )
}
