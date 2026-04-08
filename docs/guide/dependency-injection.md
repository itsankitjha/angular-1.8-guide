# Dependency Injection (DI)

Dependency Injection (DI) is one of the most polarizing but brilliant ideas AngularJS pioneered on the frontend. When you need a utility like a `$timeout` module, a router (`$location`), or a custom `TodoService`, you simply write its name as an argument in your function, and AngularJS actively searches its registry to hand it to you.

## How Dependency Injection Works internally

When you declare a controller:

```javascript
app.controller('MainCtrl', function($scope, TodoService) { ... });
```

Angular internally reads the function arguments (literally parsing `.toString()` on the function syntax) to detect `$scope` and `TodoService`. It then retrieves those instances from its global injector context and passes them in.

This removes the need for relative imports or instantiating objects manually, allowing immense flexibility, especially during testing. However, this magical parsing behavior leads to a critical vulnerability in production environments.

## The Minification Problem

When you run your JavaScript through a minifier (like UglifyJS, Terser, or Webpack), it squashes variable names to save space. 

Your code:
```javascript
app.controller('MainCtrl', function($scope, TodoService) { 
  $scope.logic = TodoService.getData();
});
```

Becomes minified to:
```javascript
app.controller('MainCtrl', function(a, b) { 
  a.logic = b.getData();
});
```

Now, AngularJS crashes. It searches its registry for `a` and `b` but cannot find them. It has lost the semantic names `$scope` and `TodoService`.

## Strict DI: The Safe Syntax

To survive minification for production deployment, you must explicitly declare your array dependencies. AngularJS supports an Array notation specifically to work around this problem.

### The Array Dependency Protocol 

Provide an array where the string names of the dependencies come first, and the actual function is the exact last element. Strings do not get minified.

```javascript
app.controller('MainCtrl', ['$scope', 'TodoService', function($scope, TodoService) {
  $scope.logic = TodoService.getData();
}]);
```

When minified, the strings remain completely intact, and Angular binds them to the squashed variables safely:
```javascript
app.controller('MainCtrl', ['$scope', 'TodoService', function(a, b) {
  a.logic = b.getData();
}]);
```

### The `$inject` Property Notation

If array wrapping is unreadable to you, you can define an `$inject` property dynamically onto the function object.

```javascript
function MainCtrl($scope, TodoService) {
  $scope.logic = TodoService.getData();
}
MainCtrl.$inject = ['$scope', 'TodoService'];

app.controller('MainCtrl', MainCtrl);
```

### Automation via `ng-annotate`

Manually typing arrays for every controller, service, factory, and directive becomes extremely tedious. 

In enterprise environments, the build system (Webpack, Gulp) runs a tool historically named `ng-annotate` (or `babel-plugin-angularjs-annotate`). You write the standard readable function, and during the build phase, the plugin automatically inspects and generates the strict Array syntax right before minification occurs. 

**Pro-tip:** Modern legacy systems utilize `"ngInject";` prologue directives to forcibly trigger annotation during compilation:

```javascript
app.controller('MainCtrl', function($scope, TodoService) {
  "ngInject"; 
  // Bably/Webpack automatically transforms this safely for production
});
```

Embracing DI cleanly prevents rigid coupling and creates a codebase that is effortlessly unit-testable using tools like Karma and Jasmine out of the box.
