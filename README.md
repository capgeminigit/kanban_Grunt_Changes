kanban_Grunt_Changes
====================

Introduction: 

Kanban [signboard] application allows the tasks to be tracked visually [JIT] to completion. It has 4 
cards [Not Started, In progress, Test, Done] and tasks are associated with each card.

	Each Card has
  •	Count of tasks 
  •	Task List 
  •	+ function to add a task 
  •	- function to minimize the card
  •	Click function to maximize the card 
 
	Task that can 
  •	Be Dragged out of a Card 
  •	Be Dropped into a new card
  •	Be Associated with a user 
  •	List the users that can be assigned a task

Technology Stack 
  o	Angular JS
  o	Karma 
  o	NodeJS
  o	jQuery 

Installation 

  •	Install Nodejs
  •	Install grunt-cli globally 
  o	npm install -g grunt-cli
    •	Install grunt locally 
  o	npm install grunt
    •	Install grunt-sed plugin for search and replace
    •	Install karma 
  o	npm install -g karma

Usage 

  •	cd <root directory of the app>
  
    o	> grunt 
        	Loads the task list from tasks.json 
  
    o	> karma start 
        	Runs the Karma test cases 
  
    o	> node app
        	Starts the node server @ port 9080 
        
  •	On the Browser 
    o	http://localhost:9080/

