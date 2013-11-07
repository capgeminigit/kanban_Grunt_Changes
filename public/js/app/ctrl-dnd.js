function dndCtrl($scope) {

	$scope.taskStore = TASKLIST;

	$scope.dropListener = function(eDraggable, eDroppable) {

		var eSrc = eDraggable.parent();
		var sSrc = eSrc.data('stid');

        if(sSrc == undefined){

            sSrc = eDraggable.data('stid');
            console.log('Dragging sourceID:' +sSrc);
        }
		var sTarget = eDroppable.data('stid');
        console.log('Dropping sourceID:' +sTarget);

		var modelSrc = "taskStore | filter:{ state: " + sSrc + "}";

		$scope.$apply(function() {
			var index = eDraggable.data('index');
			var aSrc = $scope.$eval(modelSrc);

			var item = aSrc[index];
            if (item == undefined){
                index=0;
                item = aSrc[index];
            }

			if (sTarget == (Number(sSrc) + 1)
					|| sTarget == (Number(sSrc) - 1)) {

                    if (item!=undefined){
                        item.state = sTarget;
                    }

			}
		});
	};

	function afterApply() {
		$('.sch-task').hover(function() {
			$(this).css({
				"background-color" : "#EEFFFF",
				"color" : "#888888"
			});
			if ($(this).find(".Imgwrapper").css("display") == 'none')
				$(this).find(".Imgwrapper").css("display", "block");
		}, function() {
			$(this).css({
				"background-color" : "#FFFFFF",
				"color" : "#888888"
			});
			if ($(this).find(".sch-user-avatar").attr("src").length == 0)
				$(this).find(".Imgwrapper").css("display", "none");
		});

		$('.sch-task').click(function() {
			$(this).css({
				"background-color" : "#7b68ee",
				"color" : "#FFFFFF"
			});
		});
		registerUserMenuForAll();

		$('.sch-task').editables({
			beforeEdit : function(field) {
				if (this.data('updatable'))
					field.val(this.text());
			},
			beforeFreeze : function(display) {
				if (display.data('updatable'))
					display.text(this.val());
			}
		});

		$('.sch-user-avatar').each(function(i, obj) {
			var fileext = obj.src;
			var n = fileext.lastIndexOf(".");
			var fileType = "";
			if (n != -1)
				fileType = fileext.substring(n + 1);
			if (fileType.length != 0 && fileType == 'html') {
				$(obj.parentNode).css("display", "none");
			} else
				$(obj.parentNode).css("display", "block");
		});
	}
	$scope.$watch("taskStore", function(name) {
	}, true);

	$scope.$watch('nstart', function(newValue) {
		if (angular.isArray(newValue)) {
			newValue.map(function(e) {
				afterApply();
				e.name = $("#input-medium" + e.id).html();
			});
			$scope.nstartCount = newValue.length;
		}
	}, true);

	$scope.$watch('inProgress', function(newValue) {
		if (angular.isArray(newValue)) {
			newValue.map(function(e) {
				afterApply();
				e.name = $("#input-medium" + e.id).html();
			});
			$scope.inProgressCount = newValue.length;
		}
	}, true);


	$scope.$watch('test', function(newValue) {
		if (angular.isArray(newValue)) {
			newValue.map(function(e) {
				afterApply();
				e.name = $("#input-medium" + e.id).html();
			});
			$scope.testCount = newValue.length;
		}
	}, true);


	$scope.$watch('done', function(newValue) {
		if (angular.isArray(newValue)) {
			newValue.map(function(e) {
				afterApply();
				e.name = $("#input-medium" + e.id).html();
			});

			$scope.doneCount = newValue.length;
		}
	}, true);

   	$scope.addTaskStoreEntry = function(state) {
		$scope.addEntry($scope.taskStore, "changeUser", state);
	};

	$scope.addEntry = function(items, imgIdPrefix, state) {
		var id = Date.now();
		items.push({
			"id" : id,
			"name" : "New Task...",
			"state" : state,
			"nbrComments" : 0,
			"userId" : "",
			"userName" : "",
			"userImg" : ""
		});
		registerUserMenu(imgIdPrefix + id);

	};
}


