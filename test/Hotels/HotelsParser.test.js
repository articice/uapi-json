var proxy  = require('proxyquire'),
    sinon  = require('sinon'),
    assert = require('assert'),
    moment = require('moment');

var HotelsParser = require('../../lib/Hotels/HotelsParser');

describe('#HotelsParser', function () {
    describe('searchParse()', function () {
        it('give response object', function () {
            var searchRepsone = require('../FakeResponses/search');
            var hotels = HotelsParser.HOTELS_SEARCH_REQUEST(searchRepsone);
            assert.notEqual(hotels.hotels, undefined, 'Hotels are not defined');
            assert.equal(hotels.hotels.length, 971, 'Not equal length');
            // assert.notEqual(hotels.nextResult, undefined, 'No next reference');
            var images = hotels.hotels.filter(function(elem) {
                if (elem.Icon == 'avc') return elem;
            });

            hotels.hotels.map(function(hotel) {
                assert.notEqual(hotel.HotelCode, undefined, 'No hotel code');
                assert.notEqual(hotel.HotelChain, undefined, 'No hotel chain');
                assert.notEqual(hotel.VendorLocationKey, undefined, 'No vendorlocation key');
                assert.notEqual(hotel.Name, undefined, 'No name');
                assert.notEqual(hotel.Description, undefined, 'No description');
                assert.notEqual(hotel.HotelRating, undefined, 'No rating for hotel(stars)');
                assert.notEqual(hotel.Location.lat, undefined, 'No location');
                assert.notEqual(hotel.Location.lng, undefined, 'No location');
                assert.equal(hotel.Rates.constructor, Array, 'No rates');
                hotel.Rates.forEach(function(rate){
                    assert.notEqual(rate.ApproximateMinimumStayAmount.value, undefined, 'no min sum in rate');
                    assert.notEqual(rate.RateSupplier, undefined, 'no rate supplier');
                    assert.notEqual(rate.RateSupplierLogo, undefined, 'no rate logo');
                    assert.notEqual(rate.PaymentType, undefined, 'no rate type');
                });
                assert.notEqual(hotel.Address, undefined, 'No address');
                assert.notEqual(hotel.Amenties, undefined, 'No amenties');
            });
            assert.equal(hotels.hasOwnProperty('HostToken'), true, 'No host token');
        });
    });

    describe('searchGalileoParse()', function () {
        it('pass without errors', function () {
            var searchRepsone = require('../FakeResponses/1gsearch');
            var hotels = HotelsParser.HOTELS_SEARCH_GALILEO_REQUEST(searchRepsone);
            assert.notEqual(hotels.hotels, undefined, 'Hotels are not defined');
            assert.equal(hotels.hotels.length, 2, 'Not equal length');
            hotels.hotels.map(function(hotel) {
                assert.notEqual(hotel.HotelCode, undefined, 'No hotel code');
                assert.notEqual(hotel.HotelChain, undefined, 'No hotel chain');
                assert.notEqual(hotel.VendorLocationKey, undefined, 'No vendorlocation key');
                assert.notEqual(hotel.Name, undefined, 'No name');
                assert.equal(hotel.Rates.constructor, Array, 'No rates');
                hotel.Rates.forEach(function(rate){
                    assert.notEqual(rate.ApproximateMinimumStayAmount.value, undefined, 'no min sum in rate');
                    assert.notEqual(rate.RateSupplier, undefined, 'no rate supplier');
                    assert.notEqual(rate.PaymentType, undefined, 'no rate type');
                });
                assert.notEqual(hotel.Address, undefined, 'No address');
                assert.notEqual(hotel.Amenties, undefined, 'No amenties');
            });
        });
    });

    describe('rateParse()', function () {
        it('give response object', function () {
        var rateResponse = require('../FakeResponses/rate');
        var result = HotelsParser.HOTELS_RATE_REQUEST(rateResponse);
            assert.notEqual(result.HostToken, undefined, 'No host token');
            assert.equal(result.Comments.constructor, Array, 'No comments');
            result.Comments.map(function(comment) {
                assert.notEqual(comment.text, undefined, 'No comment text');
                assert.notEqual(comment.date, undefined, 'No comment date');
                assert.notEqual(comment.language, undefined, 'No comment language');
                assert.notEqual(comment.id, undefined, 'No comment id');
            })
            result.Agregators.map(function(rates) {
                assert.notEqual(rates.media, undefined, 'Images are not defined');
                assert.notEqual(rates.hotel.HotelCode, undefined, 'No hotel code');
                assert.notEqual(rates.hotel.HotelChain, undefined, 'No hotel chain');
                assert.notEqual(rates.hotel.Name, undefined, 'No name');
                assert.notEqual(rates.hotel.Address, undefined, 'No address');
                assert.equal(rates.DetailItem.constructor, Object, 'No details');
                assert.equal(rates.RateDetail.constructor, Array, 'No rates');
                rates.RateDetail.map(function(rate) {
                    assert.notEqual(rate.RatePlanType, undefined, 'No RatePlanType');
                    assert.notEqual(rate.Base.value, undefined, 'No Base');
                    assert.notEqual(rate.Tax.value, undefined, 'No Tax');
                    assert.notEqual(rate.Total.value, undefined, 'No Total');
                    assert.notEqual(rate.Surcharge.value, undefined, 'No Surcharge');
                    assert.notEqual(rate.RateSupplier, undefined, 'No RateSupplier');
                    assert.notEqual(rate.RateOfferId, undefined, 'No RateOfferId');
                    assert.notEqual(rate.BookableQuantity, undefined, 'No BookableQuantity');
                    assert.notEqual(rate.Capacity, undefined, 'No Capacity');
                    assert.notEqual(rate.GuaranteeInfo, undefined, 'No GuaranteeInfo');
                    assert.notEqual(rate.CancelInfo, undefined, 'No CancelInfo');
                    assert.equal(rate.RoomRateDescription.constructor, Object, 'No RoomRateDescription');
                    assert.notEqual(rate.RoomRateDescription.SupplierTermsandConditions, undefined, 'No SupplierTermsandConditions in RoomRateDescription');
                    assert.notEqual(rate.RoomRateDescription.RateDescription, undefined, 'No RateDescription in RoomRateDescription');
                    assert.notEqual(rate.RoomRateDescription.RoomType, undefined, 'No RoomType in RoomRateDescription');
                    assert.notEqual(rate.RoomRateDescription.Description, undefined, 'No Description in RoomRateDescription');
                    assert.notEqual(rate.RoomRateDescription.CommissionAmount, undefined, 'No Commission Amount in RoomRateDescription');
                    assert.notEqual(rate.RoomRateDescription.SupplierTermsandConditions, undefined, 'No Deposit Amount in RoomRateDescription');
                });
            });
        });
    });

    describe('bookParse()', function () {
        it('give response object', function () {
        var bookResponse = require('../FakeResponses/book');
        var result = HotelsParser.HOTELS_BOOK_REQUEST(bookResponse);
            assert.notEqual(result.LocatorCode, undefined, 'No LocatorCode');
            assert.notEqual(result.Status, undefined, 'No Status');

            assert.notEqual(result.ProviderReservationInfo, undefined, 'No ProviderReservationInfo');
            assert.equal(result.ProviderReservationInfo.constructor, Object, 'No ProviderReservationInfo');
            assert.notEqual(result.ProviderReservationInfo.LocatorCode, undefined, 'No LocatorCode in ProviderReservationInfo');
            assert.notEqual(result.ProviderReservationInfo.CreateDate, undefined, 'No CreateDate in ProviderReservationInfo');
            assert.notEqual(result.ProviderReservationInfo.ProviderCode, undefined, 'No ProviderCode in ProviderReservationInfo');

            assert.equal(result.HotelReservation.constructor, Object, 'No ProviderReservationInfo');
            assert.notEqual(result.HotelReservation.Status, undefined, 'No Status in HotelReservation');
            assert.notEqual(result.HotelReservation.AggregatorBookingStatus, undefined, 'No LocatorCode in HotelReservation');
            assert.notEqual(result.HotelReservation.LocatorCode, undefined, 'No LocatorCode in HotelReservation');
            assert.notEqual(result.HotelReservation.CreateDate, undefined, 'No CreateDate in HotelReservation');
            assert.notEqual(result.HotelReservation.BookingConfirmation, undefined, 'No BookingConfirmation in HotelReservation');
        });
    });

    describe('cancelBookParse()', function () {
        it('give response object', function () {
        var cancelBookResponse = require('../FakeResponses/cancel');
        var result = HotelsParser.HOTELS_CANCEL_BOOK_REQUEST(cancelBookResponse);
            assert.notEqual(result.Cancelled, undefined, 'No Cancelled');
            assert.notEqual(result.CreateDate, undefined, 'No CreateDate');
        });
    });

    describe('errors test', function () {
        it('search error test', function (done) {
            try{
                var result = HotelsParser.HOTELS_SEARCH_REQUEST({});
            }catch(e) {
                assert(e.errno === 151);
                done();
            }
        });
        it('rate error test', function (done) {
            try{
                var result = HotelsParser.HOTELS_RATE_REQUEST({});
            }catch(e) {
                assert(e.errno === 153);
                done();
            }
        });
        it('book error test', function (done) {
            try{
                var result = HotelsParser.HOTELS_BOOK_REQUEST({});
            }catch(e) {
                assert(e.errno === 154);
                done();
            }
        });

        it('cancel book error test', function (done) {
            try{
                var result = HotelsParser.HOTELS_CANCEL_BOOK_REQUEST({});
            }catch(e) {
                assert(e.errno === 155);
                done();
            }
        });
    });
});