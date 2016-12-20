# mithril-jest

Lets [Mithril](https://github.com/lhorie/mithril.js) work with [Jest](https://github.com/facebook/jest).


## Rationale

Jest creates textual snapshots of components to make it easy to spot changes. Differences in rendered HTML are printed to the console as diffs, making it easy to accept or reject the new snapshot; see [Jest's snapshot release blog post](http://facebook.github.io/jest/blog/2016/07/27/jest-14.html).

<img src="http://arthurclemens.github.io/assets/mithril-tidy/jest-run.png" width="691" height="548" />

`mithril-jest` installs Jest (which installs Jasmine), so you can use the regular functions `describe`, `expect`, `toMatchSnapshot` and so on. To get snapshot-ready HTML from Mithril templates, use function `tidy` (see below).



## Installation

```
npm install --save-dev mithril-jest
```

You may need to install command line library `tidy-html5` too (on a Mac: `brew install tidy-html5`).



## Tests setup

A typical Jest setup is to have a `spec` file for each page or component - for component `component.js` you'll have test file `component.spec.js`. Jest's convention is to put these test files inside directory `__tests__/`, but there is no specific need to do this; any directory (for example the conventional `test`) will work.

If your tests live in directory `test`, add to `package.json` to the "scripts" entry:

```
"test": "jest test/*"
```

Then run `npm test`. For interactive mode, run:

```
npm test -- --watch
```



## API

### tidy

Renders a Mithril template to (tidy) HTML so it can be used to call Jest's `toMatchSnapshot`. This function:
  1. Renders a template to HTML
  2. Formats the HTML so it becomes multi line and indented


#### Example

```javascript
import m from "mithril";
import { tidy } from "mithril-jest";

const page = {
  view: () =>
    m("div", [
      m("h1", "Page"),
      m("a", {
        href: "/home"
      }, "Back")
    ])
};

describe("Page component", () => {
  it("should have a title", () => {
    const cmp = m(page);
    const html = tidy(cmp);
    expect(html).toMatchSnapshot();
  });
});
```
This generates a new (or diffs an existing) snapshot.


The rendered HTML can also be used to inspect:

```javascript
describe("Page component", () => {
  it("title should be h1 with label 'Page'", () => {
    const cmp = m(page);
    const html = tidy(cmp);
    expect(html).toContain("Page");
  });
});
```


#### Signature

`tidy(vnodes, htmlTidyOptions) => String`

Argument                  | Type                      | Required | Description
------------------------- | ------------------------- | -------- | ---
`vnodes`                  | Mithril element           | Yes      | The vnodes to be rendered.
`htmlTidyOptions`         | Object                    | No       | Overrides the default HTML Tidy [configuration options](http://api.html-tidy.org/tidy/tidylib_api_5.2.0/tidy_config.html#config_options).
**Returns**               | String                    |          | Rendered and tidied HTML String.



### Dependencies

* [Mithril](https://github.com/lhorie/mithril.js)
* [Jest](https://github.com/facebook/jest)
* [tidy-html5](https://github.com/htacg/tidy-html5)


### Licence

MIT


