define(["exports", "core/linter", "core/linter-rules/no-headingless-sections", "core/linter-rules/no-http-props", "w3c/linter-rules/privsec-section", "core/linter-rules/check-punctuation", "core/linter-rules/local-refs-exist"], function (exports, _linter, _noHeadinglessSections, _noHttpProps, _privsecSection, _checkPunctuation, _localRefsExist) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.name = undefined;
  exports.run = run;

  var _linter2 = _interopRequireDefault(_linter);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  /**
   * Sets the defaults for BP4mc2 specs
   */
  const name = exports.name = "bp4mc2/defaults";


  _linter2.default.register(_noHttpProps.rule, _noHeadinglessSections.rule, _checkPunctuation.rule, _localRefsExist.rule);

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

  const bp4mc2Defaults = {
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
      src: "http://bp4mc2.org/bp4mc2.png",
      alt: "BP4mc2",
      height: 60,
      width: 208,
      url: "https://bp4mc2.org"
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
    Object.assign(conf, _extends({}, bp4mc2Defaults, conf));
    Object.assign(conf.lint, _extends({}, bp4mc2Defaults.lint, conf.lint));
    //computed properties
    Object.assign(conf, computeProps(conf));
  }
});
//# sourceMappingURL=defaults.js.map