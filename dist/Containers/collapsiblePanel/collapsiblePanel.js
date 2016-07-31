/* global angular */

angular.module('sog.containers.collapsiblePanel', [])
  .component('collapsiblePanel', {
    bindings: {
      'label': '@'
    },
    controller: ['$element', function ($element) {
      this.toggleState = function () {
        $element[0].classList.toggle('open');
      }
    }],
    templateUrl: 'collapsiblePanel.html',
    transclude: {
      'paneSlot': 'pane',
      'titleInfoSlot': '?titleInfo'
    }
  }
);
