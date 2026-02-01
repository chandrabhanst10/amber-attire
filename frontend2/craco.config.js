const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    webpack: {
        plugins: {
            add: [new CompressionPlugin({ algorithm: 'gzip' })],
        },
    },

    jest: {
        configure: (jestConfig, { env, paths, resolve, rootDir }) => {
            // Allow specific packages to be transformed (ESM support)
            jestConfig.transformIgnorePatterns = [
                "/node_modules/(?!(@standard-schema|axios|react-native)/)"
            ];

            // Merge custom mappings
            jestConfig.moduleNameMapper = {
                ...jestConfig.moduleNameMapper,
                "^axios$": "<rootDir>/src/__mocks__/axios.js",
                "\\.(css|less|scss|sass)$": "<rootDir>/src/__mocks__/styleMock.js"
            };

            return jestConfig;
        }
    }
};
