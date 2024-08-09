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
  fetch(`https://nomoreparties.co/v1/pwff-cohort-1/users/me`, {
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

export const editUserCard = async (inputCardName, inputCardLink) => {
  try {
    const response = await fetch(`https://nomoreparties.co/v1/pwff-cohort-1/cards`, {
      method: 'POST',
      headers: {
        authorization: '670ce060-111f-4096-85bf-c2c94c40c45a',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `${inputCardName}`,
        link: `${inputCardLink}`,
      })
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Ошибка запроса к серверу: ${response.status}`);
    }
  } catch (error) {
    console.error('Ошибка при добавлении карточки:', error);
    return Promise.reject(error); // Передайте ошибку дальше
  }
};

export const deleteCard = async (cardId) => {
  return fetch(`https://nomoreparties.co/v1/pwff-cohort-1/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '670ce060-111f-4096-85bf-c2c94c40c45a',
      'Content-Type': 'application/json',
    },
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      Promise.reject(`Ошибка запроса к серверу: ${res.status}`);
    }
  })
}

export const addCardLike = async (cardId) => {
  return fetch(`https://nomoreparties.co/v1/pwff-cohort-1/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: '670ce060-111f-4096-85bf-c2c94c40c45a',
      'Content-Type': 'application/json',
    },
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      Promise.reject(`Ошибка запроса к серверу: ${res.status}`);
    }
  })
}

export const removeCardLike = async (cardId) => {
  return fetch(`https://nomoreparties.co/v1/pwff-cohort-1/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '670ce060-111f-4096-85bf-c2c94c40c45a',
      'Content-Type': 'application/json',
    },
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      Promise.reject(`Ошибка запроса к серверу: ${res.status}`);
    }
  })
}

export const changeAvatar = async (avatarImgLink) => {
  return fetch(`https://nomoreparties.co/v1/pwff-cohort-1/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: '670ce060-111f-4096-85bf-c2c94c40c45a',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      avatar: `${avatarImgLink}`,
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

export default { getUserInfo, getInitialCards, getStartInfo, editUserProfile, editUserCard, deleteCard, addCardLike, removeCardLike, changeAvatar};
