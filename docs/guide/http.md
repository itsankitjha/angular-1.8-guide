# Chapter 8 – Talking to APIs with `$http`

Up until now, our data’s been living in `$scope` like it’s 2013. That’s fine for demos, but real apps need to fetch, send, and update data from servers.

AngularJS has a built-in way to do this: the `$http` service.

Think of `$http` as the old-school equivalent of `fetch()` or `axios`, but built directly into Angular’s dependency injection system.

## What `$http` Actually Is

`$http` is just a service that wraps around the browser’s `XMLHttpRequest` or Fetch API. It returns a promise, so you can use `.then()` to handle the response.

The syntax looks like this:
```javascript
$http.get('/api/todos')
  .then(function(response) {
    console.log(response.data);
  })
  .catch(function(error) {
    console.error(error);
  });
```

That’s it — `$http` gives you a clean, Angular-friendly promise flow. No callbacks, no messy manual JSON parsing.

## Example 1: Fetch Data from a Public API

Let’s hit a real open API (JSONPlaceholder — a fake API for demos).

```html
<!DOCTYPE html>
<html ng-app="apiApp">
<head>
  <title>AngularJS $http Example</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
</head>
<body ng-controller="ApiCtrl">

  <h2>📚 Public Posts (from JSONPlaceholder)</h2>

  <button ng-click="loadPosts()">Load Posts</button>

  <ul>
    <li ng-repeat="post in posts">
      <strong><span v-pre>{{ post.title | uppercase }}</span></strong><br />
      <span v-pre>{{ post.body }}</span>
    </li>
  </ul>

  <script>
    const app = angular.module('apiApp', []);

    app.controller('ApiCtrl', function($scope, $http) {
      $scope.posts = [];

      $scope.loadPosts = function() {
        $http.get('https://jsonplaceholder.typicode.com/posts')
          .then(function(response) {
            $scope.posts = response.data.slice(0, 5); // just show 5
          })
          .catch(function(error) {
            console.error('Error fetching posts:', error);
          });
      };
    });
  </script>
</body>
</html>
```

✅ Click “Load Posts” — Angular fetches data from a real API, updates `$scope`, and the DOM refreshes automatically.
No extra re-renders, no manual updates — `$digest()` handles it behind the scenes.

## Example 2: POST New Data

You can also send data with `$http.post()` — like adding a new Todo.

```javascript
$http.post('https://jsonplaceholder.typicode.com/posts', {
  title: 'New Task',
  body: 'Learn AngularJS HTTP service',
  userId: 1
})
.then(function(response) {
  console.log('Created:', response.data);
});
```

The fake API will always return a “created” object — useful for testing UI updates.

## The `$http` Configuration Object

Every `$http` call can take a config object instead of a shortcut like `.get()` or `.post()`.

```javascript
$http({
  method: 'GET',
  url: '/api/todos',
  headers: { 'Authorization': 'Bearer 123' },
  params: { limit: 10 }
});
```

That’s how you send headers, query params, and more.

## Example 3: Integrate `$http` into a Service

Let’s refactor and do it the Angular way: keep API logic in a service, not a controller.

```html
<body ng-controller="TodoCtrl">

  <h2>🌐 Todo List (API Version)</h2>
  <button ng-click="loadTodos()">Load Todos</button>

  <ul>
    <li ng-repeat="todo in todos" ng-class="{done: todo.completed}">
      <input type="checkbox" ng-model="todo.completed"> <span v-pre>{{ todo.title }}</span>
    </li>
  </ul>

  <script>
    const app = angular.module('todoApiApp', []);

    // Todo Service
    app.service('TodoService', function($http) {
      this.getAll = function() {
        return $http.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
      };

      this.add = function(task) {
        return $http.post('https://jsonplaceholder.typicode.com/todos', {
          title: task,
          completed: false
        });
      };
    });

    // Controller
    app.controller('TodoCtrl', function($scope, TodoService) {
      $scope.todos = [];

      $scope.loadTodos = function() {
        TodoService.getAll()
          .then(function(response) {
             $scope.todos = response.data;
          })
          .catch(function(err) {
            console.error('Error loading todos:', err);
          });
      };
    });
  </script>
</body>
```

✅ One click → AngularJS fetches todos from an API → `$scope.todos` updates → DOM updates. Beautiful, simple, reactive.

## Handling Loading & Errors

Always add loading states for good UX.

```javascript
$scope.loading = false;
$scope.error = null;

$scope.loadTodos = function() {
  $scope.loading = true;
  $scope.error = null;

  TodoService.getAll()
    .then(function(response) {
      $scope.todos = response.data;
    })
    .catch(function() {
      $scope.error = 'Failed to load todos.';
    })
    .finally(function() {
      $scope.loading = false;
    });
};
```

In the HTML:
```html
<p ng-show="loading">Loading...</p>
<p ng-show="error" style="color:red;"><span v-pre>{{ error }}</span></p>
```

✅ AngularJS templates automatically update based on these values — no manual UI state management needed.

## Bonus: Interceptors (Like Axios Middleware)

You can globally catch and modify requests/responses using `$httpProvider.interceptors`.

**Example:**
```javascript
app.config(function($httpProvider) {
  $httpProvider.interceptors.push(function() {
    return {
      request: function(config) {
        console.log('Outgoing request:', config.url);
        return config;
      },
      responseError: function(rejection) {
        alert('HTTP Error!');
        return Promise.reject(rejection);
      }
    };
  });
});
```

Now every `$http` call logs before sending and handles global errors.

## React Developer Comparison

| Concept | React | AngularJS 1.8 |
|---------|-------|---------------|
| HTTP Library | `fetch` / `axios` | `$http` (built-in) |
| Async pattern | Promises or `async`/`await` | Promises (`then`/`catch`) |
| State update | `setState()` or hooks | `$scope` binding triggers digest |
| API handling | Custom | Built-in DI & interceptors |
| Reusability | Custom hooks or utils | AngularJS services |

So in React, you’d call an API in `useEffect()` and update state. In AngularJS, you call `$http` and Angular updates bindings automatically. Different syntax — same outcome.

## Wrap-Up

Here’s what you’ve learned:

- `$http` handles all HTTP operations in AngularJS
- It returns promises with `.then()`, `.catch()`, `.finally()`
- You can send GET, POST, PUT, DELETE requests easily
- Keep all API calls inside services for clean, testable architecture
- Interceptors let you modify or log requests globally

Understanding `$http` is key to mastering real-world AngularJS — everything that talks to a backend goes through it.
