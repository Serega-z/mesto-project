const baseUrl = "https://nomoreparties.co/v1";
const authorizationCode = "92f03e12-2aa3-473a-b069-ac84e8ecd772";
const cohortId = "plus-cohort-8";

export function getCards() {
  return fetch(`${baseUrl}/${cohortId}/cards`, {
    headers: {
      authorization: authorizationCode,
    },
  })
    .then((res) => _checkResponse(res));
    
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
  }).then((res) => _checkResponse(res));
}

export function removeCard(elementId) {
  return fetch(`${baseUrl}/${cohortId}/cards/${elementId}`, {
    method: "DELETE",
    headers: {
      authorization: authorizationCode,
      "Content-Type": "application/json",
    },
  }).then((res) => _checkResponse(res));
}

export function getProfile() {
  return fetch(`${baseUrl}/${cohortId}/users/me`, {
    headers: {
      authorization: authorizationCode,
    },
  })
    .then((res) => _checkResponse(res));
    
}

export function changeLike(methodName, elementId) {
  return fetch(`${baseUrl}/${cohortId}/cards/likes/${elementId}`, {
    method: methodName,
    headers: {
      authorization: authorizationCode,
      "Content-Type": "application/json",
    },
  }).then((res) => _checkResponse(res));
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
  }).then((res) => _checkResponse(res));
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
  }).then((res) => _checkResponse(res));
}

function _checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}
