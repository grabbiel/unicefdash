/*
window.onload = function () {
  document.body.addEventListener("htmx:configRequest", function (evt) {
    evt.detail.headers = "";
    evt.detail.headers["Content-Type"] =
      "application/x-www-form-urlencoded; charset=utf-8";
  });

  document.body.addEventListener("htmx:beforeRequest", function (evt) {
    evt.detail.xhr.upload = "";
  });

  document.body.addEventListener("htmx:beforeSend", function (evt) {
    evt.detail.xhr.upload = "";
  });

  document.body.addEventListener("htmx:validateURL", function (evt) {
    if (
      !evt.detail.sameHost &&
      !evt.detail.url.hostname !== "raw.githubusercontent.com"
    ) {
      evt.PreventDefault();
    }
  });
};
*/
