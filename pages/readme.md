Page Design
====

File Structure
----

There is three files at `pages/`, and multiple folders.

### `app.tsx`

Entry of the Ionic framework.
The functional component `App` contains the wrapper of ionic, with the defined router.
See the **Page Router** section below to get more information.

### `global.scss`

[SCSS](https://sass-lang.com/guide/) styling file that contains global settings affecting all pages.
**Should be included** by all other styling file.

### `app.scss`

The styling sheet that should **only** affect `app.tsx`.

### Folder Structure

The page folder contains one page that occupy one name at the router.
For example, the page rendered when accessing `/navigation` should be stored in `pages/navigation`,
applying also to nested structure if so.

There **must be two** files inside each page folder,
the **page** file and corresponding **styling** file.
The page file's name should end in `.page.tsx`,
while the styling file should be named after the page.


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
Also, `dispatchHoveringButtonsChange` should be called inside `useIonViewWillEnter`
to [avoid infinite rendering loop](https://react.dev/learn/render-and-commit).

Please note that setting states in the onclick may not get the expected result.
[Using `useRef`](https://react.dev/reference/react/useRef) helps to solve this kind of issue.

Internationalisation
----

The function `getI18NText` can return the translated text and locale according to the system language.
It also supports specified language as its argument.

All the page text should be added to the `i18n/` folder at root directory.
The shape of the English translation is referred to check the shape of others language,
in order to avoid missing in translation.