// import {html} from 'lit-html'
import html from 'html-template-tag'

interface AppConfig {
  htmlTitle: string
  downloadLink: string
  appImage: string
  appImageAlt: string
  appName: string
  fabName: string
  storePrefix: string
  downloadCTA: string
}

export const reskytHtml = ({
  htmlTitle,
  downloadLink,
  appImage,
  appImageAlt,
  appName,
  fabName,
  storePrefix,
  downloadCTA
}: AppConfig) => html`<html>
  <head>
    <title>${htmlTitle}</title>
    <style>
      #install-app {
        width: 100%;
        right: 0;
        position: fixed;
        bottom: 0px;
        z-index: 900;
        color: black;
        background-color: #f1f5f9;
        font-family: Verdana, Arial, sans-serif;
        font-size: 12px;
        border-top: 1px solid #e8ecf1;
        min-height: 75px;
      }

      .close-install-app {
        padding: 8px 5px;
        display: block;
        width: 20px;
        height: 40px;
        font-family: Helvetica, Arial, Verdana, sans-serif;
        font-weight: normal;
        font-size: 14px;
        text-align: center;
        cursor: pointer !important;
        font-weight: bold;
        color: #666;
        position: absolute;
        margin-top: 20px;
      }

      .img-app {
        width: 57px;
        border: 1px solid #e8ecf1;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
      }

      .img-app,
      .content-app {
        float: left;
      }

      .fab-app {
        color: #979797;
        font-size: 11px;
      }

      .name-app,
      .title-app,
      .fab-app {
        margin-left: 70px;
        padding: 1px 0;
      }

      .name-app {
        font-weight: bold;
        margin-top: 2px;
        overflow: hidden;
        height: 16px;
      }

      .content-app {
        margin-top: 8px;
        margin-right: 34px;
        margin-left: 30px;
        position: absolute;
      }

      .view-install-app {
        color: blue;
        line-height: 25px;
        margin-top: 23px;
        text-transform: uppercase;
        position: absolute;
        right: 7px;
      }
    </style>
    <script>
      function closeBar() {
        dias_expire = 7 /*Dias que queremos que pasen hasta que se vuelva a mostrar la barra*/
        setCookie('reskyt-install-app', 1, dias_expire)
        document.getElementById('href-download-app').style.display = 'none'
        return false
      }

      function setCookie(cname, cvalue, exdays) {
        var d = new Date()
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
        var expires = 'expires=' + d.toUTCString()
        document.cookie =
          cname +
          '=' +
          cvalue +
          ';' +
          expires +
          ';path=/' /*Añadir ;SameSite=None;Secure en caso de que la cookie tenga que ser accesible entre iFrame*/
      }

      function getCookie(cname) {
        var name = cname + '='
        var decodedCookie = decodeURIComponent(document.cookie)
        var ca = decodedCookie.split(';')
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i]
          while (c.charAt(0) == ' ') {
            c = c.substring(1)
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
          }
        }
        return ''
      }

      url = window.location.href
      if (url.indexOf('customapp=') != -1) {
        setCookie('is_app_install_bar', 1, 365)
        document.getElementById('href-download-app').style.display = 'none'
      }
    </script>
  </head>
  <body>
    <a
      href=${downloadLink}
      class="href-download-app"
      id="href-download-app"
      style="display:none;"
    >
      <div id="install-app">
        <span class="close-install-app" onclick="return closeBar();"
          ><span>x</span></span
        >
        <div class="content-app">
          <img class="img-app" src=${appImage} alt=${appImageAlt} />
          <div class="name-app">${appName}</div>
          <div class="fab-app">${fabName}</div>
          <div class="title-app">
            ${storePrefix} <span id="platform-app"></span>
          </div>
        </div>
        <span class="view-install-app">${downloadCTA}</span>
      </div>
    </a>
  </body>
</html>`
