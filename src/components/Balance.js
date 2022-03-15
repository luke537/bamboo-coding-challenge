const Balance = ({ user }) => {
    return (
        <>
        <h3>Welcome, {user.firstName}</h3>
        <p>Balance: {user.balance}</p>
        </>
    );
}

export default Balance;