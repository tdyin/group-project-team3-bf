const Address = () => {
    return (
        <>
            <label>Street: </label>
            <input autoFocus type="text" required />
            <br/>

            <label>City: </label>
            <input required type="text" />
            <br/>

            <label>State: </label>
            <input required type="text" />
            <br />

            <label>Zip Code / Postal Code: </label>
            <input required type="text" />

            <label>Building # / Apartment #: </label>
            <input required type="text" />
        </>
    )
}

export default Address;