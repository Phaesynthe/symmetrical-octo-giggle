/* global angular beforeEach inject expect */
describe('Container: accodian', function () {
  var compile,
    component,
    defaultTemplate,
    pageScope,
    setup;

  defaultTemplate = (
      ''
    );

  beforeEach(angular.mock.module('sog.containers.accordian'));

  beforeEach(inject(function ($compile, $rootScope) {
    compile = $compile;
    pageScope = $rootScope.$new();
  }));

  setup = function (template) {
    component = compile(template)(pageScope);
    pageScope.$apply();
  };

  it('can be instantiated', function () {
    setup(defaultTemplate);
    expect(component[0].querySelectorAll('div.head-wrapper').length).toBe(1);
  });

});
