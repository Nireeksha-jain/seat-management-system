class bookingDto {
    constructor(id, date, isActive = true, seatId, userId) {
        this.id = id;
        this.date = date;
        this.isActive = isActive;
        this.seatId = seatId;
        this.userId = userId;
    }
}

export default bookingDto;