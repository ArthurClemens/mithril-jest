/* global describe, it, expect */
import m from "mithril";
import { tidy } from "../index";

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
  it("title should be h1 with label 'Page'", () => {
    const cmp = m(page);
    const html = tidy(cmp);
    expect(html).toContain("Page");
  });
});

