// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig("/orbital");
defaultConfig.resolver.assetExts.push('cjs');

module.exports = defaultConfig;

//good morning
//xd
//dlasljdlasjdalsdjaslldajlda