# ngx-cocktail-view-animations

A try-out/POC how we could activate view animation with Angular

You can find it live here: https://laurenzdemey.github.io/ngx-cocktail-view-animations/

This is an NX monorepo with

- a standalone angular app (using tailwindCSS)
- api wrapper library for external cocktail api
- transition components/directives to activate the view transition
  - `<vwt-router-outlet />`: this is our own router outlet that can be used instead of the default `<router-outlet />`. It activates some behavior so it's required!
  - `vwtTransitionName="some-name"`: this will add a transition name to that element in css. Be carefull as this needs to be unique for the whole page. If it can't be unique (because of a list, where it's being looped), then also append the following directive
  - `vwtRepeatedTransitionContainer="["someRoute"]"`: this (parent) directive can be added for each repeated item, so that the transition names are only applied when the route (someRoute in the case) is being activated.
- utils library for other reusable stuff
  - `| cleanUrl`: this pipe transforms the slashes of an url to an understable format (`\/` vs `/`)
  - `DeferredPromise<T>`: a wrapper for a deferred promise. This was really important to use it inside our custom router-outlet
  - `cwLet`: a simple replacement for \*ngIf while always showing the template.
