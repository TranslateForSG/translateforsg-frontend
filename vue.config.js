module.exports = {
    pwa: {
        name: 'TranslateForSG',
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: 'public/service-worker.js'
        },
    }
};