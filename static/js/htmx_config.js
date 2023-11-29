var response = null;
var htmlelement = null;
var elements = null;
var i = 0;
const siblingClickEvent = new Event("siblingClick");

const displayModalImage = async (evt) => {
  evt.preventDefault();
  htmlelement = evt.target;
  if (htmlelement.tagName === "IMG") {
    htmlelement = htmlelement.parentNode;
  }
  response = await fetch(htmlelement.getAttribute("geturl"));
  document.body.insertAdjacentHTML("beforeend", await response.text());
  htmlelement = await document.body.querySelector(".modal-box");
  htmlelement.style.display = "block";
};

const closeModalBox = (evt) => {
  evt.preventDefault();
  htmlelement = evt.target.parentNode;
  if (htmlelement.tagName === "DIV") {
    htmlelement = htmlelement.parentNode;
  }
  htmlelement.parentNode.remove();
};

const removeSubdomainDescription = (htmlobj) => {
  htmlobj.parentNode.querySelector(".subdomain-description").remove();
};
const fetchSubdomainDescription = async (htmlobj) => {
  response = await fetch(htmlobj.getAttribute("getmoreurl"));
  htmlobj.parentNode.insertAdjacentHTML("beforeend", await response.text());
  window.location.href = "/#" + htmlobj.parentNode.parentNode.id;
};

const updateViewMode = (htmlobj) => {
  if (htmlobj.parentNode.getAttribute("mode") == "select") {
    htmlobj.parentNode.setAttribute("mode", "view");
    fetchSubdomainDescription(htmlobj);
    i = htmlobj.parentNode.parentNode.querySelector(".domain-description");
    if (i.style.display === "flex") {
      i.style.display = "none";
    }
  } else {
    htmlobj.parentNode.setAttribute("mode", "select");
    removeSubdomainDescription(htmlobj);
  }
};

const callEventChangeVisibility = (htmlobj) => {
  elements = htmlobj.parentNode.querySelectorAll(".subdomain-entity");
  for (i = 0; i < elements.length; i++) {
    if (elements[i] == htmlobj) {
      continue;
    }
    elements[i].dispatchEvent(siblingClickEvent);
  }
  updateViewMode(htmlobj);
};

const subdomainLoadDescribe = async (evt) => {
  if (!evt.target || evt.target.className == "domain-subdomains") {
    return;
  } else if (evt.target.className == "subdomain-entity") {
    htmlelement = evt.target;
  } else {
    htmlelement = evt.target.closest(".subdomain-entity");
  }
  callEventChangeVisibility(htmlelement);
};

const subdomainChangeVisibility = (evt) => {
  htmlelement = evt.target;
  if (htmlelement.style.display && htmlelement.style.display == "flex") {
    htmlelement.style.display = "none";
    return;
  }
  htmlelement.style.display = "flex";
};

const removeAllSubdomainDescription = (htmlobj) => {
  response = htmlobj.querySelector(".domain-subdomains");
  if (response.getAttribute("mode") === "select") {
    switchViewDomainDescribe(response);
    return;
  }
  response = response.querySelectorAll(".subdomain-entity");
  for (htmlelement = 0; htmlelement < response.length; htmlelement++) {
    if (response[htmlelement].style.display == "flex") {
      callEventChangeVisibility(response[htmlelement]);
      break;
    }
  }
  switchViewDomainDescribe(response[0].parentNode);
};

const switchViewDomainDescribe = (htmlobj) => {
  if (htmlobj.style.display && htmlobj.style.display === "flex") {
    htmlobj.style.display = "none";
    return;
  }
  htmlobj.style.display = "flex";
};

const domainRenderDescribe = (evt) => {
  htmlelement = evt.currentTarget.parentNode.parentNode.querySelector(
    ".domain-description",
  );
  switchViewDomainDescribe(htmlelement);
  window.location.href = "/#" + htmlelement.parentNode.id;
  removeAllSubdomainDescription(htmlelement.parentNode);
};
const domainLoadDescribe = async (evt) => {
  htmlelement = evt.currentTarget;
  response = await fetch(htmlelement.getAttribute("geturl"));
  htmlelement.parentNode.insertAdjacentHTML("afterend", await response.text());
  window.location.href = "/#" + htmlelement.parentNode.parentNode.id;
  htmlelement.removeEventListener("click", domainLoadDescribe);
  htmlelement.addEventListener("click", domainRenderDescribe);
  removeAllSubdomainDescription(htmlelement.parentNode.parentNode);
};

window.onload = async (evt) => {
  evt.preventDefault();
  const domain_entities = document.querySelectorAll("section.domain-entity");
  for (i = 0; i < domain_entities.length; i++) {
    htmlelement = domain_entities[i];
    response = await fetch(htmlelement.getAttribute("geturl"));
    htmlelement.innerHTML = await response.text();
  }
  const subdomain_entities = document.querySelectorAll("div.subdomain-entity");
  for (i = 0; i < subdomain_entities.length; i++) {
    htmlelement = subdomain_entities[i];
    response = await fetch(htmlelement.getAttribute("geturl"));
    htmlelement.innerHTML = await response.text();
    // must refactor to avoid wasting CPU cycles (redudant)
    htmlelement.parentNode.addEventListener(
      "click",
      subdomainLoadDescribe,
      false,
    );
    htmlelement.addEventListener(
      "siblingClick",
      subdomainChangeVisibility,
      false,
    );
  }

  const info_icons = document.querySelectorAll("button.domain-information");
  for (i = 0; i < info_icons.length; i++) {
    info_icons[i].addEventListener("click", domainLoadDescribe);
  }
};
