# Chapter 5 – Routing: Turning Pages Without Reloads

You know how in React we use `react-router` to handle multiple pages?
AngularJS had that idea long before React even existed. It’s called `ngRoute`.

Routing in AngularJS lets you:
- Define different views (HTML templates)
- Attach controllers to each view
- Switch between them without reloading the whole page

Think of it as a mini navigation system for single-page apps.

## Step 1 – Setup

AngularJS core doesn’t include routing by default, so we need the extra module. Add this line after AngularJS:

```html
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular-route.min.js"></script>
```

Then, inject the module into your app:

```javascript
const app = angular.module('todoApp', ['ngRoute']);
```

Now Angular knows how to handle routing.

## Step 2 – Define Routes

We’ll tell Angular: "When the URL looks like `/home`, show the home view. When it’s `/about`, show the about view."

Add this inside your main script:

```javascript
app.config(function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'home.html',
      controller: 'HomeCtrl'
    })
    .when('/about', {
      templateUrl: 'about.html',
      controller: 'AboutCtrl'
    })
    .otherwise({
      redirectTo: '/home'
    });
});
```

Let’s break that down:
- `.when(path, config)` → sets up a route
- `templateUrl` → which HTML file to show
- `controller` → which JS controller to use
- `.otherwise()` → fallback if path doesn’t match

## Step 3 – The Main Shell (`index.html`)

Here’s a working full example.

```html
<!DOCTYPE html>
<html ng-app="todoApp">
<head>
  <title>AngularJS Routing Example</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular-route.min.js"></script>
  <style>
    body { font-family: sans-serif; margin: 20px; }
    nav a { margin-right: 15px; text-decoration: none; color: blue; }
    nav a.active { font-weight: bold; color: darkblue; }
  </style>
</head>
<body>

  <nav>
    <a href="#!/home" ng-class="{active: isActive('/home')}">Home</a>
    <a href="#!/about" ng-class="{active: isActive('/about')}">About</a>
  </nav>

  <div ng-view></div>

  <script>
    const app = angular.module('todoApp', ['ngRoute']);

    // ROUTES
    app.config(function($routeProvider) {
      $routeProvider
        .when('/home', {
          templateUrl: 'home.html',
          controller: 'HomeCtrl'
        })
        .when('/about', {
          templateUrl: 'about.html',
          controller: 'AboutCtrl'
        })
        .otherwise({
          redirectTo: '/home'
        });
    });

    // CONTROLLERS
    app.controller('HomeCtrl', function($scope) {
      $scope.message = "Welcome to the Todo Home!";
    });

    app.controller('AboutCtrl', function($scope) {
      $scope.info = "This app was built with AngularJS 1.8. A blast from the past!";
    });

    // ACTIVE NAV HELPER
    app.run(function($rootScope, $location) {
      $rootScope.isActive = function(route) {
        return route === $location.path();
      };
    });
  </script>
</body>
</html>
```

Then create two small template files next to it:

**home.html**
```html
<h2>Home</h2>
<p><span v-pre>{{ message }}</span></p>
```

**about.html**
```html
<h2>About</h2>
<p><span v-pre>{{ info }}</span></p>
```

✅ Now open `index.html` in your browser and click the links. You’ll see the view change — but the page never reloads.

## How It Works

AngularJS watches the part of the URL after the `#` (hash). For example:
- `#!/home`
- `#!/about`

That’s called hashbang routing — a clever old trick to make single-page apps work even before modern browsers had the History API.

The `<div ng-view></div>` is the magic placeholder. AngularJS swaps in the HTML from `templateUrl` every time the route changes.

## Optional: Use Inline Templates

You can skip separate HTML files and use inline templates:

```javascript
$routeProvider
  .when('/home', {
    template: '<h2>Home</h2><p><span v-pre>{{ message }}</span></p>',
    controller: 'HomeCtrl'
  })
```

This is handy for small demos or quick prototypes.

## Step 4 – Combine Routing with Services

Let’s make it a bit more real. We’ll bring back our TodoService, but only load it on the home page.

```javascript
app.controller('HomeCtrl', function($scope, TodoService) {
  $scope.todos = TodoService.getAll();

  $scope.addTodo = function() {
    if ($scope.newTask) {
      TodoService.add($scope.newTask);
      $scope.newTask = '';
    }
  };

  $scope.remove = function(index) {
    TodoService.remove(index);
  };
});
```

✅ You now have a real single-page Todo app — fully modular:
- Routing (switching pages)
- Services (data logic)
- Controllers (view logic)

## Step 5 – Bonus: Pretty URLs (Optional)

If you hate `#!/home` in your URLs, AngularJS supports “HTML5 mode” routing too — but it needs server support.

```javascript
app.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
});
```

Then you can use normal paths like `/home` and `/about`. But you’ll need to configure your server to always return `index.html` for unknown routes (just like React Router does).

## React Developer Comparison

| Concept | React | AngularJS 1.8 |
|---------|-------|---------------|
| Router library | `react-router` | `ngRoute` |
| Route declaration | `<Route path="/">` | `$routeProvider.when('/home', ...)` |
| Route view | `<Outlet />` or `<Routes>` | `<div ng-view>` |
| Navigation | `<Link to="/home">` | `<a href="#!/home">` |
| State transfer | Context / Props | `$rootScope`, `$location`, Services |

Different syntax, same mental model. One view at a time, no reloads, dynamic content.

## Wrap-Up

Here’s what you’ve learned:
- `ngRoute` gives you client-side navigation
- `ng-view` is the dynamic view outlet
- `$routeProvider` maps URLs to templates and controllers
- You can mix routes with services and scopes for complete SPAs

AngularJS 1.8 might be old-school, but this routing concept is still the foundation of how modern SPAs work — React Router, Vue Router, Angular Router — all follow this same principle.
