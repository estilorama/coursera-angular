Module 4 Coding Assignment
=======

## Time to Complete
It should take about an 1.5 hours or less. 
https://www.coursera.org/learn/single-page-web-apps-with-angularjs/discussions/weeks/4) 

### **DO NOT be scared by the length of this assignment! It’s not long at all! I just wanted to explain everything as clearly as I could 
and break it down into smaller steps for your benefit.**


## Assignment Instructions

### General Idea
Super simple idea behind this week's assignment: use the restaurant menu REST API to create a master/detail view pair.

Your application should have 3 views (i.e., 3 view states): home (`home`), categories list (`categories`), items list (`items`).

/ o /home
/categories
/category/{categoryId}/items


As long as the views are functional and readable, the styling does not really matter and is not graded.

When the user goes to `/` path in your application, a home screen should be shown. It's up to you what you place on the home screen. 

You can just say "Welcome to our Restaurant". The home screen should have a link to a list of categories of menu items in the restaurant. 
Clicking that link would obviously take the user to the `/categories` view.

The categories view should list all available categories of items on the menu. 
Each listing should be a link. Clicking that link should take the user to the `/items` view. 
Note that since what the `items` view state shows is dependent on which category the user clicked, the URL mapping will need to have a parameter in it. 
I.e., don't take the URLs I am listing in the assignment description as literal URLs. They are just naming hints.

Make sure that if, while viewing the list of menu items for a particular category, the user copies the URL in the browser's address bar and pastes 
it into a new tab or a different browser, that the view is the same as the original one.




### Steps







#### General Steps for Implementing Assignment Requirements
Suggestion: Read through all the requirements first and then come back to \#1 again. These are **not** necessarily listed in the order you should create them. 
Choose whatever order works for you. This list is simply an extended hint of how to implement a solution for this assignment.

1. Declare `ng-app` either on the `html` or the `body` element. Name your app `MenuApp`.


2. You must follow the 1 artifact per file rule. That means if the JS file declares a controller, 
it should *not* declare anything else like a service or component and vice versa. 
Use a separate JS file to declare other artifacts in your application. *Don't forget to include each JS file in your `index.html`!*


3. Create a file called `menuapp.module.js` and declare an Angular module to match your `ng-app` declaration.


4. Create `data.module.js` file and declare another module in it called `data`. 
 Make sure the `MenuApp` module lists the `data` module as a dependency.
 
 
5. Create `menudata.service.js` file and create a service called `MenuDataService` in it. This service should be declared on the `data` module, *not* on the `MenuApp` module. 
The `MenuDataService` should have 2 methods:

  * 	`getAllCategories` - this method should return a promise which is a result of using the `$https` service, using the following REST API endpoint: 
		https://davids-restaurant.herokuapp.com/categories.json
		
  * 	`getItemsForCategory(categoryShortName)` - this method should return a promise which is a result of using the `$http` service, using the following REST API endpoint: 
		https://davids-restaurant.herokuapp.com/menu_items.json?category=, where, before the call to the server, your code should append whatever `categoryShortName` value 
		was passed in as an argument into the `getItemsForCategory` method.
		
  
6. Create `categories.component.js` file and create component called `categories` that shows all available categories in the menu to the user.


7. Create `items.component.js` file and create a component called `items` that shows all of the menu items for a particular category.


8. The `categories` and the `items` components should *NOT* directly use the `MenuDataService` to fetch their own data. 
Instead, the proper data should be simply passed into the component. (Hint: use the one-way `<` binding).


9. Create `routes.js` file and configure your routes and view states in it. These routes should be defined in the `MenuApp` module.

  * *Hint:* don't try to define the states all at once. Define one state, including whatever it needs and make sure it works all the way to the point when 
  you can see the results on the screen. Then, move on to the next view state. 
  That *does* mean that you will have to leave `routes.js` and define all the other artifacts listed below and then come back to it, etc.
  
  * *Hint:* The `home` state will not need a controller. Just a template.
  
  * *Hint:* The `categories` state can have a `controller` as well as a `resolve`. The resolve will use the `MenuDataService` to retrieve categories and inject them into the controller. 
  The controller can then expose the retrieved categories object such that it can be simply passed into the `categories` component.
  
  * *Hint:* The `items` state can have the same type of setup as the `categories` state.
