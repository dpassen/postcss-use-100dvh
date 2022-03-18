const postcss = require("postcss");

const plugin = require("./");

async function run(input, output, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, {
    from: undefined,
  });
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

it("supports min-height", () => {
  run(
    ".min-h-screen { min-height: 100vh; }",
    ".min-h-screen { min-height: 100vh; }\n" +
      "@supports (-webkit-touch-callout: none) {\n" +
      " .min-h-screen { min-height: 100dvh; } }"
  );
});

it("supports max-height", () => {
  run(
    ".max-h-screen { max-height: 100vh; }",
    ".max-h-screen { max-height: 100vh; }\n" +
      "@supports (-webkit-touch-callout: none) {\n" +
      " .max-h-screen { max-height: 100dvh; } }"
  );
});

it("ignores non-100vh height", () => {
  run("body { max-height: 100%; }", "body { max-height: 100%; }");
});

it("works inside media queries", () => {
  run(
    "@media (max-width: 600px) { body { height: 100vh; } }",
    "@media (max-width: 600px) { body { height: 100vh; } " +
      "@supports (-webkit-touch-callout: none) { " +
      "body { height: 100dvh; } } }"
  );
});
