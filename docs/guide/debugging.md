# Debugging Common Issues

Working with a legacy AngularJS system guarantees that eventually, you will encounter its infamous idiosyncrasies. When an AngularJS application behaves bizarrely, it is rarely random. It is almost always a strict violation of data flow protocols. 

Here are the most common headaches engineers face and precisely how to solve them.

## 1. Scope Shadowing (The Dot Rule)

**The Symptom:** 
You have a parent scope and a child scope. You try to update a primitive variable (like a string or boolean) from the child, but the parent UI never detects the update.

**The Cause:**
Scopes inherit prototypically. When you try to assign to `$scope.isOpen = true` inside a child directive, JavaScript engines realize `isOpen` doesn't exist locally. Instead of traveling up the prototype chain to mutate the parent, the engine *creates a new local property on the child scope that shadows the parent.* The parent reference is functionally broken.

**The Fix (Always Use a Dot):**
Never bind directly to primitives on the `$scope`. Bind to objects.

```javascript
// BAD
$scope.username = 'Alice'; // Can be broken by child mutations

// GOOD
$scope.userData = {
  username: 'Alice' 
}; // Child mutating $scope.userData.username safely climbs prototype chain.
```

## 2. `$digest Already In Progress`

**The Symptom:**
The console lights up in terrifying red ink reading: `Error: $rootScope:inprog $digest already in progress`. The UI might have crashed completely or frozen mid-render.

**The Cause:**
You or a library explicitly called `$scope.$apply()` or `$scope.$digest()` while AngularJS was already deeply traversing a digest loop. The framework explicitly crashes here to stop infinite CPU recursion loops.

**The Fix:**
You only need to invoke `$apply()` when data originates *outside* of Angular's ecosystem (such as a jQuery event callback or an un-intercepted WebSocket message). Before executing, use `$timeout` safely (which inherently manages digestion perfectly), or verify if `$scope.$$phase` is presently active.

```javascript
// BEST FIX: Wrap the non-angular code in $timeout safely
$timeout(function() {
  $scope.myExternalData = dataFromServer;
});

// ALTERNATIVE FIX: The phase check
if(!$scope.$$phase) {
  $scope.$apply();
}
```

## 3. The 10 `$digest()` Iterations Infinity Error

**The Symptom:**
`Error: 10 $digest() iterations reached. Aborting!`

**The Cause:**
Remember that dirt-checking loops recursively ask if elements are stable. If you write a `ng-class` function or a getter that explicitly returns a completely fresh object structure or a new mapped array *every single render cycle*, the digest loop assumes it is continuously dirty. It gives up after 10 full recursion attempts to prevent blowing the browser tab.

**The Fix:**
Ensure getter functions and filters return stable references or cache their output. 
Avoid generating unique array instances dynamically within interpolation tags or functions hit by ng-repeat. 

```javascript
// BAD (Causes infinite loops)
$scope.getDynamicItems = function() {
  // Creating a distinct array on every call
  return [1, 2, Math.random()]; 
}

// GOOD
let cachedItems = [1, 2, 3];
$scope.getDynamicItems = function() {
  return cachedItems; 
}
```

## 4. Memory Leaks in the DOM & Watchers

**The Symptom:**
Your SPA runs flawlessly when loaded but significantly deteriorates functionally after clicking through 15 pages in roughly twenty minutes.

**The Cause:**
When angular destroys `$scope` due to routing away (or wiping out directives), it cleans its own attached watcher handlers. However, if you manually attached a `$rootScope.$on` event, a raw `setInterval()`, or jQuery `.on()` events inside the `link()` function without a destructor callback, that memory is heavily leaked.

**The Fix:**
Always explicitly clean up within the `$destroy` scope listener!

```javascript
app.directive('customChart', function() {
  return {
    link: function(scope, element) {
      
      const interval = setInterval(render, 1000);
      const deregister = scope.$on('someEvent', handler);

      scope.$on('$destroy', function() {
        // CLEAN UP TIME!
        clearInterval(interval);
        deregister(); 
        element.off(); // Remove jQuery attachments natively
      });
    }
  };
});
```

By recognizing these strict patterns, debugging AngularJS loses its magical pain and pivots deeply into predictable DOM resolution.
