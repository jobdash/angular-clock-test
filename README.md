Angular Clock Homework
======================

This is a simple (and still incomplete) Angular alarm clock application.

Setup
=====

The following instructions assume that you have virtualenvhelper and Noe
installed.

To setup the environment run

```bash
git clone git@github.com:jobdash/angular-clock-test.git
cd angular-clock-test
mkvirtualenv  angularclock
pip install -r requirements.txt
node install
```

You can run the applicaiton using

```bash
python app/app.py
```

You can then view the application at `http://localhost:5000`.


Homework
========

The goal of this test is to see you unit test some angular code.  The application
is relatively simple.  It contains one controller, one filter, and one directive.

To complete this test you must write a single unit test, you must specifically write
a test for the `datetimePicker` directive.  For a bonus, you can also write unit
tests for the controller and/or the filter used in the application.

Note: you DO NOT need to set up the test environment, it has already been setup for you.
The test environment, uses the [Karma test runner](http://karma-runner.github.io/0.12/index.html)
 and the [Jasmine test framework](http://jasmine.github.io/2.1/introduction.html).
 Additionally, we have included an example unit test for a filter.  The filter is not used in the
 app but is used in JobDash itself.

You should create the file `app/static/tests/clock-tests.js` and write you tests in it.  The test
runner will automatically detect this file and run the tests for you.  To start the test runner,
run

```
karma start
```

from the project root folder.  This will launch an instance of the Chrome web
browser, it will display an empty page, run the tests and finally give you a
report in your terminal.  The current configuration will automatically watch for
 any changes to the javascript files and re-run the tests if the files change.
If you want to use a different browser, you will need to edit the
`karma.conf.js`

###Suggestions

Here are some things to consider when writing the test:
* Did the directive render correctly?
* Does updating the form input correctly update the model?  ( Read the
directive and its controller very carefully, there is some non-trivial
behavior there.)
* Would it be easier to test the directive if it was written in a different way?
    * If so, how would you re-write it?
* What test cases/situations should you cover?


Resources
=========

The following pages are useful introductions to testing in AngularJS.

- [Angular tips](http://angular-tips.com/blog/categories/unit-test/)
- [Angular Recipes](http://fdietz.github.io/recipes-with-angular-js/directives/testing-directives.html)
- [ng-newsletter](http://www.ng-newsletter.com/advent2013/#!/day/19)
- [Core Angular Docs](https://docs.angularjs.org/guide/unit-testing)