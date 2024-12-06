const bookingController = require('./bookingController');

describe('bookingController', () => {
    it('should create a booking successfully', () => {
        const result = bookingController.createBooking({ /* booking data */ });
        expect(result).toEqual({ /* expected result */ });
    });

    it('should throw an error for invalid booking data', () => {
        expect(() => bookingController.createBooking({ /* invalid data */ })).toThrow();
    });
});