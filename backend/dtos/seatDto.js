class seatDto {
    constructor(seatId, name, isActive = true) {
        this.seatId = seatId;
        this.name = name;
        this.isActive = isActive;
    }
}

export default seatDto;