class userDto {
    constructor(id, clarkId, email, firstName, lastName, role, password, isActive = true, phoneNumber) {
        this.id = id;
        this.clarkId = clarkId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.password = password;
        this.isActive = isActive;   
        this.phoneNumber = phoneNumber;
    }
}

export default userDto;