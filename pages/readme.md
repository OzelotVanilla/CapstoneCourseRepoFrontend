Page Design
====

Page Router
----

The relationship between the URL and the page which is showing, could be called **router**.

The router for this project is not auto-generated according to the directory structure,
instead, please add in the `AppRouter` function in `app.tsx` in this directory.

For more information about router, please visit
[document of ionic](https://ionicframework.com/docs/react/navigation).

Z-Index
----

For each page (except the supporter's page), there are hovering buttons for user to interact.
The buttons is generated outside and wrap the *real* page content by `getPageForVisImpairedPeople`.

By default, the buttons have a Z-Index of **2**.
Please pay attention that your content does not cover the buttons.

Hovering Buttons
----

The functionality of the hovering buttons is controlled by `dispatchHoveringButtonsChange`.
This is a [function provided by react](https://react.dev/learn/extracting-state-logic-into-a-reducer)
and it should only be called inside a component function.

Please note that setting states in the onclick may not get the expected result.
[Using `useRef`](https://react.dev/reference/react/useRef) helps to solve this kind of issue.

Internationalisation
----

The function `getI18NText` can return the translated text and locale according to the system language.
It also supports specified language as its argument.