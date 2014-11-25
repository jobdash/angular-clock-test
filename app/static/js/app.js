angular.module('JobDashClock', ['ngMaterial'])

.controller('TimeCtrl', [
    '$timeout',
    function ($timeout) {
        /**
        *   Create a clock.
        *
        *   Contains methods for adding and removing alarms.
        *
        */
        var self = this;
        self.time = "Loading ...";
        self.tickInterval = 1000; // ms
        // self.phones = 3;
        self.tick = function() {
            self.time = moment() // get the current time
            $timeout(self.tick, self.tickInterval); // reset the timer
        }

        // Start the timer
        $timeout(self.tick, self.tickInterval);


        self.alarms = [];
        self.newAlarm = new Date();
        self.alarmTest = false;

        self.addAlarm = function () {
            var alarm = moment(self.newAlarm);
            var alertTimer;

            if (moment().isBefore(alarm)) {
                alertTimer = $timeout(
                    function() {
                        alert('Alarm!');
                        self.alarmTest = true;
                    },
                    alarm.diff(moment()) // ms between the alarm time and now
                )
            }

            console.log(alertTimer);

            self.alarms.push({
                value: self.newAlarm,
                alertTimer: alertTimer
            });
            self.newAlarm = new Date();

        }

        self.removeAlarm = function (idx) {
            var alarm = self.alarms.splice(idx, 1);
            $timeout.cancel(alarm[0].alertTimer);
        }

    }
])

.filter('clockDisplay', function() {
    /**
    *   Created a formatted string from a date or moment object
    */
    return function (datetime) {
        if (typeof datetime == 'string'){
            // leave the value alone.
            return datetime
        } if(datetime.format != undefined){
            // use the moment objects format method to render a formated string
            return datetime.format("MMMM Do YYYY, h:mm:ss a");
        } else {
            // assume that datetime is a date object and format it using moment
            return moment(datetime).format("MMMM Do YYYY, h:mm:ss a");
        }

    }
})

.filter('objectAnd', function() {
    /*
        Return the AND of all object values
    */
    return function(inputObj) {
        return _.reduce(inputObj,
                function(memo, value){ return memo && value}, true)
    }
})

.directive('datetimePicker', function () {
    /**
    *   Create a date and a time picker element but then combine them into
    *   a single model value.
    */
    return {
        require:'ngModel',
        replace:true,
        scope: {
            model: '=ngModel'
        },
        templateUrl: '/static/partials/datetime-picker.html',
        link: function (scope, elem, attrs, ctrl) {
            scope.$watch('applydate', function (newValue, oldValue) {
                // do not do anything if the value hasn't actually changed.
                if(angular.equals(newValue, oldValue)) return;
                //merge date and time of interview application into 'when' variable
                ctrl.$setViewValue(scope.combine());
            })

            scope.$watch('applytime', function (newValue, oldValue) {
                // do not do anything if the value hasn't actually changed.
                if(angular.equals(newValue, oldValue)) return;
                //merge date and time of interview application into 'when' variable
                ctrl.$setViewValue(scope.combine());
            })

        },
        controller: function ($scope, $element, $attrs) {
            // set the initial values
            var now = moment().set('second', 0).set('millisecond', 0);
            $scope.applydate = now.toDate();
            $scope.applytime = now.toDate();
            $scope.model = now.toDate();

            $scope.required = false;
            if(_.has($attrs, 'required')){
                $scope.required = true;
            }

            $scope.combine = function () {
                // combine the date and the time into a single value
                var date_apply = moment($scope.applydate);
                var time_apply = moment($scope.applytime);

                date_apply.hour(time_apply.hour());
                date_apply.minute(time_apply.minute());

                return date_apply.toDate();
            }
        }
    }
})
