
const NameInfo = () => {
    return (
        <>
            <label>First Name: </label>
            <input autoFocus required type="text" />
            <br />

            <label>Middle Name: </label>
            <input type="text" />
            <br/>

            <label>Last Name: </label>
            <input required type="text" />

            <label>Date of Birth: </label>
            <input required type="date" />

            <label>SSN: </label>
            <input required type="text" />

            <label>Gender: </label>
            <select>
                {/**Finish this... */}
            </select>
        </>
    )
}

export default NameInfo;