// define the module we're working with
var app = angular.module('dnd', []);

app.directive('uiDraggable', function() {
	return {
		restrict : 'A',
		link : function(scope, element, attrs) {
			element.draggable({
				revert : true
			});
		}
	};
});

app.directive('uiDropListener', function() {
	return {
		restrict : 'A',
		link : function(scope, eDroppable, attrs) {
			eDroppable.droppable({
				drop : function(event, ui) {
					var fnDropListener = scope.$eval(attrs.uiDropListener);
					if (fnDropListener && angular.isFunction(fnDropListener)) {
						var eDraggable = angular.element(ui.draggable);
						fnDropListener(eDraggable, eDroppable, event, ui);
					}
				}
			});
		}
	};
});
