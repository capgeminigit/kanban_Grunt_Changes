function dndCtrl($scope) {

	$scope.taskStore = [ {
		"id" : 1,
		"name" : "Fix IE9 bug",
		"state" : 0,
		"nbrComments" : 0,
		"userId" : 1,
		"userName" : "Hari Prasad",
		"userImg" : "img/mats.jpeg"
	}, {
		"id" : 2,
		"name" : "Sneak-install Chrome Frame",
		"state" : 0,
		"nbrComments" : 1,
		"userId" : 1,
		"userName" : "Mats",
		"userImg" : "img/mats.jpeg"
	}, {
		"id" : 81,
		"name" : "Sneak-install Chrome Frame1",
		"state" : 0,
		"nbrComments" : 1,
		"userName" : "",
		"userImg" : ""
	}, {
		"id" : 12,
		"name" : "Add Windows Phone support",
		"state" : 1,
		"nbrComments" : 1,
		"userId" : 3,
		"userName" : "Brian",
		"userImg" : "img/brian.jpeg"
	}, {
		"id" : 122,
		"name" : "Make App",
		"state" : 1,
		"nbrComments" : 1,
		"userName" : "",
		"userImg" : ""
	}, {
		"id" : 3,
		"name" : "Task 222 foo bar lots of text in this one eh? Fooooo",
		"state" : 2,
		"nbrComments" : 0,
		"userName" : "",
		"userImg" : "img/homer.jpg"
	}, {
		"id" : 4,
		"name" : "Find Unicorn",
		"state" : 2,
		"nbrComments" : 0,
		"userName" : "Homer",
		"userId" : 2,
		"userImg" : "img/homer.jpg"
	}, {
		"id" : 5,
		"name" : "IE6 support",
		"state" : 1,
		"nbrComments" : 0,
		"userName" : "",
		"userImg" : ""
	}, {
		"id" : 6,
		"name" : "Chrome development",
		"state" : 3,
		"nbrComments" : 0,
		"userName" : "",
		"userImg" : "img/homer.jpg"
	}, {
		"id" : 7,
		"name" : "Find holy grail",
		"state" : 3,
		"nbrComments" : 1,
		"userName" : "",
		"userImg" : ""
	}, {
		"id" : 8,
		"name" : "Dig hole",
		"state" : 3,
		"nbrComments" : 0,
		"userName" : "",
		"userImg" : ""
	}, {
		"id" : 9,
		"name" : "Eat raisins",
		"state" : 3,
		"nbrComments" : 3,
		"userName" : "",
		"userImg" : "img/homer.jpg"
	} ];

	$scope.dropListener = function(eDraggable, eDroppable) {

		var eSrc = eDraggable.parent();
		var sSrc = eSrc.data('stid');
		if (sSrc == undefined) {
			console.log('Added to test karma test case');
			sSrc = eDraggable.data('stid');
		}
		console.log('Dragging sourceID' + sSrc);
		var sTarget = eDroppable.data('stid');
		console.log('Dropping sourceID' + sTarget);
		var modelSrc = "taskStore | filter:{ state: " + sSrc + "}";

		$scope
				.$apply(function() {
					var index = eDraggable.data('index');
					var aSrc = $scope.$eval(modelSrc);
					if (index == undefined) {
						index = 0;
					}
					var item = aSrc[index];
					if (item == undefined) {
						index = 0;
					}
					if (sTarget == (Number(sSrc) + 1)
							|| sTarget == (Number(sSrc) - 1)) {
						if (item != undefined) {
							item.state = sTarget;
						}

					} else {
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

	$scope.taskStoreEmpty = function() {
		console.log('length: ' + $scope.taskStore.length);
		return $scope.taskStore.length == 0;
	};

	$scope.addTaskStoreEntry = function(state) {
		$scope.addEntry($scope.taskStore, "changeUser", state);
	};

	$scope.addEntry = function(items, imgIdPrefix, state) {
		var id = Date.now();
		console.log('items:' + items.length);
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

	$scope.deleteTask = function(index, state) {
		//alert('delete function called');
		//console.log('index of the element ' + index);
		// alert('Element Index >> '+index);
		//alert('state of the element >> ' +state);

		var modelSrc = "taskStore | filter:{ state: " + state + "}";
		var aSrc = $scope.$eval(modelSrc);
		//alert('model source length before remove ' +aSrc.length);
		var id = aSrc[index].id;
		var name = aSrc[index].name;
		//alert('Id of the element >> ' +id);
		//alert('Name of the element >> ' +name);
		var items = $scope.taskStore;
		var length = items.length;
		//alert('length of the taskstore ' +length);
		var index = 0;
		for (i = 0; i < length; i++) {
			index = i;
			var idList = items[i].id;
			if (id == idList) {
				//alert('scope item id '+idList);
				//alert('id and list in id matched');
				//alert('index of item '+index);
				$scope.taskStore.splice(index, 1);
				break;
			}

		}

	}
}
