## Dev Portfolio

### Issues:
* Positioning of Next.js's image component is a nightmare. So I built my own version that behaves similarly. Which is to load a blurHash into the background and src. When the component's IntersectionObserver isIntersecting we switch out the src to srcSet with 1x and 2x images. Once loaded we remove the blurHash from the background.
* Intersection observer behavior between Chrome and the rest.
  * Solution: Change the observer frame from root:null to the `ul` of the `li`s.
  * For swiping behavior, set the root margin to a negative number, so we pull the bounds in from the edge. This prevents false triggering of isIntersecting.