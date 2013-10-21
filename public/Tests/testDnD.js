/**
 * Created by harprasa on 10/14/13.
 */


//'use strict';

/* jasmine specs for modules go here */


describe('Initialization of App', function() {

    var scope, ele, controller;

    beforeEach(inject(function($rootScope, $controller, $compile) {


            ele = angular.element(
                '<div class="columnCollapsed" id="divNotStartedCollapsed">' +
                    '<div class="columnCollapsedText pane-title">' +
                    'Not Started (<span class="NScount">{{nstartCount}}</span>)' +
                    '</div>' +
                '</div>'
            );

            /*
            ele = angular.element(
                    '<ul ui-drop-listener=\'dropListener\' data-stid="0" id="sourceList"'+
                        'dnd-between-list="notStarted,targetList"'+
                        'ng-class="{\'minimalList\':notStartedEmpty()}"'+
                        'class="sortable-list col1" state="0">'+

                        '<li ui-draggable '+
                            'ng-repeat="item in nstart = (taskStore | filter:{ state: 0 })"'+
                            'data-index=\'{{$index}}\' data-id="{{item.id}}"'+
                            'item-index="{{$index}}" item-id="{{item.id}}"'+
                            'item-state="{{item.state}}">'+
                            '<div class="sch-task">'+
                                '<div class="sch-color"></div>'+
                                '<div class="sch-task-name" />'+
                                    '<span class="item-name-holder" data-type="editable" data-updatable=\'true\''+
                                        'id="input-medium{{item.id}}" data-for="#user-name{{item.id}}">{{item.name}}</span>'+
                                        '<input id="user-name{{item.id}}" class=\'hidden\'>'+
                                '</div>'+
                            '<div class="Imgwrapper" style="display: none">'+
                                '<img id="changeUser{{item.id}}"'+
                                        'class="sch-user-avatar context-menu-one cursor-hand"'+
                                        'ng-src="{{item.userImg}}" src="" ng-show="true"'+
                                        'title="Assign User">'+
                            '</div>'+
                            '<div class="sch-tool-ct">'+
                            '<div ng-hide="item.nbrComments==\'0\'"'+
                                'class="sch-tool sch-tool-comment">{{item.nbrComments}}</div>'+
                            '</div>'+
                            '<div style="clear: both"></div>'+
                            '</div>'+
                        '</li>'+
                    '</ul>'
                  );
            */
            scope = $rootScope.$new();
            controller = $controller("dndCtrl", {
                $scope: scope
            });
            $compile(ele)(scope);
            scope.$digest();

    }));


    it(' should have the controller defined', function() {
        expect(controller).toBeDefined();
    });

    it(' should have the tasks defined', function () {
        expect(scope.taskStore.length).toBeGreaterThan(0);

    });

    it("should increase task count when a new task is added",function(){
        //initial list count
        var tasklist = [{"id":1,"name":"Add new Task","state":0,"nbrComments":0,"userId":1,"userName":"Hari Prasad","userImg":"img/mats.jpeg"}];
        var initList = tasklist.length;
        scope.addEntry(tasklist,"changeuser",0);
        var newList = tasklist.length;
        expect(initList).toBeLessThan(newList);

    });

    it('should bind the content', function() {

        var contents =ele.find("span");

        expect(contents.text()).toBe('');

        scope.$apply(function() {
            scope.nstartCount = 123;
        });

        expect(contents.text()).toBe('123');

    });



});



