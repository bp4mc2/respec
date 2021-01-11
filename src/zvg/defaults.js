/**
 * Sets the defaults for ZVG specs
 */
export const name = "zvg/defaults";
import linter from "core/linter";
import { rule as noHeadinglessSectionsRule } from "core/linter-rules/no-headingless-sections";
import { rule as noHttpPropsRule } from "core/linter-rules/no-http-props";
import { rule as privsecSectionRule } from "w3c/linter-rules/privsec-section";
import { rule as checkPunctuation } from "core/linter-rules/check-punctuation";
import { rule as localRefsExist } from "core/linter-rules/local-refs-exist";

linter.register(
  noHttpPropsRule,
//  privsecSectionRule,
  noHeadinglessSectionsRule,
  checkPunctuation,
  localRefsExist
);

const cgbg = new Set(["BG-DRAFT", "BG-FINAL", "CG-DRAFT", "CG-FINAL"]);
const licenses = new Map([
  [
    "cc0",
    {
      name: "Creative Commons 0 Public Domain Dedication",
      short: "CC0",
      url: "https://creativecommons.org/publicdomain/zero/1.0/",
    },
  ],
  [
    "w3c-software",
    {
      name: "W3C Software Notice and License",
      short: "W3C Software",
      url:
        "https://www.w3.org/Consortium/Legal/2002/copyright-software-20021231",
    },
  ],
  [
    "w3c-software-doc",
    {
      name: "W3C Software and Document Notice and License",
      short: "W3C Software and Document",
      url:
        "https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document",
    },
  ],
  [
    "cc-by",
    {
      name: "Creative Commons Attribution 4.0 International Public License",
      short: "CC-BY",
      url: "https://creativecommons.org/licenses/by/4.0/legalcode",
    },
  ],
]);

const zvgDefaults = {
  lint: {
    "no-headingless-sections": true,
    "privsec-section": true,
    "no-http-props": false,
    "check-punctuation": false,
    "local-refs-exist": true,
  },
  pluralize: false,
  highlightVars: true,
  doJsonLd: false,
  license: "cc-by",
  specStatus: "base",
  logos: [
    {
      src: "zvglogo.png",
      alt: "ZVG",
      height: 82,
      width: 314,
      url: "https://www.zorgeloosvastgoed.nl",
    },
  ],
  overrideCopyright: '<p class="copyright"><a href="https://creativecommons.org/licenses/by/4.0/legalcode">Creative Commons Attribution 4.0 International Public License</a></p>',
  addSectionLinks: true,
};

function computeProps(conf) {
  return {
    isCCBY: conf.license === "cc-by",
    licenseInfo: licenses.get(conf.license),
    isCGBG: cgbg.has(conf.specStatus),
    isCGFinal: conf.isCGBG && /G-FINAL$/.test(conf.specStatus),
    isBasic: conf.specStatus === "base",
    isRegular: !conf.isCGBG && conf.specStatus === "base",
  };
}

export function run(conf) {
  // assign the defaults
  Object.assign(conf, {
    ...zvgDefaults,
    ...conf,
  });
  Object.assign(conf.lint, {
    ...zvgDefaults.lint,
    ...conf.lint,
  });
  //computed properties
  Object.assign(conf, computeProps(conf));
}
