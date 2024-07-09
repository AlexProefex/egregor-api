module.exports = {
    apps: [
      {
        name: 'adminApi',
        port: '3002',
        exec_mode: 'cluster',
        instances: 'max',
        script: 'node -r dotenv/config ./dist/main.js',
      },

      {
        name: 'adminDocs',
        port: '3003',
        exec_mode: 'cluster',
        instances: 'max',
        script: 'npx @compodoc/compodoc -p tsconfig.json -s -r 3003',
      },

    ]
}
