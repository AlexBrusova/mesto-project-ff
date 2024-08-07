export const getUserInfo = async() =>
  fetch(`https://nomoreparties.co/v1/pwff-cohort-1/users/me`, {
    headers: {
      authorization: '670ce060-111f-4096-85bf-c2c94c40c45a',
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      Promise.reject(`Ошибка запроса к серверу: ${res.status}`);
    }
  });

export const getInitialCards = async() =>
  fetch(`https://nomoreparties.co/v1/pwff-cohort-1/cards`, {
    headers: {
      authorization: '670ce060-111f-4096-85bf-c2c94c40c45a',
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      Promise.reject(`Ошибка запроса к серверу: ${res.status}`);
    }
  });

  export const getStartInfo = () => {
    return Promise.all([getUserInfo(), getInitialCards()])
  }

export const editUserProfile = async(inputName, inputDescription) => {
  fetch(`https://nomoreparties.co/v1/cohortId/users/me`, {
    headers: {
      authorization: '670ce060-111f-4096-85bf-c2c94c40c45a',
      'Content-Type': 'application/json',
    },
    method: 'PATCH', 
    body: JSON.stringify({
      name: `${inputName}`,
      about: `${inputDescription}`,
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      Promise.reject(`Ошибка запроса к серверу: ${res.status}`);
    }
  })
}

export const editUserCard = async(inputCardName, inputCardLink) => {
  fetch(`https://nomoreparties.co/v1/cohortId/cards`, {
    method: 'POST',
    headers: {
      authorization: '670ce060-111f-4096-85bf-c2c94c40c45a',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: `${inputCardName}`,
      link: `${inputCardLink}`,
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      Promise.reject(`Ошибка запроса к серверу: ${res.status}`);
    }
  })
}

export default { getUserInfo, getInitialCards, getStartInfo, editUserProfile, editUserCard};
