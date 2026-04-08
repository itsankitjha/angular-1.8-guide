# Services and Factories

So far, controllers hold data and handle UI interactions. But as your application scales across multiple views and controllers, duplication becomes a massive issue:

* What if two controllers need the same manipulated data?
* What if both need to fetch from the same REST API?
* What if multiple places share logic for formatting dates?

Copying and pasting inside controllers creates testing nightmares. AngularJS inherently solves this architectural issue via **services**.

## What’s a Service?

A service is a reusable, self-contained javascript object that executes one specific task perfectly. You create it once, and AngularJS injects the same instance (it is a **singleton**) into any controller or directive that requests it. 

If this were React, a service acts closely to a deeply shared Context API provider, a Redux store, or a custom Utility Hook (`useTodos()`). 

Let's rebuild business logic out of a controller and into a testable Factory.

## The Three Flavors: Service, Factory, Provider

AngularJS awkwardly provides three distinct ways to create injectable logic entities. In 99% of legacy applications, you will see `service` and `factory`.

| Type | How it Works | Example |
|------|--------------|---------|
| `service` | Instantiated with `new`. Behaves like a Class. You bind methods to `this`. | `app.service('AuthSvc', function() { this.login = ... })` |
| `factory` | A function that manually returns an object structure. Often feels more functional. | `app.factory('AuthFactory', function() { return { login } })` |
| `provider` | The lowest level. It exposes a configuration phase allowing you to tweak it *before* the app boots. | `app.provider('AuthProvider', function() { ... })` |

### Refactoring to a Factory

A `factory` gives you exact control over what you expose from your closure.

```javascript
app.factory('TodoFactory', function() {
  // Private closure data - hidden from controllers
  const todos = [
    { text: 'Understand Factories', done: false }
  ];

  // The exposed public API
  return {
    getAll() { return todos; },
    add(task) { todos.push({ text: task, done: false }); },
    remove(index) { todos.splice(index, 1); }
  };
});
```

The difference between `service` and `factory` is mostly stylistic. A `service` acts natively like a constructor function, while a `factory` simply returns an initialized object. Factories are heavily preferred for modular, testable, and functional architectural styles.

### Using the Service in a Controller

Now that the business logic is decoupled from the DOM controller, we inject the factory. 

```javascript
app.controller('TodoCtrl', function($scope, TodoFactory) {
  // Controller ONLY handles gluing data to the view
  $scope.todos = TodoFactory.getAll();

  $scope.addTodo = function() {
    if ($scope.newTask) {
      TodoFactory.add($scope.newTask);
      $scope.newTask = '';
    }
  };

  $scope.remove = function(index) {
    TodoFactory.remove(index);
  };
});
```

This dramatically reduces controller bloat. If you need a `DashboardCtrl` that summarizes tasks, you can inject the exact same `TodoFactory` and it will read from the same instance array. 

## Best Practices for Services

1. **Keep Controllers Dumb**: A controller should never modify raw data structures directly or run heavy algorithms. It should call a service method and let the service do the work.
2. **Abstract $http calls**: Never inject `$http` directly into a controller. All API requests should be encapsulated and returned from a service layer.
3. **Singleton Warnings**: Remember that since Services are singletons, any data saved inside `TodoFactory` persists indefinitely until the browser reloads. You must manage memory and state cleanup yourself if handling transient data. 
