const baseUrl = "https://nomoreparties.co/v1";
const authorizationCode = "92f03e12-2aa3-473a-b069-ac84e8ecd772";
const cohortId = "plus-cohort-8";

import { createProfile } from "../index.js";
import { addCard } from "./card.js";

export function renderCards() {
  fetch(`${baseUrl}/${cohortId}/cards`, {
    headers: {
      authorization: authorizationCode,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      result.forEach(function (item) {
        addCard(item);
      });
    });
}

export function editAvatar() {
  return fetch(`${baseUrl}/${cohortId}/users/me/avatar `, {
    method: "PATCH",
    headers: {
      authorization: authorizationCode,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: newAvatar.value,
    }),
  }).then((res) => {
    return res.json();
  });
}

export function removeCard(elementId) {
  return fetch(`${baseUrl}/${cohortId}/cards/${elementId}`, {
    method: "DELETE",
    headers: {
      authorization: authorizationCode,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return res.json();
  });
}

export function getProfile() {
  fetch(`${baseUrl}/${cohortId}/users/me`, {
    headers: {
      authorization: authorizationCode,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      createProfile(result);
    });
}

export function changeLike(methodName, elementId) {
  return fetch(`${baseUrl}/${cohortId}/cards/likes/${elementId}`, {
    method: methodName,
    headers: {
      authorization: authorizationCode,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return res.json();
  });
}

export function addLocation(locationName, image) {
  return fetch(`${baseUrl}/${cohortId}/cards`, {
    method: "POST",
    headers: {
      authorization: authorizationCode,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: locationName,
      link: image,
    }),
  }).then((res) => {
    return res.json();
  });
}

export function editProfile(newName, newAbout) {
  return fetch(`${baseUrl}/${cohortId}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: authorizationCode,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newName,
      about: newAbout,
    }),
  }).then((res) => {
    return res.json();
  });
}
