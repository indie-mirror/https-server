# HTTPS Server

## WARNING: This module has been deprecated, do not use.

HTTPS Server has been renamed to [Indie Web Server](https://source.ind.ie/hypha/tools/web-server) and moved to the [@ind.ie/web-server](https://www.npmjs.com/package/@ind.ie/web-server) npm module.

__Please install the latest version of Indie Web Server instead of using this module.__

## Migration instructions

1. Remove https-server from global npm packages:

    ```shell
    npm uninstall -g @ind.ie/https-server
    ```

2. Remove https-server from your local (if you were using the API):

    ```shell
    npm uninstall @ind.ie/https-server
    ```

3. Install Indie Web Server as a global npm package and use the `web-server` command in Terminal:

    ```shell
    npm i -g @ind.ie/web-server
    web-server
    ```
4. Install Indie Web Server into your project to use the API:

    ```shell
    npm i @ind.ie/web-server
    ```
    And in your app:
    ```js
    const webServer = require('@ind.ie/web-server')
    webServer.serve()
    ```

For for further instructions, please see the [Indie Web Server documentation](https://source.ind.ie/hypha/tools/web-server/blob/master/README.md) project.