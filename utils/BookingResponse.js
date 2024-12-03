class BookingResponse {
    constructor(isSuccessful, message, bookingDetails) {
        this.isSuccessful = isSuccessful;
        this.message = message;
        this.bookingDetails = bookingDetails;
    }
}

export default BookingResponse;