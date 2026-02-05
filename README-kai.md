***CSE320 / Lab 3 / Kai Welch / Jan 26 2025***

# Reflection Section
> 2.2 Notice how we're using `getByRole` with accessible names like `name: /delete "task to delete"/i`. How does this approach differ from using `getByTestId('delete-button')`? Which approach better reflects how users interact with the UI? (Hint: Consider Kent C. Dodds' guiding principle from your readings.)
> How does using `getByRole` and `getByLabelText` improve test reliability compared to `getByTestId`?

`getByRole` and `getByLabelText` are more similar than `getByTestId` to how user would interact with the application because `getByRole` and `getByLabelText` look for the strings indicated as arguments.

> 3.2 We used `queryByRole('alert')` instead of `getByRole('alert')` when checking that an error message does NOT exist. Why? What would happen if we used `getByRole` for an element that doesn't exist?
> Describe a situation where you would use `queryBy` instead of `getBy`.

`queryBy` is preferred over `getBy` when you need to see if it returns `null`. For example, I would use `queryBy` when I want to see if the element I'm testing exist on the UI or not. If we used `getByRole` for an element that doesn't exist, it will throw an error since it can only return elements.

> 4.3 Compare how we used `screen.findByText` (returns a Promise, waits for element) versus `screen.getByText` (synchronous, throws immediately if not found). When should you use each? How does this connect to the discussion of `findBy` queries in the React Testing Library documentation?

I use findBy when I want the test to wait until the component I'm looking for to appear.

> What are the trade-offs of mocking API calls vs. testing against a real backend?

Mocking API is useful when you want to test how UI works without dealing with backend complication. However, when you mock API calls, the test function only returns what you told it to return. You won't be able to know what the actual return would be with real backend while you test with mocking API.
# Key Concepts
In this lab, I learned different usecases of testing functions. getBy is preffered by default because it's closer to how user would use it, and queryBy is preferred when you expext the return to be null.
This testing library has functions to mimic how usesrs would use. When I imprement these functions, it is important to know what user's bevaviour can be represented by each testing function. 
