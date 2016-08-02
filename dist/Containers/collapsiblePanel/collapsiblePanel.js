/* global angular */
var collapsiblePanelController = function ($element) {
  this.toggleState = function () {
    $element[ 0 ].classList.toggle('open');
  };
};

collapsiblePanelController.$inject = [ '$element' ];

angular.module('sog.containers.collapsiblePanel', [])
  .component('collapsiblePanel', {
    bindings: {
      'label': '@'
    },
    controller: collapsiblePanelController,
    templateUrl: 'collapsiblePanel.html',
    transclude: {
      'paneSlot': 'pane',
      'titleInfoSlot': '?titleInfo'
    }
  }
);
