describe('controller: TimeCtrl', function(){

  beforeEach(module('JobDashClock'));

  it('should create an alarm that will activate in two seconds and then remove said alarm', inject(function($controller) {
    var scope = {},
    ctrl = new $controller('TimeCtrl', {$scope:scope});
    // testAlarm = new Date();
    testTime = moment();
    ctrl.newAlarm = moment();
    ctrl.newAlarm.add(2, 'seconds');  //creates an alarm that will activate two seconds after creation
    ctrl.addAlarm();
    expect(ctrl.alarms[0].value.format()).toBe(testTime.add(2, 'seconds').format())
    setTimeout(function() { expect(ctrl.newAlarm).toBe(true); }, 2010);  //tests to see if the alarm has activated after two seconds.
  }))
})


describe('filter: clockDisplay', function() {

  beforeEach(module('JobDashClock'));

  beforeEach(inject(function(_clockDisplayFilter_) {
    clockDisplayFilter = _clockDisplayFilter_;
  }))

  it('should create a formatted string from a date or moment object', function() {

    //  if the value is a string, it should be unchanged
    expect(clockDisplayFilter('February 8th 2013, 9:30:00 am')).toBe('February 8th 2013, 9:30:00 am');

    // if the value is a Moment object, it should return a formated string
    expect(clockDisplayFilter(moment('2013-02-08 09:30'))).toBe('February 8th 2013, 9:30:00 am');

    // if the value is a Date object, it should return a formated string
    var testTime = new Date(2013, 01, 08, 9, 30);
    expect(clockDisplayFilter(testTime)).toBe('February 8th 2013, 9:30:00 am');

  })
})


describe('directive: datetimePicker', function() {

  beforeEach(module('JobDashClock'));

  beforeEach(inject(function(_$rootScope_, _$compile_, _$httpBackend_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    $httpBackend = _$httpBackend_;
    scope = $rootScope;
  }));

  it('should fill the date form with the current date', function() {
    $httpBackend.when('GET', '/static/partials/datetime-picker.html').respond('yes');
    element = $compile('<span datetime-picker ng-model="clock.newAlarm"></span>')(scope)
    scope.$digest();
    console.log(element);
    console.log(element.find('label'));
    console.log(element.find('clock.newAlarm'));
    console.log(element.find('applytime'));


  });
});
