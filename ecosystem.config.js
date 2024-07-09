module.exports = {
    apps: [
      {
        name: 'egregor-api',
        port: '3002',
        exec_mode: 'cluster',
        instances: 'max',
        script: 'node -r dotenv/config ./dist/main.js',
      }
    ]
}
