const process = (decl, { AtRule, Rule }) => {
  if (decl.value !== "100vh") {
    return;
  }

  const rule = decl.parent;

  const media = new AtRule({
    name: "supports",
    params: "(-webkit-touch-callout: none)",
    source: decl.source,
  });

  rule.after(media);

  const clonedRule = new Rule({
    selector: rule.selector,
    source: rule.source,
  });

  media.append(clonedRule);

  clonedRule.append({
    prop: decl.prop,
    value: "100dvh",
    source: decl.source,
  });
};

module.exports = () => {
  return {
    postcssPlugin: "postcss-100dvh-fix",
    Declaration: {
      "min-height": process,
      "max-height": process,
      height: process,
    },
  };
};

module.exports.postcss = true;
