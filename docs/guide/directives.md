# Chapter 3 – Directives: The Secret Sauce

If `$scope` is AngularJS’s heart, then directives are its soul. They’re what make AngularJS... well, AngularJS.

A directive is basically a custom HTML behavior. It can be as small as showing or hiding something (`ng-show`), or as big as rendering an entire UI module.

If React has components, AngularJS 1.8 has directives.

## What’s a Directive?

You’ve already used a bunch of them:
```html
<div ng-app="app" ng-controller="MainCtrl">
  <input ng-model="name" />
  <p><code v-pre>{{ name }}</code></p>
</div>
```

Here, `ng-app`, `ng-controller`, and `ng-model` are built-in directives. But you can also create your own. That’s where the fun begins.

## Let’s Build Our First Directive

Let’s say you’re tired of typing your username everywhere in a profile page. You want a custom tag `<user-card>` that shows your info.

Here’s the HTML:

```html
<!DOCTYPE html>
<html ng-app="userApp">
<head>
  <title>User Card Directive</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
  <style>
    .card {
      border: 1px solid #ccc;
      padding: 10px;
      margin: 10px 0;
      width: 250px;
      border-radius: 5px;
      font-family: sans-serif;
    }
    .name { font-weight: bold; }
    .email { color: gray; font-size: 14px; }
  </style>
</head>
<body ng-controller="MainCtrl">
  <h2>Welcome, <code v-pre>{{ user.name }}</code></h2>

  <user-card></user-card>

  <script>
    const app = angular.module('userApp', []);

    app.controller('MainCtrl', function($scope) {
      $scope.user = {
        name: 'Alice',
        email: 'alice@example.com'
      };
    });

    app.directive('userCard', function() {
      return {
        restrict: 'E', // 'E' means element, so <user-card>
        template: `
          <div class="card">
            <div class="name"><span v-pre>{{ user.name }}</span></div>
            <div class="email"><span v-pre>{{ user.email }}</span></div>
          </div>
        `
      };
    });
  </script>
</body>
</html>
```

✔ You now have a reusable `<user-card>` tag.
AngularJS finds it, reads your directive definition, and replaces it with that HTML template. That’s the magic of DOM transformation.

## The Anatomy of a Directive

Let’s break that down. A directive definition object can have many options, but here are the key ones:

| Property | What it does |
|----------|--------------|
| `restrict` | Tells Angular how to use it: `E` (Element), `A` (Attribute), `C` (Class), `M` (Comment) |
| `template` / `templateUrl` | The HTML it injects |
| `scope` | Defines what data it has access to |
| `link()` | Defines how the directive interacts with the DOM |
| `controller` | (Optional) Adds logic to the directive |

## Attribute Directives

Sometimes you don’t want a new tag — just extra behavior. Let’s make a simple directive that highlights text when you hover over it.

```javascript
app.directive('highlightOnHover', function() {
  return {
    restrict: 'A', // A for Attribute
    link: function(scope, element) {
      element.on('mouseenter', () => element.css('background-color', 'yellow'));
      element.on('mouseleave', () => element.css('background-color', ''));
    }
  };
});
```

And in your HTML:
```html
<p highlight-on-hover>Hover over me!</p>
```
✅ Try hovering. It lights up. That’s AngularJS manipulating the DOM the Angular way.

## The `link()` Function Explained

`link()` runs after the directive’s element has been created and added to the DOM. It’s where you do DOM work, event listeners, or `$watch` setup.

It gives you three arguments:
```javascript
link: function(scope, element, attrs) { ... }
```
- `scope` — the directive’s data context
- `element` — the actual DOM element (wrapped in jqLite, Angular’s mini-jQuery)
- `attrs` — the element’s attributes

You can think of it like React’s `useEffect(() => {}, [])`, but older and more direct.

## Isolated Scope (Directive Inputs)

By default, directives share the parent `$scope`. That’s fine for small things, but for reusable components, it’s a disaster. So we can give directives their own isolated scope.

**Example:**
```html
<user-card name="user.name" email="user.email"></user-card>
```

```javascript
app.directive('userCard', function() {
  return {
    restrict: 'E',
    scope: {
      name: '=',
      email: '='
    },
    template: `
      <div class="card">
        <div class="name"><span v-pre>{{ name }}</span></div>
        <div class="email"><span v-pre>{{ email }}</span></div>
      </div>
    `
  };
});
```

Now the directive has its own little scope bubble. The `=` means two-way binding (still connected to parent values).
You can also use:
- `@` for one-way string binding
- `&` for passing a function

**Example with a function (`&`):**
```html
<user-card name="user.name" on-remove="removeUser()"></user-card>
```
```javascript
  scope: {
    name: '=',
    onRemove: '&'
  }
```
Now the directive can call `scope.onRemove()` inside. That’s the AngularJS version of React’s `props.onClick()`.

## A Bigger Example: A “Like” Button Component

Here’s a complete directive with its own scope, template, and event handling.

```html
<body ng-controller="MainCtrl">
  <like-button count="likes" on-like="increaseLikes()"></like-button>
  <p>Total likes: <span v-pre>{{ likes }}</span></p>

  <script>
    const app = angular.module('likeApp', []);

    app.controller('MainCtrl', function($scope) {
      $scope.likes = 0;
      $scope.increaseLikes = function() {
        $scope.likes++;
      };
    });

    app.directive('likeButton', function() {
      return {
        restrict: 'E',
        scope: {
          count: '=',
          onLike: '&'
        },
        template: `
          <button ng-click="onLike()">👍 Like (<span v-pre>{{ count }}</span>)</button>
        `
      };
    });
  </script>
</body>
```

✅ This is a real component. It has inputs (`count`), outputs (`onLike`), and local behavior.
React devs — notice how this is basically:
`<LikeButton count={likes} onLike={increaseLikes} />`
AngularJS did it first 😎

## A Word of Warning

Directives are powerful but easy to abuse. They can:
- Mutate DOM directly
- Overlap in behavior
- Create hard-to-debug scope hierarchies

So most experienced devs keep directives small and focused — one job, one template, no wild DOM hacks.

## Wrap-Up

Here’s what you learned:
- Directives are like components, defining custom HTML behavior
- `restrict` decides how you use them
- `link()` is where DOM magic happens
- `scope` defines how data flows in
- You can pass data (`=`), text (`@`), or functions (`&`)

And here’s the takeaway:
Directives made AngularJS powerful, but also complicated. They’re the ancestor of everything we now call “components.”
