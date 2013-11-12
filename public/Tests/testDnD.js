/**
 * Created by harprasa on 10/14/13.
 */

//'use strict';
/* jasmine specs for modules go here */

describe(
		'Initialization of App',
		function() {

			var scope, ele, eleNotStart, eleInProgress, controller;

			beforeEach(inject(function($rootScope, $controller, $compile) {

				ele = angular
						.element('<div class="columnCollapsed" id="divNotStartedCollapsed">'
								+ '<div class="columnCollapsedText pane-title">'
								+ 'Not Started (<span class="NScount">{{nstartCount}}</span>)'
								+ '</div>' + '</div>');

				eleNotStart = angular
						.element('<div class="dnd">'
								+ '<h3>Taks in notStarted:</h3>'
								+ '<ul><li ui-draggable ng-repeat="item in nstart = (taskStore | filter:{ state: 0 })"'
								+ 'data-id="{{item.id}}"	item-index="{{$index}}" item-id="{{item.id}}"'
								+ 'item-state="{{item.state}}">{{item.name}}</li></ul> </div>');

				eleInProgress = angular
						.element('<div class="dnd">'
								+ '<h3>item in inProgress:</h3>'
								+ '<ul><li ui-draggable ng-repeat="item in inProgress = (taskStore | filter:{ state: 1 })"'
								+ 'data-id="{{item.id}}"	item-index="{{$index}}" item-id="{{item.id}}"'
								+ 'item-state="{{item.state}}">{{item.name}}</li></ul> </div>');

				scope = $rootScope.$new();
				controller = $controller("dndCtrl", {
					$scope : scope
				});

				$compile(ele)(scope);
				$compile(eleNotStart)(scope);
				$compile(eleInProgress)(scope);

				scope.$digest();

			}));

			it(' should have the controller defined', function() {
				expect(controller).toBeDefined();
			});

			it(' should have the tasks defined', function() {
				expect(scope.taskStore.length).toBeGreaterThan(0);

			});

			it("should increase task count when a new task is added",
					function() {
						//initial list count
						var tasklist = [ {
							"id" : 1,
							"name" : "Add new Task",
							"state" : 0,
							"nbrComments" : 0,
							"userId" : 1,
							"userName" : "Hari Prasad",
							"userImg" : "img/mats.jpeg"
						} ];
						var initList = tasklist.length;
						scope.addEntry(tasklist, "changeuser", 0);
						var newList = tasklist.length;
						expect(initList).toBeLessThan(newList);

					});

			it('should bind the content', function() {

				var contents = ele.find("span");
				expect(contents.text()).toBe('3');
				scope.$apply(function() {
					scope.nstartCount = 123;
				})
				expect(contents.text()).toBe('123');

			});

			//function accepting 0 means adding to notStarted and 1 means inProgress etc...
			it("should increase task count when a state number is is added",
					function() {

						var tasklist = scope.taskStore;
						var initList = scope.taskStore.length;
						console.log('Initial Length ' + initList);
						scope.addTaskStoreEntry(0);
						scope.addTaskStoreEntry(1);
						scope.addTaskStoreEntry(2);
						scope.addTaskStoreEntry(3);
						var newList = tasklist.length;
						console.log('New List ' + newList);
						expect(initList).toBeLessThan(newList);

					});

			it(
					'should drag and drop item between state 0 to state 1',
					function() {

						//Before directive test pole Notstart and inprogress lengths test
						var notTestedInitialLength = eleNotStart.find('li');
						console.log('NotTested Initial Length>>>> '
								+ notTestedInitialLength.length);
						//expect(list.length).toBe(3);

						var inProgressInitialLength = eleInProgress.find('li');
						console.log('InProgress Initial Length>>>> '
								+ notTestedInitialLength.length);
						// expect(list.length).toBe(3);

						scope
								.dropListener(
										$('<ul ui-drop-listener=\'dropListener\' data-stid="0" id="sourceList"'
												+ 'dnd-between-list="notStarted,targetList"'
												+ 'ng-class="{\'minimalList\':notStartedEmpty()}"'
												+ 'class="sortable-list col1" state="0">'
												+

												'$(<li ui-draggable '
												+ 'ng-repeat="item in nstart = (taskStore | filter:{ state: 0 })"'
												+ 'data-index=\'{{$index}}\' data-id="{{item.id}}"'
												+ 'item-index="{{$index}}" item-id="{{item.id}}"'
												+ 'item-state="{{item.state}}">{{item.name}}</li>).first()</ul>'),

										$(' <ul ui-drop-listener=\'dropListener\' data-stid="1" id="sourceList"'
												+ 'dnd-between-list="inProgress,targetList"'
												+ 'ng-class="{\'minimalList\':inProgressEmpty()}"'
												+ 'class="sortable-list col2" state="1">'
												+ '<li ui-draggable '
												+ 'ng-repeat="item in inProgress = (taskStore | filter:{ state: 1 })"'
												+ 'data-index=\'{{$index}}\' data-id="{{item.id}}"'
												+ 'item-index="{{$index}}" item-id="{{item.id}}"'
												+ 'item-state="{{item.state}}"> {{item.name}}</li></ul>'));

						//After directive test pole Notstart and inprogress lengths test
						var notTestedAfterTestLength = eleNotStart.find('li');
						console
								.log('Notstarted Length after directive Test>>> '
										+ notTestedAfterTestLength.length);
						expect(notTestedAfterTestLength.length).toBeLessThan(
								notTestedInitialLength.length);

						var inProgressAfterTestLength = eleInProgress
								.find('li');
						console
								.log('Inprogress Length after directive Test>>>> '
										+ inProgressAfterTestLength.length);
						expect(inProgressAfterTestLength.length)
								.toBeGreaterThan(inProgressInitialLength.length);
						//expect(list.length).toBe(4);

					});


			//function accepting 0 means adding to notStarted and 1 means inProgress etc...
			it("should remove task and decrease the TaskList Length ",
					function() {

						var tasklist = scope.taskStore;
						var initList = scope.taskStore.length;
						console.log('Initial Length ' + initList);
						scope.deleteTask(0,0);
						scope.deleteTask(1,0);
						var newList = tasklist.length;
						console.log('New List ' + newList);
						expect(initList).toBeGreaterThan(newList);
						expect(newList).toBeLessThan(initList);

					});

		});
