# Chapter 6 – Filters and Expressions: Making Data Look Good

Here’s the thing — your data and how it looks on screen aren’t always the same thing. Maybe you want uppercase text. Or filter a list of completed tasks. Or show a date in a nice format.

In React, you’d do that inside your JSX:
```jsx
{todos.filter(t => !t.done).map(t => <li>{t.text}</li>)}
```

In AngularJS, you can do that right inside the template — with filters.

## What’s a Filter?

A filter takes a value, does something to it, and returns a new value. You use them with the pipe symbol (`|`) inside AngularJS expressions.

**Example:**
```html
<p><span v-pre>{{ name | uppercase }}</span></p>
```

If `$scope.name = 'alice'`, AngularJS will render:
`ALICE`

Filters don’t change your actual data — they only format it for display.

## Built-in Filters

AngularJS ships with some useful filters out of the box.

| Filter | What it does | Example |
|--------|--------------|---------|
| `uppercase` | Converts text to all caps | `<code v-pre>{{ name \| uppercase }}</code>` |
| `lowercase` | Converts text to lowercase | `<code v-pre>{{ name \| lowercase }}</code>` |
| `currency` | Formats number as money | `<code v-pre>{{ price \| currency }}</code>` |
| `date` | Formats a timestamp | `<code v-pre>{{ today \| date }}</code>` |
| `number` | Adds commas and decimal places | `<code v-pre>{{ 1234567 \| number }}</code>` |
| `filter` | Filters arrays by condition | `<code v-pre>{{ todos \| filter }}</code>` |
| `orderBy` | Sorts an array | `<code v-pre>{{ todos \| orderBy }}</code>` |

Let’s play with some of these 👇

## Example 1: Display Filters in Action

```html
<!DOCTYPE html>
<html ng-app="filterApp">
<head>
  <title>AngularJS Filters Example</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
</head>
<body ng-controller="MainCtrl">

  <h3>Built-in Filters Demo</h3>

  <p>Original: <span v-pre>{{ name }}</span></p>
  <p>Uppercase: <span v-pre>{{ name | uppercase }}</span></p>
  <p>Lowercase: <span v-pre>{{ name | lowercase }}</span></p>
  <p>Today’s Date: <span v-pre>{{ today | date:'fullDate' }}</span></p>
  <p>Price: <span v-pre>{{ price | currency:'USD$' }}</span></p>

  <script>
    const app = angular.module('filterApp', []);

    app.controller('MainCtrl', function($scope) {
      $scope.name = 'Alice Johnson';
      $scope.today = new Date();
      $scope.price = 1999.99;
    });
  </script>
</body>
</html>
```

✅ Try changing the locale of the currency filter to see different results.

## Example 2: Filtering Arrays

Now let’s bring back our Todo list and show only completed or active items using filters.

```html
<body ng-controller="TodoCtrl">

  <h2>Todos</h2>
  <input type="text" ng-model="searchText" placeholder="Search todos..." />

  <h4>All Todos</h4>
  <ul>
    <li ng-repeat="todo in todos | filter:searchText | orderBy:'text'" ng-class="{done: todo.done}">
      <input type="checkbox" ng-model="todo.done"> <span v-pre>{{ todo.text }}</span>
    </li>
  </ul>

  <h4>Active Todos</h4>
  <ul>
    <li ng-repeat="todo in todos | filter:{done:false}">
      <span v-pre>{{ todo.text }}</span>
    </li>
  </ul>

  <script>
    const app = angular.module('todoFilterApp', []);

    app.controller('TodoCtrl', function($scope) {
      $scope.todos = [
        { text: 'Learn AngularJS filters', done: false },
        { text: 'Use ng-repeat with filter', done: true },
        { text: 'Write custom filters', done: false }
      ];
    });
  </script>
</body>
```

✅ Type something into the search box — the list filters in real time.
✅ See how `filter:{done:false}` shows only active todos? That’s AngularJS’s mini query language.

## Example 3: Writing a Custom Filter

Sometimes you want your own logic — like showing only todos longer than 10 characters.
Let’s make a custom filter called `longText`.

```javascript
app.filter('longText', function() {
  return function(items) {
    return items.filter(item => item.text.length > 10);
  };
});
```

And use it like this:
```html
<li ng-repeat="todo in todos | longText">
  <span v-pre>{{ todo.text }}</span>
</li>
```

✅ Filters are reusable — any controller or view can use `longText`.

## Example 4: Combining Multiple Filters

You can chain filters just like Unix pipes:
<code v-pre>{{ name | uppercase | limitTo:5 }}</code>

If `name = "AngularJS"`, it becomes: `ANGUL`

Angular applies them left to right — each one’s output is the next one’s input.

## Behind the Scenes: How Filters Work

Under the hood, AngularJS has a filter registry — basically a dictionary of available filters. When it sees <code v-pre>{{ value | something }}</code>, it looks up `"something"` in the registry and runs that function.

Filters are pure functions — they don’t mutate your data, they just return formatted copies. That’s why you can chain them freely without worrying about side effects.

## React vs AngularJS Mental Map

| Concept | React | AngularJS 1.8 |
|---------|-------|---------------|
| Filter a list | `.filter()` in JS | `filter` |
| Sort a list | `.sort()` | `orderBy` |
| Format text | JS string functions | built-in text filters |
| Format numbers | `Intl.NumberFormat()` | `currency` or `number` |
| Format date | `toLocaleDateString()`| `date` |
| Custom logic | Helper functions or hooks | Custom filters |

So in React you usually do data shaping in JavaScript. In AngularJS, you do it in the template. Both are fine — just different philosophies.

## Wrap-Up

Here’s what you’ve learned:
- Filters format or transform data in templates
- AngularJS includes built-in filters for text, numbers, and arrays
- You can chain filters and even write your own
- They’re pure and reusable — no side effects

Filters make templates expressive and readable — like saying what you want, not how to do it.
