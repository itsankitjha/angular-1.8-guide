# Architecture & Rendering

By now you have seen AngularJS piecemeal. But the real challenge is understanding how to fit all the patterns (Routing, Directives, Filters, and APIs) into a modern Single Page Application architecture. 

We will structure a modern-looking Todo application employing modules, strict boundaries, and reusable directives.

## 1. Directives: The Precursor to Components

If `$scope` is the heart of AngularJS, then directives are its skeleton. A directive binds an explicitly defined DOM manipulation to a tag, attribute, or class name. 

If React has JSX components, AngularJS 1.8 has Directives. They represent reusable chunks of logic and UI.

### Creating a Reusable Directive

Here is how you isolate logic to a reusable tag, exactly like writing `<TodoItem />` in modern frameworks.

```javascript
app.directive('todoItem', function() {
  return {
    restrict: 'E', // 'E' means Element. Can also be 'A' (Attribute)
    scope: {
      todo: '=',     // Two-way bound object
      onDelete: '&'  // Function binding
    },
    template: `
      <li ng-class="{done: todo.completed}">
        <input type="checkbox" ng-model="todo.completed" />
        {{ todo.title }}
        <button ng-click="onDelete()">x</button>
      </li>
    `
  };
});
```

Using this directive inside your main view is straightforward:

```html
<todo-item 
  ng-repeat="todo in todos" 
  todo="todo" 
  on-delete="removeTodo($index)">
</todo-item>
```

**Scope Isolation:** Notice the `scope` configuration property inside the directive. Setting this property creates an **Isolated Scope**. The directive does not prototypically inherit from its parent controller; instead, variables are passed explicitly via attributes (acting as `props`), completely preventing unintended data bleeding.

## 2. API Communication with `$http`

AngularJS includes the powerful `$http` service for XHR requests. Rather than polluting a controller with endpoints, always extract API layers into Services.

```javascript
app.service('TodoService', function($http) {
  const API_URL = 'https://jsonplaceholder.typicode.com/todos';

  this.getAll = function() {
    // $http automatically returns a Promise-like native structure
    return $http.get(API_URL).then(res => res.data);
  };
});
```

Because `$http` returns promises wrapped within AngularJS's context, the digest loop is intelligently informed to trigger a render update the moment the HTTP call resolves. Using raw `fetch()` breaks this cycle unless manually paired with `$scope.$apply()`.

## 3. Formatting Data using Filters

Let the views dictate formatting asynchronously using pure functions known as filters.

```javascript
app.filter('longText', function() {
  return function(items) {
    if (!items) return [];
    return items.filter(item => item.text && item.text.length > 10);
  };
});
```

Use them declaratively in the HTML, chaining them like Unix pipes:

```html
<ul>
  <li ng-repeat="todo in todos | longText | orderBy:'text'">
    {{ todo.text | uppercase }}
  </li>
</ul>
```

A core architectural advantage here is that Filters are synchronous pure functions. They compute rapidly during the digest loop without triggering side effects.

## 4. Unifying with Client-Side Routing (`ngRoute`)

Connecting disjointed pieces to build an SPA requires the `ngRoute` (or the popular third-party `ui-router`) companion module.

```javascript
const app = angular.module('miniTodoApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl'
    })
    .when('/settings', {
      templateUrl: 'views/settings.html',
      controller: 'SettingsCtrl'
    })
    .otherwise({ redirectTo: '/home' });
});
```

In your main `index.html`, replacing a hard-coded layout with dynamic views takes one element:

```html
<div ng-view></div>
```

AngularJS intercepts the `#` fragment matching URLs (e.g., `#!/home`), drops the old controller, creates a fresh `$scope`, requests the associated template, and hot-swaps it into `ng-view`.

## Summary of the Architecture Mental Model

- **Global Entry**: `ng-app` dictates root execution. `ng-view` anchors dynamic routes.
- **State Boundaries**: Keep monolithic `$scope`s small by delegating to Components / Directives holding isolated Scopes.
- **Logic Boundaries**: Extract business operations into testable `factory` or `service` layers.
- **Mutation Boundaries**: HTTP calls go via `$http`. Transforming data structures rendering happens declaratively using Filters.
