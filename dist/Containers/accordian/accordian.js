/* global angular */
var accordianController = function ($element, $transclude) {
  var ctrl = this;
  var reduceDomNodes = function (DomStructure) {
    return Array.prototype.slice.call(DomStructure)
      .filter(function (item) {
      // nodeType === 1 is element
        return item.nodeType === 1;
      });
  };
  this.transcludedNodes = [];

  reduceDomNodes($transclude())
    .forEach(function (item) {
      var output = {};
      var tmp = reduceDomNodes(item.childNodes);
      output.titleNode = tmp[ 0 ];
      output.contentNode = tmp[ 1 ];
      output.contentNode.classList.add('content-panel');
      ctrl.transcludedNodes.push(output);
    });

  this.toggleState = function ($event) {
    $event.currentTarget.classList.toggle('open');
  };
};

accordianController.$inject = [ '$element', '$transclude' ];

angular.module('sog.containers.accordian', [])
  .component('accordian', {
    bindings: {
      'label': '@'
    },
    controller: accordianController,
    templateUrl: 'accordian.html',
    transclude: true
  }
);
