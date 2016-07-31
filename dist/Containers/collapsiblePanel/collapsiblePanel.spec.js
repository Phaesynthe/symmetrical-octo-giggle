/* global angular beforeEach inject expect */
describe('Container: collapsiblePanel', function () {
  var compile,
    component,
    defaultTemplate,
    pageScope,
    setup;

  defaultTemplate = (
      '<collapsible-panel label="Example Label">' +
        '<pane>Example Content</pane>' +
      '</collapsible-panel>'
    );

  beforeEach(angular.mock.module('sog.containers.collapsiblePanel'));

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

  it('defaults closed', function () {
    setup(defaultTemplate);
    expect(component[0].querySelectorAll('div.content-wrapper').length).toBe(0);
  });

  it('toggles open state of content on title click', function () {
    setup(defaultTemplate);
    angular.element(component[0].querySelectorAll('div.head-wrapper')).triggerHandler('click');
    expect(component[0].querySelectorAll('div.content-wrapper').length).toBe(1);
    angular.element(component[0].querySelectorAll('div.head-wrapper')).triggerHandler('click');
    expect(component[0].querySelectorAll('div.content-wrapper').length).toBe(0);
  });

});
