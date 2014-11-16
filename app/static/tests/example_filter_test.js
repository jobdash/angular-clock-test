describe('ExampleFilterTest', function () {
    'use strict';

    var $filter;

    beforeEach(module('JobDashClock'));

    beforeEach(inject(function (_$filter_) {
        $filter = _$filter_;
    }));

    describe('objectAnd filter', function () {

        it('should take the boolean AND of each property on an object', function () {
            var testObjTrue = {
                value1: true,
                value2: true
            };

            var testObjFalse = {
                value1: true,
                value2: false
            };

            var resultTrue = $filter('objectAnd')(testObjTrue);
            expect(resultTrue).toBe(true);

            var resultFalse = $filter('objectAnd')(testObjFalse);
            expect(resultFalse).toBe(false);

        });
    });
});
