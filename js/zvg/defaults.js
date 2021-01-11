define(["exports", "core/linter", "core/linter-rules/no-headingless-sections", "core/linter-rules/no-http-props", "w3c/linter-rules/privsec-section", "core/linter-rules/check-punctuation", "core/linter-rules/local-refs-exist"], function (_exports, _linter, _noHeadinglessSections, _noHttpProps, _privsecSection, _checkPunctuation, _localRefsExist) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.run = run;
  _exports.name = void 0;
  _linter = _interopRequireDefault(_linter);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  /**
   * Sets the defaults for ZVG specs
   */
  const name = "zvg/defaults";
  _exports.name = name;

  _linter.default.register(_noHttpProps.rule, //  privsecSectionRule,
  _noHeadinglessSections.rule, _checkPunctuation.rule, _localRefsExist.rule);

  const cgbg = new Set(["BG-DRAFT", "BG-FINAL", "CG-DRAFT", "CG-FINAL"]);
  const licenses = new Map([["cc0", {
    name: "Creative Commons 0 Public Domain Dedication",
    short: "CC0",
    url: "https://creativecommons.org/publicdomain/zero/1.0/"
  }], ["w3c-software", {
    name: "W3C Software Notice and License",
    short: "W3C Software",
    url: "https://www.w3.org/Consortium/Legal/2002/copyright-software-20021231"
  }], ["w3c-software-doc", {
    name: "W3C Software and Document Notice and License",
    short: "W3C Software and Document",
    url: "https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document"
  }], ["cc-by", {
    name: "Creative Commons Attribution 4.0 International Public License",
    short: "CC-BY",
    url: "https://creativecommons.org/licenses/by/4.0/legalcode"
  }]]);
  const zvgDefaults = {
    lint: {
      "no-headingless-sections": true,
      "privsec-section": true,
      "no-http-props": false,
      "check-punctuation": false,
      "local-refs-exist": true
    },
    pluralize: false,
    highlightVars: true,
    doJsonLd: false,
    license: "cc-by",
    specStatus: "base",
    logos: [{
      src: "zvglogo.png",
      alt: "ZVG",
      height: 82,
      width: 314,
      url: "https://www.zorgeloosvastgoed.nl"
    }],
    overrideCopyright: '<p class="copyright"><a href="https://creativecommons.org/licenses/by/4.0/legalcode">Creative Commons Attribution 4.0 International Public License</a></p>',
    addSectionLinks: true
  };

  function computeProps(conf) {
    return {
      isCCBY: conf.license === "cc-by",
      licenseInfo: licenses.get(conf.license),
      isCGBG: cgbg.has(conf.specStatus),
      isCGFinal: conf.isCGBG && /G-FINAL$/.test(conf.specStatus),
      isBasic: conf.specStatus === "base",
      isRegular: !conf.isCGBG && conf.specStatus === "base"
    };
  }

  function run(conf) {
    // assign the defaults
    Object.assign(conf, _objectSpread({}, zvgDefaults, conf));
    Object.assign(conf.lint, _objectSpread({}, zvgDefaults.lint, conf.lint)); //computed properties

    Object.assign(conf, computeProps(conf));
  }
});
//# sourceMappingURL=defaults.js.map