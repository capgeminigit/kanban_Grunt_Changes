/**
 * Created by harprasa on 10/14/13.
 */


//'use strict';

/* jasmine specs for modules go here */


describe('drag and drop', function() {

    var scope, ele;

    beforeEach(inject(function($rootScope, $controller) {
            console.log('beforeEach ****');
            scope = $rootScope.$new();

            $controller("dndCtrl", {
                $scope: scope
            });

    }));


    it("should increase task count when a new task is added",function(){
        //initial list count
        var tasklist = [{"id":1,"name":"Fix IE9 bug","state":0,"nbrComments":0,"userId":1,"userName":"Hari Prasad","userImg":"img/mats.jpeg"},{"id":2,"name":"Sneak-install Chrome Frame","state":0,"nbrComments":1,"userId":1,"userName":"Mats","userImg":"img/mats.jpeg"},{"id":81,"name":"Sneak-install Chrome Frame1","state":0,"nbrComments":1,"userName":"","userImg":""},{"id":12,"name":"Add Windows Phone support","state":1,"nbrComments":1,"userId":3,"userName":"Brian","userImg":"img/brian.jpeg"},{"id":122,"name":"Make App","state":1,"nbrComments":1,"userName":"","userImg":""},{"id":3,"name":"Task 222 foo bar lots of text in this one eh? Fooooo","state":2,"nbrComments":0,"userName":"","userImg":"img/homer.jpg"},{"id":4,"name":"Find Unicorn","state":2,"nbrComments":0,"userName":"Homer","userId":2,"userImg":"img/homer.jpg"},{"id":5,"name":"IE6 support","state":1,"nbrComments":0,"userName":"","userImg":""},{"id":6,"name":"Chrome development","state":3,"nbrComments":0,"userName":"","userImg":"img/homer.jpg"},{"id":7,"name":"Find holy grail","state":3,"nbrComments":1,"userName":"","userImg":""},{"id":8,"name":"Dig hole","state":3,"nbrComments":0,"userName":"","userImg":""},{"id":9,"name":"Eat raisins","state":3,"nbrComments":3,"userName":"","userImg":"img/homer.jpg"}];
        var initList = tasklist.length;
        scope.addEntry(tasklist,"changeuser",0);
        var newList = tasklist.length;
        expect(initList).toBeLessThan(newList);

    });

         
});



