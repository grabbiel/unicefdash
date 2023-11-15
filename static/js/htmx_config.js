document.body.addEventListener("htmx:validateURL", function (evt) {
  if (
    !evt.detail.sameHost &&
    !evt.detail.url.hostname !== "raw.githubusercontent.com"
  ) {
    evt.PreventDefault();
  }
});
