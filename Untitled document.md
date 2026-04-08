

 From React to AngularJS 1.8 — A
## Modern Developer’s Survival Guide
Subtitle: Learning an old framework the right way, with jokes, real code, and zero fluff.

 Table of Contents
Chapter 1 – AngularJS: The Time Traveler’s Toolkit
A friendly intro to what AngularJS 1.8 really is, why it exists, and why it still matters.
Chapter 2 – The Magic of Scopes
## Understanding
## $scope
## ,
$rootScope
, and the digest cycle. You’ll learn what’s really happening
when you type in an input and see the page update instantly.
## Chapter 3 – Directives: The Secret Sauce
We’ll build our own custom directive, like React components before React existed.
Chapter 4 – Services, Factories, and Dependency Injection
How AngularJS keeps your logic modular and testable. We’ll write a reusable data layer for our
app.
## Chapter 5 – Routing: Turning Pages Without Reloads
We’ll use
ngRoute
to make a small multi-page app — like React Router, but 2013-style.
Chapter 6 – Filters and Expressions
Learn how to format and transform data directly in templates, with built-in and custom filters.
## Chapter 7 – The Digest Deep Dive
We’ll peek under the hood and see how AngularJS runs change detection, watchers, and
## $apply()
## .

Chapter 8 – Talking to APIs with
## $http
Because no app lives alone. We’ll fetch real data and see how Angular handles async
operations.
Chapter 9 – Structuring a Real App
We’ll combine everything into a small but complete AngularJS app — properly modular, clean,
and understandable.
Chapter 10 – When You’re Ready to Move On
We’ll talk about how AngularJS ideas evolved into modern frameworks, and how to use this
knowledge in React, Vue, and Angular (the newer one).













Chapter 1 – AngularJS: The Time Traveler’s Toolkit


## 1. Why Are We Doing This?
So, you’ve been writing React. You love your JSX, your hooks, your one-way data flow. Life is
good.
Then you hear about Angular 1.8 — the “old” Angular, not the fancy TypeScript version. You
wonder: “Why would anyone still use this?”

Here’s the thing: AngularJS 1.x is still around. Legacy apps, admin panels, and internal tools still
run it.
And if you ever have to maintain one — you’ll want to really understand what’s going on under
the hood.
Let’s start there.

- What AngularJS Really Is
AngularJS 1.8 is a JavaScript framework built around data binding and dependency
injection.
It was made before modern JS got fancy with modules and hooks.
But back then, it solved a huge pain: manually updating the DOM.
In AngularJS, you don’t say “document.getElementById” or “setState.”
You say:
<p>{{ name }}</p>

And if
## $scope.name
changes, that paragraph magically updates.
This is called two-way data binding — and it’s both magical and dangerous.
You’ll love it for five minutes, then debug digest cycles for five hours.

- The “Hello World” Moment
Let’s start simple. No build tools. No Webpack.
Just a script tag and some magic.
<!DOCTYPE html>
<html ng-app="myApp">
## <head>
<title>AngularJS 1.8 Hello World</title>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
## </head>
<body ng-controller="MainCtrl">
<h1>Hello {{ name }}!</h1>


<input type="text" ng-model="name" placeholder="Type your name" />

## <script>
const app = angular.module('myApp', []);

app.controller('MainCtrl', function($scope) {
$scope.name = 'React Developer';
## });
## </script>
## </body>
## </html>

✅ Open this in your browser.
✅ Type your name in the box.
✅ Watch the heading change in real time.
You just witnessed AngularJS data binding in action.

## 4. Understanding What Just Happened
Here’s how AngularJS makes that work:
## ● The
ng-app="myApp"
starts your Angular world. It tells Angular: “Hey, this page
belongs to this module.”

## ● The
ng-controller="MainCtrl"
defines a scope (a mini-world) for your data.

## ●
## $scope.name
is like React’s
useState
, but older. It holds data for that controller.

## ●
{{ name }}
is a “binding expression” — think of it like React’s
## {name}
inside JSX.

## ●
ng-model
connects your input’s value to
## $scope.name
, both ways.

So when you type, the
## $scope
updates.
## When
## $scope
updates, Angular updates the DOM.
## No
setState
## . No
onChange
## .
It’s all handled by Angular’s digest cycle.


- The Digest Cycle (Where the Magic Happens)
Here’s what Angular does behind the scenes (simplified):
- You change something in the UI (like typing).

- Angular catches it and calls
## $digest()
## .

## 3.
## $digest()
runs all the watchers — functions that check if any variable has changed.

- If something changed, Angular updates the DOM.

- Then it runs the watchers again (to make sure updates didn’t cause new changes).

- It stops only when nothing’s changing.

It’s like React’s re-render loop — except Angular keeps looping until everything’s stable.
That’s why you can accidentally create digest hell with too many watchers.

## 6. Let’s Make Something Real: A Todo App
Here’s a full, working Todo example:
<!DOCTYPE html>
<html ng-app="todoApp">
## <head>
<title>AngularJS Todo App</title>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
## <style>
body { font-family: sans-serif; max-width: 500px; margin: 40px auto; }
li.done { text-decoration: line-through; color: gray; }
## </style>
## </head>
<body ng-controller="TodoCtrl">

## <h2> My Todo List</h2>

<input type="text" ng-model="newTask" placeholder="What needs to be done?" />
<button ng-click="addTodo()">Add</button>

## <ul>

<li ng-repeat="todo in todos" ng-class="{done: todo.done}">
<input type="checkbox" ng-model="todo.done" />
{{ todo.text }}
<button ng-click="remove($index)">❌</button>
## </li>
## </ul>

## <script>
const app = angular.module('todoApp', []);

app.controller('TodoCtrl', function($scope) {
## $scope.todos = [
{ text: 'Learn AngularJS basics', done: false },
{ text: 'Understand scopes', done: false }
## ];

$scope.addTodo = function() {
if ($scope.newTask) {
$scope.todos.push({ text: $scope.newTask, done: false });
$scope.newTask = '';
## }
## };

$scope.remove = function(index) {
## $scope.todos.splice(index, 1);
## };
## });
## </script>
## </body>
## </html>

✔ Type tasks, toggle them done, delete them.
✔ Notice: no manual DOM manipulation, no useState, no props.
AngularJS watches everything.

- Comparing React vs AngularJS (Your Mental Map)
Concept React AngularJS 1.8
Rendering Virtual DOM Dirty checking with watchers

State useState / Context $scope
Components Functions or Classes Controllers + Templates
## Data Flow One-way Two-way
Lifecycle Hooks $watch + Digest cycle
Dependency Injection External (React Context or
hooks)
## Built-in
So AngularJS feels like “magic React” — it does a lot for you, but that magic can backfire when
the app grows.

- How to Structure Bigger Apps
When apps get bigger, you start splitting things:
● Use modules to organize features

● Use services for shared logic

● Use directives to create reusable UI pieces

A quick example of a service:
app.service('TodoService', function() {
const todos = [];

this.get = () => todos;
this.add = (text) => todos.push({ text, done: false });
this.remove = (index) => todos.splice(index, 1);
## });

And use it in your controller:
app.controller('TodoCtrl', function($scope, TodoService) {
$scope.todos = TodoService.get();

$scope.addTodo = function() {
if ($scope.newTask) {

TodoService.add($scope.newTask);
$scope.newTask = '';
## }
## };

$scope.remove = function(index) {
TodoService.remove(index);
## };
## });

That’s AngularJS dependency injection — no imports, no
require
, just ask for what you need,
and Angular gives it to you.

## 9. The Honest Truth
AngularJS 1.8 isn’t modern anymore.
It’s quirky, it’s weird, but it teaches you a lot about frameworks.
Understanding how it digests, watches, and injects dependencies gives you a stronger mental
model for why React and others do things differently now.
And here’s the cool part — you can use that knowledge anywhere.
Every framework after AngularJS learned something from it.




Chapter 2 – Scopes: The Heartbeat of
AngularJS

When React was young, it had “state” and “props.”
AngularJS had
## $scope
## .
Think of
## $scope
as a middleman between your JavaScript and your HTML.
If you say:

$scope.name = 'Alice';

and in your HTML you have:
<p>{{ name }}</p>

AngularJS will keep them in sync — always.
Change the input? The variable changes.
Change the variable? The input changes.
That’s called two-way data binding, and it’s the reason AngularJS became a big deal back in
the day.

## 易 How
## $scope
Works in Simple Terms
You have this invisible object (the
## $scope
) sitting between your controller and your view.
Here’s a mental picture:
[Controller JS]  <--->  [$scope]  <--->  [HTML Template]

If the controller changes something on
## $scope
, the view updates.
If the user types in an input,
## $scope
updates, and the controller sees it.
AngularJS keeps this sync alive using something called the digest loop.
It’s basically AngularJS constantly asking, “Hey, did anything change?”
Let’s see that in action.

里 Example: Real-Time Counter
<!DOCTYPE html>
<html ng-app="counterApp">
## <head>
<title>AngularJS Counter</title>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
## </head>
<body ng-controller="CounterCtrl">

<h2>Counter: {{ count }}</h2>
<button ng-click="increment()">+</button>
<button ng-click="decrement()">-</button>

## <script>
const app = angular.module('counterApp', []);

app.controller('CounterCtrl', function($scope) {
## $scope.count = 0;

$scope.increment = function() {
## $scope.count++;
## };

$scope.decrement = function() {
## $scope.count--;
## };
## });
## </script>
## </body>
## </html>

✅ When you click “+”, the number goes up.
✅ When you click “-”, it goes down.
## No
setState
, no manual DOM updates —
## $scope
does it for you.

 What Happens Behind the Curtain
Every time you click a button, AngularJS calls
## $apply()
automatically.
That triggers a
## $digest()
cycle.
## The
## $digest()
cycle checks all the watchers — tiny functions AngularJS uses to detect if
something changed.
## If
count
has a new value, AngularJS re-renders that part of the DOM.
If you ever wonder, “How does Angular know something changed?”, the answer is
## $digest()
## .
You can even trigger it yourself (although you rarely should):
## $scope.$apply(() => {
## $scope.count = 100;

## });


## 里 Nested Scopes
Scopes can nest.
If you have an
ng-controller
inside another controller, the inner
## $scope
inherits from the
parent.
Think of it like a prototype chain for data.
<div ng-controller="ParentCtrl">
<p>Parent: {{ parentMessage }}</p>

<div ng-controller="ChildCtrl">
<p>Child: {{ parentMessage }}</p>
<p>Own: {{ childMessage }}</p>
## </div>
## </div>

## <script>
const app = angular.module('scopeApp', []);

app.controller('ParentCtrl', function($scope) {
$scope.parentMessage = 'Hello from Parent';
## });

app.controller('ChildCtrl', function($scope) {
$scope.childMessage = 'Hello from Child';
## });
## </script>

✅ The child can see parent data.
❌ But if the child overwrites
parentMessage
, it shadows it.
Just like in JS scoping.

## ⚠ Common Scope Gotcha
If you bind objects instead of primitives, changes in child scopes can affect the parent scope,
because objects are passed by reference.

## Example:
$scope.user = { name: 'Alice' };

If a child modifies
## $scope.user.name
, both scopes see the change.
This confuses beginners — it’s a mix of “shared” and “isolated” behavior.

里 Scope vs. Component Thinking (React vs AngularJS)
Concept React AngularJS
Data container Component’s
state

## $scope

One-way binding Yes No (two-way)
Child data flow
via
props

via scope
inheritance
## Change
detection
Virtual DOM diff Digest watchers
## So
## $scope
is kind of like React’s state + props merged into one.
It feels powerful, but it can get messy in big apps.
That’s why Angular (the newer version) dropped it entirely.

## 吝 Your Turn
Try adding a reset button in the counter app.
Make it set
count
back to zero.
Then, open the browser console and type:
angular.element(document.body).scope().count

Yeah — AngularJS exposes your scope right in the DOM.
That’s how deep it’s tied to it. 勞


Next up, we’ll talk about the most interesting part of AngularJS —
## ✨ Directives ✨
They’re how AngularJS extends HTML, builds components, and makes the framework feel alive.















## ⚙ Chapter 3 – Directives: The Secret
## Sauce
## If
## $scope
is AngularJS’s heart, then directives are its soul.
They’re what make AngularJS... well, AngularJS.
A directive is basically a custom HTML behavior.
It can be as small as showing or hiding something (
ng-show
), or as big as rendering an entire
UI module.

If React has components, AngularJS 1.8 has directives.

易 What’s a Directive?
You’ve already used a bunch of them:
<div ng-app="app" ng-controller="MainCtrl">
<input ng-model="name" />
<p>{{ name }}</p>
## </div>

## Here,
ng-app
## ,
ng-controller
, and
ng-model
are built-in directives.
But you can also create your own.
That’s where the fun begins.

## ⚒ Let’s Build Our First Directive
Let’s say you’re tired of typing your username everywhere in a profile page.
You want a custom tag
## <user-card>
that shows your info.
Here’s the HTML:
<!DOCTYPE html>
<html ng-app="userApp">
## <head>
<title>User Card Directive</title>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
## <style>
## .card {

border: 1px solid #ccc;
padding: 10px;
margin: 10px 0;
width: 250px;
border-radius: 5px;
font-family: sans-serif;
## }
.name { font-weight: bold; }
.email { color: gray; font-size: 14px; }
## </style>
## </head>
<body ng-controller="MainCtrl">
<h2>Welcome, {{ user.name }}</h2>

## <user-card></user-card>

## <script>
const app = angular.module('userApp', []);

app.controller('MainCtrl', function($scope) {
## $scope.user = {
name: 'Alice',
email: 'alice@example.com'
## };

## });

app.directive('userCard', function() {
return {
restrict: 'E', // 'E' means element, so <user-card>
template: `
<div class="card">
<div class="name">{{ user.name }}</div>
<div class="email">{{ user.email }}</div>
## </div>
## `
## };
## });
## </script>
## </body>
## </html>

✔ You now have a reusable
## <user-card>
tag.
AngularJS finds it, reads your directive definition, and replaces it with that HTML template.
That’s the magic of DOM transformation.

里 The Anatomy of a Directive
Let’s break that down. A directive definition object can have many options, but here are the key
ones:

Property What it does
restrict
Tells Angular how to use it:
## E
(Element),
## A
(Attribute),
## C
(Class),
## M

(Comment)
template
or
templateUrl

The HTML it injects
scope

Defines what data it has access to
link()

Defines how the directive interacts with the DOM
controller

(Optional) Adds logic to the directive

##  Attribute Directives
Sometimes you don’t want a new tag — just extra behavior.
Let’s make a simple directive that highlights text when you hover over it.
<!DOCTYPE html>
<html ng-app="hoverApp">
## <head>
<title>Hover Directive</title>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
## </head>
<body ng-controller="MainCtrl">


<p highlight-on-hover>Hover over me!</p>

## <script>
const app = angular.module('hoverApp', []);

app.controller('MainCtrl', function($scope) {});

app.directive('highlightOnHover', function() {
return {
restrict: 'A', // A for Attribute
link: function(scope, element) {
element.on('mouseenter', () => element.css('background-color', 'yellow'));
element.on('mouseleave', () => element.css('background-color', ''));
## }
## };
## });
## </script>
## </body>
## </html>

✅ Try hovering. It lights up.
That’s AngularJS manipulating the DOM the Angular way.


## 易 The
link()
## Function Explained
link()
runs after the directive’s element has been created and added to the DOM.
It’s where you do DOM work, event listeners, or
## $watch
setup.
It gives you three arguments:
link: function(scope, element, attrs) { ... }

## ●
scope
— the directive’s data context

## ●
element
— the actual DOM element (wrapped in jqLite, Angular’s mini-jQuery)

## ●
attrs
— the element’s attributes

You can think of it like React’s
useEffect(() => {}, [])
, but older and more direct.

隣 Isolated Scope (Directive Inputs)
By default, directives share the parent
## $scope
## .
That’s fine for small things, but for reusable components, it’s a disaster.
So we can give directives their own isolated scope.
## Example:
<user-card name="user.name" email="user.email"></user-card>

app.directive('userCard', function() {
return {
restrict: 'E',
scope: {
name: '=',
email: '='

## },
template: `
<div class="card">
<div class="name">{{ name }}</div>
<div class="email">{{ email }}</div>
## </div>
## `
## };
## });

Now the directive has its own little scope bubble.
## The
## =
means two-way binding (still connected to parent values).
You can also use:
## ●
## @
for one-way string binding

## ●
## &
for passing a function

Example with a function (
## &
## ):
<user-card name="user.name" on-remove="removeUser()"></user-card>

scope: {
name: '=',
onRemove: '&'
## }

Now the directive can call
scope.onRemove()
inside.

That’s the AngularJS version of React’s
props.onClick()
## .

 A Bigger Example: A “Like” Button Component
Here’s a complete directive with its own scope, template, and event handling.
<!DOCTYPE html>
<html ng-app="likeApp">
## <head>
<title>Like Button Directive</title>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
## <style>
button {
padding: 6px 12px;
cursor: pointer;
border: 1px solid #ccc;
border-radius: 3px;
## }
## </style>
## </head>
<body ng-controller="MainCtrl">
<like-button count="likes" on-like="increaseLikes()"></like-button>
<p>Total likes: {{ likes }}</p>

## <script>
const app = angular.module('likeApp', []);


app.controller('MainCtrl', function($scope) {
## $scope.likes = 0;
$scope.increaseLikes = function() {
## $scope.likes++;
## };
## });

app.directive('likeButton', function() {
return {
restrict: 'E',
scope: {
count: '=',
onLike: '&'
## },
template: `
<button ng-click="onLike()"> Like ({{ count }})</button>
## `
## };
## });
## </script>
## </body>
## </html>


✅ This is a real component.
It has inputs (
count
), outputs (
onLike
), and local behavior.
React devs — notice how this is basically:
<LikeButton count={likes} onLike={increaseLikes} />

AngularJS did it first 

⚠ A Word of Warning
Directives are powerful but easy to abuse.
They can:
● Mutate DOM directly

● Overlap in behavior

● Create hard-to-debug scope hierarchies

So most experienced devs keep directives small and focused — one job, one template, no wild
DOM hacks.

 Wrap-Up
Here’s what you learned:
● Directives are like components, defining custom HTML behavior

## ●
restrict
decides how you use them

## ●
link()
is where DOM magic happens

## ●
scope
defines how data flows in

● You can pass data (
## =
), text (
## @
), or functions (
## &
## )


And here’s the takeaway:
Directives made AngularJS powerful, but also complicated.
They’re the ancestor of everything we now call “components.”






















⚙ Chapter 4 – Services, Factories, and
## Dependency Injection
So far, we’ve had controllers that hold data and handle user actions.
But imagine a big app — multiple pages, multiple controllers.
What if two controllers need the same data?
Or both talk to the same API?
Or both need the same logic (like formatting a date)?

You could copy-paste that code everywhere...
but that’s the road to developer pain 
AngularJS solves this with services and dependency injection.

易 What’s a Service?
A service is just a reusable object or function that does one thing — and you can inject it
anywhere you need it.
React world equivalent? Think of it like a
utils.js
file, or a custom hook (
useTodos()
## ),
except AngularJS automatically creates and shares it for you.
You define a service once, Angular keeps it alive, and injects the same instance into any
controller that asks for it.

⚗ How Dependency Injection Works (in plain words)
When you write something like:
app.controller('MainCtrl', function($scope, TodoService) { ... });

AngularJS sees that second parameter —
TodoService
— and says:
“Okay, this controller needs a thing called
TodoService
. I’ll go look for it, create it if needed,
and pass it in.”
No imports.
No new instances.
No singletons you have to manage.
Angular handles all of it.

## 里 Building Our First Service: Todo Manager
Let’s rebuild the Todo app, but this time the controller doesn’t store todos directly.
Instead, we’ll move that logic into a service.
Here’s the full working app 

<!DOCTYPE html>
<html ng-app="todoApp">
## <head>
<title>AngularJS Todo with Service</title>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
## <style>
body { font-family: sans-serif; margin: 30px; max-width: 400px; }
li.done { text-decoration: line-through; color: gray; }
input[type="text"] { padding: 5px; width: 70%; }
button { margin-left: 5px; padding: 5px 10px; }
## </style>
## </head>
<body ng-controller="TodoCtrl">

<h2> Todo List (Service Edition)</h2>

<input type="text" ng-model="newTask" placeholder="New task..." />
<button ng-click="addTodo()">Add</button>

## <ul>
<li ng-repeat="todo in todos" ng-class="{done: todo.done}">
<input type="checkbox" ng-model="todo.done" />
{{ todo.text }}
<button ng-click="remove($index)">x</button>
## </li>
## </ul>

## <script>
const app = angular.module('todoApp', []);

## // The Service
app.service('TodoService', function() {
const todos = [
{ text: 'Learn AngularJS services', done: false },
{ text: 'Refactor controllers', done: false }
## ];

this.getAll = function() {
return todos;
## };

this.add = function(task) {
todos.push({ text: task, done: false });
## };


this.remove = function(index) {
todos.splice(index, 1);
## };
## });

## // The Controller
app.controller('TodoCtrl', function($scope, TodoService) {
$scope.todos = TodoService.getAll();

$scope.addTodo = function() {
if ($scope.newTask) {
TodoService.add($scope.newTask);
$scope.newTask = '';
## }
## };

$scope.remove = function(index) {
TodoService.remove(index);
## };
## });
## </script>
## </body>
## </html>

✅ Works exactly like before — but now all data logic lives in a clean, testable service.
You can use
TodoService
in any controller in the app.

易 Service vs Factory vs Provider — The 3 Flavors
AngularJS gives you three ways to create injectable things:
Type How it works Example
service
Angular calls it with
new

(acts like a class)
app.service('TodoService', function() {
this.getAll = ... })

factory

You return an object
manually
app.factory('TodoFactory', function() {
return {...}; })


provide
r

Most flexible, used for
config
app.provider('TodoProvider', function()
## { ... })

In most real-world code, you’ll see services and factories.
Providers are rare — used mostly for library setups.

⚗ Example: The Same Todo App with a Factory
Here’s the exact same logic, written with
factory
instead of
service
## .
app.factory('TodoFactory', function() {
const todos = [
{ text: 'Use factory pattern', done: false }
## ];

return {
getAll() { return todos; },
add(task) { todos.push({ text: task, done: false }); },
remove(index) { todos.splice(index, 1); }
## };
## });

The difference is subtle but important:
## ●
service
uses
this
(Angular creates the instance for you)

## ●
factory
returns an object manually

Pick whichever fits your style.
Factories are great for functional code.
Services feel more like classes.

 Why DI Is a Big Deal
Dependency Injection in AngularJS is more than convenience.
It gives you:

● Testability — you can mock dependencies easily

● Reusability — one service, many controllers

● Maintainability — less repetition

● Lifecycle control — AngularJS manages when things are created

This concept is everywhere now — even React apps use dependency-like patterns with Context
or hooks.
AngularJS just made it built-in way back in 2010.

里 Adding a Filter Service (Optional Bonus)
Let’s build a small service that returns only active todos.
app.service('TodoFilter', function() {
this.activeOnly = function(todos) {
return todos.filter(todo => !todo.done);
## };
## });

And use it in the controller:
app.controller('TodoCtrl', function($scope, TodoService, TodoFilter) {
$scope.todos = TodoService.getAll();
$scope.showActive = function() {
$scope.todos = TodoFilter.activeOnly(TodoService.getAll());
## };
## });

Add a button:
<button ng-click="showActive()">Show Active</button>

Simple, clean, and modular.
That’s how AngularJS wants you to think: split logic into services, wire them up through DI.


吝 Real-World Parallel (React Dev View)
Concept React AngularJS 1.8
## Reusable
logic
## Custom Hook (
useTodos
## )
## Service
Shared state Context API Injected singleton service
DI system Manual (via props/context) Built-in
Instantiation Controlled by you Managed by AngularJS injector
So if React is all about composing components, AngularJS is about injecting collaborators.
Different mindset, same goal: reusable logic.

 Wrap-Up
Let’s recap:
● Services are single-instance objects managed by AngularJS

● You inject them into controllers or other services

● Factories are similar, but return objects manually

● DI (Dependency Injection) is AngularJS’s way to wire everything together cleanly

 Real talk: once you “get” AngularJS DI, you start noticing it everywhere — backend
frameworks, frontend libraries, even React hooks echo the same idea.








## 吝 Chapter 5 – Routing: Turning Pages
## Without Reloads
You know how in React we use
react-router
to handle multiple pages?
AngularJS had that idea long before React even existed.
It’s called
ngRoute
## .
Routing in AngularJS lets you:
● Define different views (HTML templates)

● Attach controllers to each view

● Switch between them without reloading the whole page

Think of it as a mini navigation system for single-page apps.

## 里 Step 1 – Setup
AngularJS core doesn’t include routing by default, so we need the extra module.
Add this line after AngularJS:
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular-route.min.js"></script>

Then, inject the module into your app:
const app = angular.module('todoApp', ['ngRoute']);

Now Angular knows how to handle routing.


## 里 Step 2 – Define Routes
We’ll tell Angular:
“When the URL looks like
## /home
, show the home view.
When it’s
## /about
, show the about view.”
Add this inside your main script:
app.config(function($routeProvider) {
$routeProvider
## .when('/home', {
templateUrl: 'home.html',
controller: 'HomeCtrl'
## })
## .when('/about', {
templateUrl: 'about.html',
controller: 'AboutCtrl'
## })
## .otherwise({
redirectTo: '/home'
## });
## });

Let’s break that down:
## ●
.when(path, config)
→ sets up a route

## ●
templateUrl
→ which HTML file to show

## ●
controller
→ which JS controller to use

## ●
## .otherwise()
→ fallback if path doesn’t match


## 里 Step 3 – The Main Shell (index.html)
Here’s a working full example.
<!DOCTYPE html>
<html ng-app="todoApp">

## <head>
<title>AngularJS Routing Example</title>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
## <script
src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular-route.min.js"></script>
## <style>
body { font-family: sans-serif; margin: 20px; }
nav a { margin-right: 15px; text-decoration: none; color: blue; }
nav a.active { font-weight: bold; color: darkblue; }
## </style>
## </head>
## <body>

## <nav>
<a href="#!/home" ng-class="{active: isActive('/home')}">Home</a>
<a href="#!/about" ng-class="{active: isActive('/about')}">About</a>
## </nav>

<div ng-view></div>

## <script>
const app = angular.module('todoApp', ['ngRoute']);

## // ROUTES
app.config(function($routeProvider) {
$routeProvider
## .when('/home', {
templateUrl: 'home.html',
controller: 'HomeCtrl'
## })
## .when('/about', {
templateUrl: 'about.html',
controller: 'AboutCtrl'
## })
## .otherwise({
redirectTo: '/home'
## });
## });

## // CONTROLLERS
app.controller('HomeCtrl', function($scope) {
$scope.message = "Welcome to the Todo Home!";
## });


app.controller('AboutCtrl', function($scope) {
$scope.info = "This app was built with AngularJS 1.8. A blast from the past!";
## });

## // ACTIVE NAV HELPER
app.run(function($rootScope, $location) {
$rootScope.isActive = function(route) {
return route === $location.path();
## };
## });
## </script>

## </body>
## </html>

Then create two small template files next to it:
home.html
## <h2> Home</h2>
<p>{{ message }}</p>

about.html
## <h2>ℹ About</h2>
<p>{{ info }}</p>

✅ Now open
index.html
in your browser and click the links.
You’ll see the view change — but the page never reloads.

##  How It Works
AngularJS watches the part of the URL after the
## #
## (hash).
For example:
## #!/home
## #!/about


That’s called hashbang routing — a clever old trick to make single-page apps work even
before modern browsers had the History API.
## The
<div ng-view></div>
is the magic placeholder.
AngularJS swaps in the HTML from
templateUrl
every time the route changes.

## 易 Optional: Use Inline Templates
You can skip separate HTML files and use inline templates:
$routeProvider
## .when('/home', {
template: '<h2> Home</h2><p>{{ message }}</p>',
controller: 'HomeCtrl'
## })

This is handy for small demos or quick prototypes.

里 Step 4 – Combine Routing with Services
Let’s make it a bit more real.
We’ll bring back our TodoService, but only load it on the home page.
app.controller('HomeCtrl', function($scope, TodoService) {
$scope.todos = TodoService.getAll();

$scope.addTodo = function() {
if ($scope.newTask) {
TodoService.add($scope.newTask);
$scope.newTask = '';
## }
## };

$scope.remove = function(index) {
TodoService.remove(index);
## };
## });


## And
home.html
can now show:
## <h2> Todos</h2>
<input type="text" ng-model="newTask" placeholder="New task..." />
<button ng-click="addTodo()">Add</button>

## <ul>
<li ng-repeat="todo in todos" ng-class="{done: todo.done}">
<input type="checkbox" ng-model="todo.done" />
{{ todo.text }}
<button ng-click="remove($index)">x</button>
## </li>
## </ul>

✅ You now have a real single-page Todo app — fully modular:
● Routing (switching pages)

● Services (data logic)

● Controllers (view logic)


里 Step 5 – Bonus: Pretty URLs (Optional)
If you hate
## #!/home
in your URLs, AngularJS supports “HTML5 mode” routing too — but it
needs server support.
app.config(function($locationProvider) {
$locationProvider.html5Mode(true);
## });

Then you can use normal paths like
## /home
and
## /about
## .
But you’ll need to configure your server to always return
index.html
for unknown routes (just
like React Router does).

##  React Developer Comparison

Concept React AngularJS 1.8
Router library react-router ngRoute
## Route
declaration
<Route path="/">

$routeProvider.when('/home',
## ...)

Route view
<Outlet />
or
<Routes>

<div ng-view>

## Navigation
<Link to="/home">

<a href="#!/home">

State transfer Context / Props
$rootScope
## ,
## $location
## , Services
Different syntax, same mental model.
One view at a time, no reloads, dynamic content.

 Wrap-Up
Here’s what you’ve learned:
## ●
ngRoute
gives you client-side navigation

## ●
ng-view
is the dynamic view outlet

## ●
$routeProvider
maps URLs to templates and controllers

● You can mix routes with services and scopes for complete SPAs

AngularJS 1.8 might be old-school, but this routing concept is still the foundation of how modern
SPAs work — React Router, Vue Router, Angular Router — all follow this same principle.

Next up:
✨ Chapter 6 – Filters and Expressions: Making Data Look Good
We’ll format text, filter lists, and even write custom filters (AngularJS’s version of React’s inline
## .map()
## +
## .filter()
magic).





燐 Chapter 6 – Filters and Expressions:
## Making Data Look Good
Here’s the thing — your data and how it looks on screen aren’t always the same thing.
Maybe you want uppercase text. Or filter a list of completed tasks. Or show a date in a nice
format.
In React, you’d do that inside your JSX:
## {todos.filter(t => !t.done).map(t => <li>{t.text}</li>)}

In AngularJS, you can do that right inside the template — with filters.

里 What’s a Filter?
A filter takes a value, does something to it, and returns a new value.
You use them with the pipe symbol (
## |
) inside AngularJS expressions.
## Example:
<p>{{ name | uppercase }}</p>

## If
## $scope.name = 'alice'
## ,
AngularJS will render:
## ALICE

Filters don’t change your actual data — they only format it for display.


## 里 Built-in Filters
AngularJS ships with some useful filters out of the box.
Filter What it does Example
uppercas
e

Converts text to all caps `{{ name
lowercas
e

Converts text to lowercase `{{ name
currency

Formats number as money `{{ price
date

Formats a timestamp `{{ today
number

Adds commas and decimal
places
## `{{ 1234567
filter

Filters arrays by condition `{{ todos
orderBy

Sorts an array `{{ todos
Let’s play with some of these 

⚗ Example 1: Display Filters in Action
<!DOCTYPE html>
<html ng-app="filterApp">
## <head>
<title>AngularJS Filters Example</title>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
## </head>
<body ng-controller="MainCtrl">

<h3>Built-in Filters Demo</h3>

<p>Original: {{ name }}</p>
<p>Uppercase: {{ name | uppercase }}</p>
<p>Lowercase: {{ name | lowercase }}</p>
<p>Today’s Date: {{ today | date:'fullDate' }}</p>
<p>Price: {{ price | currency:'USD$' }}</p>


## <script>
const app = angular.module('filterApp', []);

app.controller('MainCtrl', function($scope) {
$scope.name = 'Alice Johnson';
$scope.today = new Date();
## $scope.price = 1999.99;
## });
## </script>
## </body>
## </html>

✅ Try changing the locale of the currency filter to see different results.

## ⚙ Example 2: Filtering Arrays
Now let’s bring back our Todo list and show only completed or active items using filters.
<!DOCTYPE html>
<html ng-app="todoFilterApp">
## <head>
<title>Todo Filter Example</title>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
## <style>
li.done { text-decoration: line-through; color: gray; }
## </style>
## </head>
<body ng-controller="TodoCtrl">

## <h2> Todos</h2>
<input type="text" ng-model="searchText" placeholder="Search todos..." />

<h4>All Todos</h4>
## <ul>
<li ng-repeat="todo in todos | filter:searchText | orderBy:'text'" ng-class="{done: todo.done}">
<input type="checkbox" ng-model="todo.done"> {{ todo.text }}
## </li>
## </ul>

<h4>Active Todos</h4>

## <ul>
<li ng-repeat="todo in todos | filter:{done:false}">
{{ todo.text }}
## </li>
## </ul>

## <script>
const app = angular.module('todoFilterApp', []);

app.controller('TodoCtrl', function($scope) {
## $scope.todos = [
{ text: 'Learn AngularJS filters', done: false },
{ text: 'Use ng-repeat with filter', done: true },
{ text: 'Write custom filters', done: false }
## ];
## });
## </script>
## </body>
## </html>

✅ Type something into the search box — the list filters in real time.
✅ See how
filter:{done:false}
shows only active todos? That’s AngularJS’s mini query
language.

⚗ Example 3: Writing a Custom Filter
Sometimes you want your own logic — like showing only todos longer than 10 characters.
Let’s make a custom filter called
longText
## .
app.filter('longText', function() {
return function(items) {
return items.filter(item => item.text.length > 10);
## };
## });

And use it like this:
<li ng-repeat="todo in todos | longText">
{{ todo.text }}

## </li>

✅ Filters are reusable — any controller or view can use
longText
## .

## ⚙ Example 4: Combining Multiple Filters
You can chain filters just like Unix pipes:
{{ name | uppercase | limitTo:5 }}

## If
name = "AngularJS"
, it becomes:
## ANGUL

Angular applies them left to right — each one’s output is the next one’s input.

 Behind the Scenes: How Filters Work
Under the hood, AngularJS has a filter registry — basically a dictionary of available filters.
When it sees
{{ value | something }}
, it looks up
## "something"
in the registry and runs
that function.
Filters are pure functions — they don’t mutate your data, they just return formatted copies.
That’s why you can chain them freely without worrying about side effects.

⚖ React vs AngularJS Mental Map
Concept React AngularJS 1.8
Filter a list
## .filter()
in JS
## `
Sort a list
## .sort()

## `
Format text JS string functions `

## Format
numbers
Intl.NumberFormat()

## `
Format date
toLocaleDateString(
## )

## `
Custom logic Helper functions or hooks Custom filters
So in React you usually do data shaping in JavaScript.
In AngularJS, you do it in the template.
Both are fine — just different philosophies.

 Wrap-Up
Here’s what you’ve learned:
● Filters format or transform data in templates

● AngularJS includes built-in filters for text, numbers, and arrays

● You can chain filters and even write your own

● They’re pure and reusable — no side effects

Filters make templates expressive and readable — like saying what you want, not how to do it.





## 喙 Chapter 7 – The Digest Deep Dive: How
AngularJS Knows Something Changed
You’ve seen that when you type something into an
ng-model
, the UI updates automatically.
## No
setState
, no DOM manipulation — it “just works.”

But how?
How does AngularJS know that a value changed?
The answer:
 The Digest Cycle and Watchers.

## 易 The Big Idea
AngularJS constantly checks your data for changes.
It doesn’t wait for you to call a function.
It keeps a list of watchers — small pieces of code that “watch” specific values — and
re-renders when something changes.
In other words:
AngularJS doesn’t listen to what changed — it keeps asking “did anything change?”
over and over again.

## 里 Example: A Simple Watcher
Here’s a minimal example to see how AngularJS keeps track.
<!DOCTYPE html>
<html ng-app="watchApp">
## <head>
<title>AngularJS Watcher Example</title>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
## </head>
<body ng-controller="MainCtrl">
<p>Count: {{ count }}</p>
<button ng-click="increment()">+</button>

## <script>
const app = angular.module('watchApp', []);

app.controller('MainCtrl', function($scope) {
## $scope.count = 0;

// Watcher setup
$scope.$watch('count', function(newVal, oldVal) {

console.log('Count changed from', oldVal, 'to', newVal);
## });

$scope.increment = function() {
## $scope.count++;
## };
## });
## </script>
## </body>
## </html>

✅ Every time you click the button, Angular logs the change.
It didn’t need you to call anything — it watched the variable.

⚙ The Digest Cycle — Step by Step
When something happens (like a click or HTTP response), AngularJS starts a digest cycle.
Here’s what that means, simplified:
- AngularJS goes through every watcher on the current
## $scope
## .

- Each watcher compares the current value to the last known value.

- If something changed, AngularJS updates the DOM and runs the watcher’s callback.

- It repeats this process until no values change — to catch cascading updates.

In pseudocode:
do {
dirty = false;
for (let watcher of watchers) {
if (watcher.valueChanged()) {
watcher.callback();
dirty = true;
## }
## }
} while (dirty);


Angular keeps looping until the app is “stable.”
That’s why sometimes people call it the dirty checking loop.

易 “Dirty Checking” — It Sounds Bad, But It Works
It sounds inefficient, but it’s actually pretty clever.
Instead of manually subscribing to every variable (like React’s hooks or MobX observables),
AngularJS just checks them periodically.
Because watchers only compare small values, it’s fast enough for most apps.
The real issue comes when you have hundreds or thousands of bindings.
That’s when digest cycles can start to lag.

⚗ When Does the Digest Run?
AngularJS runs
## $digest()
automatically whenever it knows something might have changed.
## Examples:
● You click something →
ng-click

● You type in an input →
ng-model

● You fetch data →
## $http

● You trigger a directive →
ng-show
## ,
ng-repeat
, etc.

Angular wraps all these events inside
## $apply()
, which ensures a
## $digest()
runs afterward.
So usually, you don’t need to call
## $digest()
yourself.
But if you change data outside AngularJS (like using
setTimeout
or a non-Angular library),
Angular won’t notice — and that’s when
## $apply()
comes in handy.


## 里 Example: Manual $apply
<div ng-app="applyApp" ng-controller="MainCtrl">
<p>Time: {{ time }}</p>
<button ng-click="update()">Update Time</button>
## </div>

## <script>
const app = angular.module('applyApp', []);

app.controller('MainCtrl', function($scope) {
$scope.time = new Date().toLocaleTimeString();

// Won’t trigger digest automatically
setInterval(function() {
$scope.time = new Date().toLocaleTimeString();
// Angular won’t notice unless we tell it
$scope.$apply(); // manually trigger a digest
## }, 1000);

$scope.update = function() {
$scope.time = new Date().toLocaleTimeString();
## };
## });
## </script>

## ✅ Without
## $apply()
, the time would never update.
## ✅
## $apply()
is your “hey Angular, wake up!” signal.

隣 Watchers in Depth
## Each
{{ expression }}
in your HTML adds one watcher.
So this:
<p>{{ user.name }}</p>
<p>{{ user.email }}</p>
<p>{{ user.phone }}</p>

...means 3 watchers.

If you have
ng-repeat
over 100 items, and each item has 3 bindings — boom, 300 watchers.
That’s why performance can dip in large AngularJS apps.
The digest loop must re-check every one, every time.
You can check how many watchers your app has with:
angular.element(document.body).injector().get('$rootScope').$$watchersCount

(Be careful — that’s an internal property, not for production.)

里 Example: Watching Objects and Collections
You can watch a single value:
$scope.$watch('name', fn);

Or a whole object:
$scope.$watch('user', fn, true);

That third parameter (
true
) enables deep watching — Angular compares every property
inside the object.
You can also watch a collection (array):
$scope.$watchCollection('todos', fn);

That’s faster than deep watching, because it only checks length and shallow keys.

## ⚠ Performance Tips
- Keep your watchers small and simple.

## 2. Use
track by
in
ng-repeat
to prevent unnecessary re-renders.


- Avoid unnecessary
## {{}}
bindings inside large lists.

## 4. Prefer
$watchCollection
instead of deep
## $watch
for arrays.

- If needed, debounce updates with
## $timeout
## .

AngularJS was designed before virtual DOMs were cool — it relies on you keeping things
reasonable.

里 Bonus: Forcing a Digest from the Console
Open your browser console and type:
angular.element(document.body).scope().$apply(() => {
angular.element(document.body).scope().count = 999;
## });

You’ll see the change instantly — AngularJS just did a manual digest for you.

吝 Comparing to React
Concept React AngularJS 1.8
Change detection Virtual DOM diff Digest loop with watchers
Update trigger
setState()
## /
useState()

## $apply()
/ built-in
events
Scope tree Component tree
## $scope
hierarchy
## Performance
model
Re-renders only changed
components
Checks every watcher
Mental model Pull changes Push + Poll hybrid
So in React, changes are “pushed” when you call
setState()
## .
In AngularJS, changes are “pulled” by checking everything in a loop.

Different philosophies — both valid for their time.

 Wrap-Up
Here’s what you’ve learned:
● AngularJS keeps your UI in sync using a digest loop

● Every binding creates a watcher

## ●
## $digest()
compares old and new values

## ●
## $apply()
triggers a digest manually

● Too many watchers = slow app 

Understanding this is key — it explains almost every AngularJS quirk you’ll ever debug.
When something doesn’t update, it’s almost always because a digest didn’t run.

 Chapter 8 – Talking to APIs with $http:
Getting Real Data In and Out
Up until now, our data’s been living in
## $scope
like it’s 2013.
That’s fine for demos, but real apps need to fetch, send, and update data from servers.
AngularJS has a built-in way to do this: the
## $http
service.
Think of
## $http
as the old-school equivalent of
fetch()
or
axios
, but built directly into
Angular’s dependency injection system.

## 易 What
## $http Actually Is

## $http
is just a service that wraps around the browser’s
XMLHttpRequest
or Fetch API.
It returns a promise, so you can use
## .then()
to handle the response.
The syntax looks like this:
## $http.get('/api/todos')
## .then(function(response) {
console.log(response.data);
## })
## .catch(function(error) {
console.error(error);
## });

That’s it —
## $http
gives you a clean, Angular-friendly promise flow.
No callbacks, no messy manual JSON parsing.

里 Example 1: Fetch Data from a Public API
Let’s hit a real open API (JSONPlaceholder — a fake API for demos).
<!DOCTYPE html>
<html ng-app="apiApp">
## <head>
<title>AngularJS $http Example</title>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
## <style>
body { font-family: sans-serif; margin: 20px; }
li { margin: 6px 0; }
## </style>
## </head>
<body ng-controller="ApiCtrl">

<h2> Public Posts (from JSONPlaceholder)</h2>

<button ng-click="loadPosts()">Load Posts</button>

## <ul>
<li ng-repeat="post in posts">
<strong>{{ post.title | uppercase }}</strong><br />
{{ post.body }}
## </li>

## </ul>

## <script>
const app = angular.module('apiApp', []);

app.controller('ApiCtrl', function($scope, $http) {
## $scope.posts = [];

$scope.loadPosts = function() {
## $http.get('https://jsonplaceholder.typicode.com/posts')
## .then(function(response) {
$scope.posts = response.data.slice(0, 5); // just show 5
## })
## .catch(function(error) {
console.error('Error fetching posts:', error);
## });
## };
## });
## </script>
## </body>
## </html>

✅ Click “Load Posts” — Angular fetches data from a real API, updates
## $scope
, and the DOM
refreshes automatically.
No extra re-renders, no manual updates —
## $digest()
handles it behind the scenes.

⚙ Example 2: POST New Data
You can also send data with
## $http.post()
— like adding a new Todo.
## $http.post('https://jsonplaceholder.typicode.com/posts', {
title: 'New Task',
body: 'Learn AngularJS HTTP service',
userId: 1
## })
## .then(function(response) {
console.log('Created:', response.data);
## });


The fake API will always return a “created” object — useful for testing UI updates.

## 隣 The
## $http Configuration Object
## Every
## $http
call can take a config object instead of a shortcut like
## .get()
or
## .post()
## .
## $http({
method: 'GET',
url: '/api/todos',
headers: { 'Authorization': 'Bearer 123' },
params: { limit: 10 }
## });

That’s how you send headers, query params, and more.

## 里 Example 3: Integrate
$http into a Service
Let’s refactor and do it the Angular way: keep API logic in a service, not a controller.
<!DOCTYPE html>
<html ng-app="todoApiApp">
## <head>
<title>AngularJS API Todo App</title>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
## <style>
body { font-family: sans-serif; margin: 20px; }
li.done { text-decoration: line-through; color: gray; }
## </style>
## </head>
<body ng-controller="TodoCtrl">

<h2> Todo List (API Version)</h2>
<button ng-click="loadTodos()">Load Todos</button>

## <ul>
<li ng-repeat="todo in todos" ng-class="{done: todo.completed}">
<input type="checkbox" ng-model="todo.completed"> {{ todo.title }}
## </li>

## </ul>

## <script>
const app = angular.module('todoApiApp', []);

## // Todo Service
app.service('TodoService', function($http) {
this.getAll = function() {
return $http.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
## };

this.add = function(task) {
return $http.post('https://jsonplaceholder.typicode.com/todos', {
title: task,
completed: false
## });
## };
## });

## // Controller
app.controller('TodoCtrl', function($scope, TodoService) {
## $scope.todos = [];

$scope.loadTodos = function() {
TodoService.getAll()
## .then(function(response) {
$scope.todos = response.data;
## })
## .catch(function(err) {
console.error('Error loading todos:', err);
## });
## };
## });
## </script>
## </body>
## </html>

✅ One click → AngularJS fetches todos from an API →
## $scope.todos
updates → DOM
updates.
Beautiful, simple, reactive.


##  Handling Loading & Errors
Always add loading states for good UX.
$scope.loading = false;
$scope.error = null;

$scope.loadTodos = function() {
$scope.loading = true;
$scope.error = null;

TodoService.getAll()
## .then(function(response) {
$scope.todos = response.data;
## })
## .catch(function() {
$scope.error = 'Failed to load todos.';
## })
## .finally(function() {
$scope.loading = false;
## });
## };

In the HTML:
<p ng-show="loading">Loading...</p>
<p ng-show="error" style="color:red;">{{ error }}</p>

✅ AngularJS templates automatically update based on these values — no manual UI state
management needed.

⚙ Bonus: Interceptors (Like Axios Middleware)
You can globally catch and modify requests/responses using
$httpProvider.interceptors
## .
## Example:
app.config(function($httpProvider) {
$httpProvider.interceptors.push(function() {

return {
request: function(config) {
console.log('Outgoing request:', config.url);
return config;
## },
responseError: function(rejection) {
alert('HTTP Error!');
return Promise.reject(rejection);
## }
## };
## });
## });

Now every
## $http
call logs before sending and handles global errors.

## 吝 React Developer Comparison
Concept React AngularJS 1.8
HTTP Library fetch / axios
## $http
## (built-in)
Async pattern Promises or
async/await
## Promises (then/catch)
State update
setState()
or hooks
## $scope
binding triggers
digest
API handling Custom Built-in DI & interceptors
Reusability Custom hooks or utils AngularJS services
So in React, you’d call an API in
useEffect()
and update state.
In AngularJS, you call
## $http
and Angular updates bindings automatically.
Different syntax — same outcome.

 Wrap-Up
Here’s what you’ve learned:

## ●
## $http
handles all HTTP operations in AngularJS

● It returns promises with
## .then()
## ,
## .catch()
## ,
## .finally()

● You can send GET, POST, PUT, DELETE requests easily

● Keep all API calls inside services for clean, testable architecture

● Interceptors let you modify or log requests globally

##  Understanding
## $http
is key to mastering real-world AngularJS — everything that talks to a
backend goes through it.





## Perfect ✔
This is the fun part — we finally put it all together.


 Chapter 9 – Structuring a Real App:
## Bringing It All Together
By now, you’ve seen AngularJS’s parts in isolation.
But the real challenge (and beauty) lies in how you connect them.
We’re going to build a Mini Todo Dashboard that:
● Has multiple pages (routing)

● Uses a service for shared data (DI)


● Fetches data from an API (
## $http
## )

● Uses filters to format it

● Has directives for reusable UI

● Uses clean project structure


## 里 Project Setup
You can do this in one folder — no build tools, no transpiling.
Just plain HTML + JS.
## /mini-todo-app
## │
├── index.html
├── app.js
├── controllers/
│   ├── homeCtrl.js
│   └── aboutCtrl.js
├── services/
│   └── todoService.js
├── directives/
│   └── todoItem.js
├── views/
│   ├── home.html
│   └── about.html



易 Step 1 – index.html
This is our entry point and main template.
<!DOCTYPE html>
<html ng-app="miniTodoApp">
## <head>
<title>Mini AngularJS Todo App</title>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
## <script
src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular-route.min.js"></script>

## <!-- App Files -->
<script src="app.js"></script>
<script src="controllers/homeCtrl.js"></script>
<script src="controllers/aboutCtrl.js"></script>
<script src="services/todoService.js"></script>
<script src="directives/todoItem.js"></script>

## <style>
body { font-family: sans-serif; margin: 30px; }
nav a { margin-right: 15px; text-decoration: none; color: blue; }
nav a.active { font-weight: bold; color: darkblue; }
.done { text-decoration: line-through; color: gray; }
## </style>

## </head>
## <body>

<h1>里 Mini AngularJS Todo App</h1>

## <nav>
<a href="#!/home" ng-class="{active: isActive('/home')}">Home</a>
<a href="#!/about" ng-class="{active: isActive('/about')}">About</a>
## </nav>

<div ng-view></div>

## </body>
## </html>


⚙ Step 2 – app.js
This sets up routing and global helpers.
const app = angular.module('miniTodoApp', ['ngRoute']);

app.config(function($routeProvider) {
$routeProvider
## .when('/home', {
templateUrl: 'views/home.html',

controller: 'HomeCtrl'
## })
## .when('/about', {
templateUrl: 'views/about.html',
controller: 'AboutCtrl'
## })
.otherwise({ redirectTo: '/home' });
## });

app.run(function($rootScope, $location) {
$rootScope.isActive = function(route) {
return route === $location.path();
## };
## });


里 Step 3 – The Todo Service (services/todoService.js)
Handles API calls and stores todo data.
app.service('TodoService', function($http) {
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

this.getAll = function(limit = 5) {
return $http.get(`${API_URL}?_limit=${limit}`);
## };


this.add = function(title) {
return $http.post(API_URL, { title, completed: false });
## };

this.remove = function(id) {
return $http.delete(`${API_URL}/${id}`);
## };
## });


里 Step 4 – Todo Directive (directives/todoItem.js)
Reusable todo item component.
app.directive('todoItem', function() {
return {
restrict: 'E',
scope: {
todo: '=',
onDelete: '&'
## },
template: `
<li ng-class="{done: todo.completed}">
<input type="checkbox" ng-model="todo.completed" />
{{ todo.title }}

<button ng-click="onDelete()">x</button>
## </li>
## `
## };
## });


## 里 Step 5 – Controllers
controllers/homeCtrl.js
app.controller('HomeCtrl', function($scope, TodoService) {
## $scope.todos = [];
$scope.newTask = '';
$scope.loading = false;
$scope.error = null;

$scope.loadTodos = function() {
$scope.loading = true;
TodoService.getAll()
## .then(function(response) {
$scope.todos = response.data;
## })
## .catch(function() {
$scope.error = 'Failed to load todos';
## })

## .finally(function() {
$scope.loading = false;
## });
## };

$scope.addTodo = function() {
if ($scope.newTask.trim()) {
TodoService.add($scope.newTask)
## .then(function(response) {
## $scope.todos.push(response.data);
$scope.newTask = '';
## });
## }
## };

$scope.removeTodo = function(index, id) {
TodoService.remove(id)
## .then(function() {
## $scope.todos.splice(index, 1);
## });
## };

// Initial load
$scope.loadTodos();

## });

controllers/aboutCtrl.js
app.controller('AboutCtrl', function($scope) {
## $scope.info = {
title: 'About This App',
text: 'This mini project was built with AngularJS 1.8 to demonstrate modules, routing,
directives, services, and API handling. It’s simple, modular, and nostalgic.'
## };
## });


## 里 Step 6 – Views
views/home.html
## <h2> Todo List</h2>

<p ng-show="loading">Loading...</p>
<p ng-show="error" style="color:red;">{{ error }}</p>

<input type="text" ng-model="newTask" placeholder="Add a new task..." />
<button ng-click="addTodo()">Add</button>

## <ul>
## <todo-item

ng-repeat="todo in todos | orderBy:'title'"
todo="todo"
on-delete="removeTodo($index, todo.id)">
## </todo-item>
## </ul>

views/about.html
<h2>{{ info.title }}</h2>
<p>{{ info.text }}</p>


易 Step 7 – What’s Happening Behind the Scenes
Here’s how the whole flow works together:
## 1.
index.html
loads the AngularJS app and sets up the view container (
ng-view
## ).

## 2.
app.js
configures the routes:
## /home
## →
HomeCtrl
## ,
## /about
## →
AboutCtrl
## .

- When you visit
## /home
## :

## ○
HomeCtrl
loads.

○ It calls
TodoService.getAll()
using
## $http
## .

○ When the promise resolves,
## $scope.todos
updates.

○ The digest loop detects the change → DOM updates.

## 4. The
todo-item
directive renders each todo, and the delete button triggers
removeTodo()
## .


## 5.
## /about
shows a static info page.

Everything you’ve learned — binding, DI, services, directives, routing,
## $http
, filters — works
together cleanly.

## 里 Step 8 – Optional Improvements
You can make this app even cooler:
● Add a filter dropdown (
## All
## ,
## Active
## ,
## Completed
) using Angular filters.

● Save new todos to localStorage if API fails.

● Add a custom directive for a loading spinner.

● Split the code further into modules (e.g.,
todoModule
## ,
coreModule
## ).


⚖ React vs AngularJS Structure
Concept React AngularJS 1.8
## Component
s
JSX components Directives
State useState/useReduc
er
## $scope

Routing react-router ngRoute
Data layer Hooks + fetch/axios Services + $http

App entry index.js + App.jsx ng-app + index.html
DI Manual imports Built-in
So AngularJS gives you a more “batteries-included” approach — everything from routing to
HTTP to DI is inside the framework.
React lets you pick and mix, AngularJS just hands you a full kitchen.

 Wrap-Up
## Congratulations 
You’ve built a complete, modular AngularJS 1.8 app from scratch.
You now understand:
● How modules, controllers, and services connect

● How routing drives different views

## ● How
## $http
handles data

● How the digest cycle keeps everything alive

● How directives make your own custom components

You’re officially fluent in legacy AngularJS — and that gives you deep insight into how modern
frameworks evolved.





 Chapter 10 – When You’re Ready to
## Move On
You’ve gone from typing
ng-app
to understanding
## $digest()
loops and dependency injection
like a pro.
You didn’t just “use” AngularJS — you understood how it thinks.
That’s huge.
Because once you understand how AngularJS works under the hood, every other frontend
framework starts making sense faster.
Let’s unpack that.

## 易 What You’ve Actually Learned
You didn’t just build a Todo app — you learned the full mental model of a frontend framework.
Here’s what that means:
## Concept What You Learned Why It Matters
Modules Split your app into parts
## (
angular.module
## )
Teaches modular design and
dependency management
## Controllers &
## Scopes
Manage local state and
templates
Similar to component state in
React/Vue
Directives Create reusable UI (custom
## HTML)
Foundation for modern components
Services / DI Share logic and data Same pattern as hooks, contexts,
and composables

## Routing
## (
ngRoute
## )
Handle single-page navigation Mirrors React Router / Vue Router
Filters Transform data in templates Like computed props or JSX
functions
$http Fetch and post data with
promises
Same as fetch/axios patterns today
Digest Cycle Automatic DOM sync The ancestor of virtual DOM diffing
Basically, AngularJS is the grandparent of React, Vue, and Angular (2+).
Once you’ve understood it, learning the rest is like switching dialects — not learning a new
language.

⚙ What Happened After AngularJS
A quick bit of history (the short, honest version):
● AngularJS (1.x) was released in 2010.

● It changed everything — real two-way binding, dependency injection, client-side routing.

● But it got heavy. Big apps became slow. Debugging digest cycles was painful.

● In 2016, Google rebuilt it from scratch as Angular 2+ — a completely new framework.

● Around the same time, React and Vue took off, learning from AngularJS’s strengths and
avoiding its pitfalls.

So if you ever wonder,
“Why does React have one-way data flow?”
it’s because AngularJS’s two-way binding taught everyone what not to overdo .


 From AngularJS to React — The Mind Shift
Let’s map your new knowledge directly to React concepts:
AngularJS
## Concept
## React Equivalent Explanation
## $scope

useState

Both manage local data for a part of
the UI
## $watch()

Re-render triggers React auto re-renders when state
changes
ng-model
Controlled input (
value
## +
onChange
## )
Same goal, more explicit
ng-repeat

## {array.map()}

Rendering lists
directive

Functional Component Reusable UI piece
service

Custom Hook / Context Shared logic and state
## $http

fetch
or
axios

Same async pattern
ngRoute

react-router

Client-side routing

## $digest()

Virtual DOM diffing Both detect and apply DOM changes
filter

JS filter/map or computed Data transformation
So basically, AngularJS walked so React could run.

隣 From AngularJS to Angular (the newer one)
If you want to move to Angular 2+ (the TypeScript version), your AngularJS experience helps
even more.
AngularJS Angular 2+
## Controllers Components (class-based)
## Directives Components + Directives
Services Services (same concept)
## $http

HttpClient

Modules NgModules
## $scope

Template variables + reactive
state

## $watch()

RxJS Observables
## Filters Pipes
$routeProvid
er

## Angular Router
It’s the same philosophy — but rebuilt with TypeScript, classes, observables, and a modern
change detection system.
In short:
 AngularJS was dynamic and flexible.
 Angular 2+ is structured and type-safe.
 React is composable and functional.
And you’ll understand all three because you know the core ideas behind them.

 Where to Go Next
Here’s how you can move forward from here, depending on your goals:
吝 If you want to stick with Angular
● Learn Angular (2+) using TypeScript

● Focus on: Components, Modules, RxJS, Angular Router

● Good resources: Angular.io official tutorial

⚛ If you’re more into React
● Start mapping your AngularJS patterns to React Hooks

● Focus on: useState, useEffect, custom hooks, Context API


● Try building the same Todo app in React — you’ll see the parallels immediately

 If you like simplicity
● Give Vue.js a try — it feels like “modern AngularJS”

● The template syntax will look weirdly familiar (
v-for
## ,
v-model
## =
ng-repeat
## ,
ng-model
## )


里 Bonus Exercise – Rebuild the Todo App in React or
## Vue
Challenge yourself:
● Same API (
https://jsonplaceholder.typicode.com/todos
## )

● Same features (add, delete, mark complete)

● Same structure (service file, reusable component, router)

You’ll see how the exact same mental model applies everywhere —
just expressed in a different syntax.

##  Final Thoughts
AngularJS 1.8 might be “legacy,” but it’s also legendary.
It taught the frontend world:
● How to think in components

● How to manage data flow between UI and logic

● How dependency injection makes code scalable

● How automatic DOM updates change the game


If you ever need to work on an older AngularJS project — you can handle it confidently now.
And if you move to React or Angular 2+, you’ll see the patterns instantly.
You’ve basically learned frontend framework theory by mastering AngularJS.
Most developers never go that deep.

## 藺 Your Toolbox Now Includes
✅ DOM data binding
✅ Dependency injection
✅ Component creation (via directives)
✅ Client-side routing
✅ API handling with
## $http
✅ Template-driven filtering
✅ Digest-cycle change detection
That’s the foundation of every modern frontend framework — just with different syntax.

## 里 A Personal Note
You’ve done something rare:
You didn’t just “learn a framework.” You learned why frameworks exist.
Now, when you open a modern codebase, you’ll understand not just what it does, but why it’s
built that way.
That’s real developer power 

 And that’s it — our React Developer’s Journey into AngularJS 1.8.
You can now:
● Maintain any AngularJS legacy project

● Read older code with clarity

● Migrate ideas confidently to React, Vue, or Angular


● Teach someone else how these frameworks actually work

