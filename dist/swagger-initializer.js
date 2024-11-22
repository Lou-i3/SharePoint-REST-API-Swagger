window.onload = function() {
  //<editor-fold desc="Changeable Configuration Block">

  // the following lines will be replaced by docker/configurator, when it runs in a docker-container
  window.ui = SwaggerUIBundle({
    url: "swagger.yaml",
    dom_id: '#swagger-ui',
    deepLinking: true,
    tryItOutEnabled: true,
    filter: true, // Enable filtering from topbar search
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout",
    persistAuthorization: true,
    requestInterceptor: (req) => {

      const newReq = {
        ...req
      }

      if (req.url.includes("_api")) {
        // console.log("req interceptor")
        // console.log('req url: ', req.url)
        // console.log('req cookie', req.headers.Cookie)
        // newReq.headers.Cookie = req.headers.Cookie + ";Test=coucou;"
        if (req.headers.Cookie) {
          // console.log('rewriting cookies')
          let properCookies = decodeURIComponent(newReq.headers.Cookie.replace('&', ';'))
          // newReq.headers['X-HTTP-Cookie'] = properCookies
          newReq.headers['Cookie'] = properCookies
          // newReq.headers['X-HTTP-URL'] = newReq.url
          // newReq.url = '/_api/' + req.url.split('/_api/')[1]
          // console.log("new Cookie: ", req.headers.Cookie)
        }

      }
      newReq.credentials = 'include'
      return newReq
    },
    showMutatedRequest: true
  });

  //</editor-fold>
};
