const User = () => {
    return (
        <>
            <label>Username: </label>
            <input autoFocus required type="text" />
            <br/>

            <label>Email: </label>
            <input required type="email" />
            <br/>

            <label>Password: </label>
            <input required type="password" />
            <br/>

            <label>Confirm Password: </label>
            <input required type="password" />
        </>
    )
}

export default User;