# Performance & Optimization

When an AngularJS legacy application grows to enterprise scale, performance becomes the single most pressing engineering concern. You will often hear complaints that the UI freezes, buttons respond slowly, or keystrokes lag. 

Almost all performance issues fundamentally trace back to a misunderstanding of how the **digest cycle** operates.

## The Digest Deep Dive

Unlike modern Virtual DOM diffing (React), AngularJS implements a system called **Dirty Checking**. 

It does not actively listen to when you push data; instead, it maintains an array of expressions to evaluate known as **Watchers**. Whenever a user types, clicks, or a promise resolves inside AngularJS contexts, the framework kicks off a `$digest()` cycle.

### How it operates

1. AngularJS iterates through its list of active watchers.
2. It compares the current value to the last remembered value.
3. If a value changes (it is "dirty"), AngularJS triggers the callback logic (updating DOM or triggering function cascades).
4. Because updating one variable might alter another variable, **the entire loop runs again** until it completes an iteration where absolutely zero variables changed (the loop is "stable").

### The Cost of Watchers

Every single time you bind a value in HTML with <code v-pre>{{ ... }}</code> or `ng-model=""`, AngularJS registers a new watcher. 

If you have an `ng-repeat` iterating over 500 table rows, and each row has 5 bound columns:
`500 x 5 = 2,500 watchers`.

Every single `$digest()` cycle caused by any random click anywhere on the page requires the framework to evaluate those 2,500 variables instantly. When watcher count surpasses roughly 2,000 to 3,000 watchers per page, UI lag becomes perceptible to the user.

## Optimization Strategy 1: One-Time Binding (`::`)

Introduced in AngularJS 1.3, this syntax is your most potent weapon to optimize bloated directives or deep nested tables.

By prefixing an interpolation sequence with `::`, you tell AngularJS to evaluate the variable only until it holds a defined value. Once defined, the framework permanently destroys the watcher, significantly unburdening the digest loop.

**Before (Creates a permanent watcher):**
```html
<p>{{ user.firstName }}</p>
```

**After (Computes once, destroys watcher):**
```html
<p>{{ ::user.firstName }}</p>
```

Use `::` aggressively across unchanging static text, labels, and one-off configuration values.

## Optimization Strategy 2: `track by` in `ng-repeat`

When rendering arrays dynamically via `ng-repeat`, AngularJS inherently compares items by their profound object identity to see if it needs to destroy and recreate the DOM rows. Wait, there's a problem: if you retrieve the identical list from the server again, the objects are technically new references.

AngularJS will blindly erase all DOM nodes and re-render the entire table, causing atrocious lag.

**Before:**
```html
<tr ng-repeat="item in items">...</tr>
```

**After:**
```html
<tr ng-repeat="item in items track by item.id">...</tr>
```

`track by id` maps the object iteration logically, ignoring reference drops. AngularJS instantly reuses the DOM nodes if the underlying `id` properties still match. 

## Optimization Strategy 3: Throttling `$digest` via Debounce

Inputs bound to `ng-model` instantly trigger digest loops on every keystroke. Applying debounce rules prevents exhausting the digest CPU loop.

```html
<input 
  type="text" 
  ng-model="searchQuery" 
  ng-model-options="{ debounce: 300 }" />
```

This ensures the massive digest check only fires exactly 300ms after the user finishes typing their search query, rather than continuously grinding CPU resources.

## Optimization Strategy 4: `$watchCollection` vs deep `$watch`

If you really must manually implement `$watch` inside a controller...

**Avoid deep watching big objects:**
```javascript
// BAD: Deep comparison recursive check - terribly slow
$scope.$watch('massivesObjectArray', function(newV, oldV) {}, true);
```

**Prefer $watchCollection:**
```javascript
// GOOD: Only checks the top level references/length.
$scope.$watchCollection('massivesObjectArray', function(newV, oldV) {});
```

By keeping these specific mechanical bottlenecks isolated intelligently, a ten-year-old AngularJS app can be configured to run smoothly entirely matching the UX speed of modern iterations.
