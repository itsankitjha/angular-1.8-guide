# Chapter 9 – Structuring a Real App: Bringing It All Together

By now, you’ve seen AngularJS’s parts in isolation. But the real challenge (and beauty) lies in how you connect them.

We’re going to build a Mini Todo Dashboard that:
- Has multiple pages (routing)
- Uses a service for shared data (DI)
- Fetches data from an API (`$http`)
- Uses filters to format it
- Has directives for reusable UI
- Uses clean project structure

## Project Setup

You can do this in one folder — no build tools, no transpiling. Just plain HTML + JS.

```text
/mini-todo-app
├── index.html
├── app.js
├── controllers/
│   ├── homeCtrl.js
│   └── aboutCtrl.js
├── services/
│   └── todoService.js
├── directives/
│   └── todoItem.js
└── views/
    ├── home.html
    └── about.html
```

## Step 1 – `index.html`

This is our entry point and main template.

```html
<!DOCTYPE html>
<html ng-app="miniTodoApp">
<head>
  <title>Mini AngularJS Todo App</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular-route.min.js"></script>

  <!-- App Files -->
  <script src="app.js"></script>
  <script src="controllers/homeCtrl.js"></script>
  <script src="controllers/aboutCtrl.js"></script>
  <script src="services/todoService.js"></script>
  <script src="directives/todoItem.js"></script>

  <style>
    body { font-family: sans-serif; margin: 30px; }
    nav a { margin-right: 15px; text-decoration: none; color: blue; }
    nav a.active { font-weight: bold; color: darkblue; }
    .done { text-decoration: line-through; color: gray; }
  </style>

</head>
<body>

  <h1>Mini AngularJS Todo App</h1>

  <nav>
    <a href="#!/home" ng-class="{active: isActive('/home')}">Home</a>
    <a href="#!/about" ng-class="{active: isActive('/about')}">About</a>
  </nav>

  <div ng-view></div>

</body>
</html>
```

## Step 2 – `app.js`

This sets up routing and global helpers.

```javascript
const app = angular.module('miniTodoApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    })
    .otherwise({ redirectTo: '/home' });
});

app.run(function($rootScope, $location) {
  $rootScope.isActive = function(route) {
    return route === $location.path();
  };
});
```

## Step 3 – The Todo Service (`services/todoService.js`)

Handles API calls and stores todo data.

```javascript
app.service('TodoService', function($http) {
  const API_URL = 'https://jsonplaceholder.typicode.com/todos';

  this.getAll = function(limit = 5) {
    return $http.get(`${API_URL}?_limit=${limit}`);
  };

  this.add = function(title) {
    return $http.post(API_URL, { title, completed: false });
  };

  this.remove = function(id) {
    return $http.delete(`${API_URL}/${id}`);
  };
});
```

## Step 4 – Todo Directive (`directives/todoItem.js`)

Reusable todo item component.

```javascript
app.directive('todoItem', function() {
  return {
    restrict: 'E',
    scope: {
      todo: '=',
      onDelete: '&'
    },
    template: `
      <li ng-class="{done: todo.completed}">
        <input type="checkbox" ng-model="todo.completed" />
        <span v-pre>{{ todo.title }}</span>
        <button ng-click="onDelete()">x</button>
      </li>
    `
  };
});
```

## Step 5 – Controllers

**`controllers/homeCtrl.js`**

```javascript
app.controller('HomeCtrl', function($scope, TodoService) {
  $scope.todos = [];
  $scope.newTask = '';
  $scope.loading = false;
  $scope.error = null;

  $scope.loadTodos = function() {
    $scope.loading = true;
    TodoService.getAll()
      .then(function(response) {
        $scope.todos = response.data;
      })
      .catch(function() {
        $scope.error = 'Failed to load todos';
      })
      .finally(function() {
        $scope.loading = false;
      });
  };

  $scope.addTodo = function() {
    if ($scope.newTask.trim()) {
      TodoService.add($scope.newTask)
        .then(function(response) {
          $scope.todos.push(response.data);
          $scope.newTask = '';
        });
    }
  };

  $scope.removeTodo = function(index, id) {
    TodoService.remove(id)
      .then(function() {
        $scope.todos.splice(index, 1);
      });
  };

  // Initial load
  $scope.loadTodos();
});
```

**`controllers/aboutCtrl.js`**

```javascript
app.controller('AboutCtrl', function($scope) {
  $scope.info = {
    title: 'About This App',
    text: 'This mini project was built with AngularJS 1.8 to demonstrate modules, routing, directives, services, and API handling. It’s simple, modular, and nostalgic.'
  };
});
```

## Step 6 – Views

**`views/home.html`**

```html
<h2>Todo List</h2>

<p ng-show="loading">Loading...</p>
<p ng-show="error" style="color:red;"><span v-pre>{{ error }}</span></p>

<input type="text" ng-model="newTask" placeholder="Add a new task..." />
<button ng-click="addTodo()">Add</button>

<ul>
  <todo-item
    ng-repeat="todo in todos | orderBy:'title'"
    todo="todo"
    on-delete="removeTodo($index, todo.id)">
  </todo-item>
</ul>
```

**`views/about.html`**

```html
<h2><span v-pre>{{ info.title }}</span></h2>
<p><span v-pre>{{ info.text }}</span></p>
```

## Step 7 – What’s Happening Behind the Scenes

Here’s how the whole flow works together:

1. `index.html` loads the AngularJS app and sets up the view container (`ng-view`).
2. `app.js` configures the routes: `/home` → `HomeCtrl`, `/about` → `AboutCtrl`.
3. When you visit `/home`:
   - `HomeCtrl` loads.
   - It calls `TodoService.getAll()` using `$http`.
   - When the promise resolves, `$scope.todos` updates.
   - The digest loop detects the change → DOM updates.
4. The `todo-item` directive renders each todo, and the delete button triggers `removeTodo()`.
5. `/about` shows a static info page.

Everything you’ve learned — binding, DI, services, directives, routing, `$http`, filters — works together cleanly.

## Step 8 – Optional Improvements

You can make this app even cooler:
- Add a filter dropdown (`All`, `Active`, `Completed`) using Angular filters.
- Save new todos to `localStorage` if API fails.
- Add a custom directive for a loading spinner.
- Split the code further into modules (e.g., `todoModule`, `coreModule`).

## React vs AngularJS Structure

| Concept | React | AngularJS 1.8 |
|---------|-------|---------------|
| Components | JSX components | Directives |
| State | `useState`/`useReducer` | `$scope` |
| Routing | `react-router` | `ngRoute` |
| Data layer | Hooks + fetch/axios | Services + `$http` |
| App entry | index.js + App.jsx | ng-app + `index.html` |
| DI | Manual imports | Built-in |

So AngularJS gives you a more “batteries-included” approach — everything from routing to HTTP to DI is inside the framework. React lets you pick and mix, AngularJS just hands you a full kitchen.

## Congratulations 🎉

You’ve built a complete, modular AngularJS 1.8 app from scratch. You now understand:
- How modules, controllers, and services connect
- How routing drives different views
- How `$http` handles data
- How the digest cycle keeps everything alive
- How directives make your own custom components

You’re officially fluent in legacy AngularJS — and that gives you deep insight into how modern frameworks evolved.
