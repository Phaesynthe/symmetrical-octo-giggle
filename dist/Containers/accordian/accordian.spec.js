/* global angular beforeEach inject expect */
describe('Container: accodian', function () {
  var compile,
    component,
    defaultTemplate,
    pageScope,
    setup;

  defaultTemplate = (
      '<accordian>' +
        '<div>' +
          '<h3>Example Label 1</h3>' +
          '<div>Content 1</div>' +
        '</div>' +
        '<div>'  +
          '<h3>Example Label 2</h3>' +
          '<div>Content 2</div>' +
        '</div>' +
      '</accordian>'
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
    expect(component[0].querySelectorAll('div.label-wrapper').length).toBe(2);
  });

});
