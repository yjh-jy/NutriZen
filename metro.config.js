// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig("/Users/wakaka/Desktop/orbital_2023/");
defaultConfig.resolver.assetExts.push('cjs');

module.exports = defaultConfig;
