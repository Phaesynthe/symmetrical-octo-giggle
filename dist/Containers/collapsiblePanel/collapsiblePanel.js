/* global angular */

angular.module('sog.containers.collapsiblePanel', [])
  .component('collapsiblePanel', {
    bindings: {
      'label': '@'
    },
    templateUrl: 'collapsiblePanel.html',
    transclude: {
      'paneSlot': 'pane',
      'titleInfoSlot': '?titleInfo'
    }
  }
);
