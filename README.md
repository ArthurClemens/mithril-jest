# mithril-tidy

Render [Mithril](https://github.com/lhorie/mithril.js) templates to tidy HTML. Useful for testing pages and components with [Jest](https://github.com/facebook/jest).


## Rationale

Jest creates textual snapshots of components to make it easy to spot changes. Differences in rendered HTML are printed to the console as diffs, making it easy to accept or reject the new snapshot; see [Jest's snapshot release blog post](http://facebook.github.io/jest/blog/2016/07/27/jest-14.html).


<img src="http://arthurclemens.github.io/assets/mithril-tidy/jest-run.png" width="691" height="548" />


React's toolchain is fully set up for Jest, but for Mithril two extra steps are needed to create snapshot-ready HTML:
  1. Render the template to HTML
  2. Tidy the HTML (multiline, indented)

This utility helps to fill those 2 steps.


## Installation

```
npm install --save-dev mithril-tidy
```

You may need to install command line library `tidy-html5` too (on a Mac: `brew install tidy-html5`).



## Setup

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

Renders a Mithril template to (tidy) HTML so it can be used to call Jest's `toMatchSnapshot`.


#### Example

```javascript
import m from "mithril";
import { tidy } from "mithril-tidy";

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


