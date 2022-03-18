# postcss-use-100dvh

[PostCSS] plugin to replace 100vh with 100dvh.

[PostCSS]: https://github.com/postcss/postcss

```css
.min-h-screen {
  min-height: 100vh;
}
```

```css
@supports (-webkit-touch-callout: none) {
  .min-h-screen {
    min-height: 100dvh;
  }
}

.min-h-screen {
  min-height: 100vh;
}
```

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-use-100dvh
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-use-100dvh'),
    require('autoprefixer')
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage
