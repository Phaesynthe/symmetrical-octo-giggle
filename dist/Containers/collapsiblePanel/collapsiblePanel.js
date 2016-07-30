/* global angular */

angular.module('sog.containers.collapsiblePanel', [])
  .component('collapsiblePanel', {
    bindings: {
      'label': '@'
    },
    controller: () => {},
    templateUrl: 'collapsiblePanel.html',
    transclude: true
  }
);
