module.exports = function (api) {
  api.cache(true);

  const presets = [ "@babel/preset-env", "@babel/preset-react" ];
  const plugins = [
    "macros",
    [
      "module-resolver",
      {
        "extensions": [".js"],
        "root": ["./src"],
      },
    ],
    ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
  ];

  return {
    presets,
    plugins
  };
}

