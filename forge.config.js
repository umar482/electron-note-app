module.exports = {
  packagerConfig: {},
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'linux'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'umar482',
          name: 'electron-note-app',
        },
        authToken: "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",
        prerelease: false,
        draft: false,
      },
    },
  ],
};
