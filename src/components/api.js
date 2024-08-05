

export const getUserInfo = () => {
  fetch(`https://nomoreparties.co/v1/pwff-cohort-1/users/me`, {
    headers: {
      authorization: '670ce060-111f-4096-85bf-c2c94c40c45a',
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return console.log('Ошибка запроса к серверу:', res.status);
    })
    .then((result) => result);
};

export default {getUserInfo}; 
