import API from './Api.js';
const api = new API();

// const rest = axios.create({
//   baseURL: 'http://localhost:3000',
//   withCredentials: true
// })









document.querySelector('#reg').addEventListener('submit', async (e) => {
  try {
    const email = e.target[0].value;
    const password = e.target[1].value;
    const res = await api.registration('api/registration', { email, password });
    console.log(res);
  } catch (e) {
    console.log(e);
  }

  // e.preventDefault()
  // const email = e.target[0].value;
  // const password = e.target[1].value;

  // const res = fetch('api/registration', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json;charset=utf-8'
  //   },
  //   body: JSON.stringify({ email, password })
  // }).then((data) => {
  //   data.json().then(data => console.log(data));
  // })
})



// ------------------------------

document.querySelector('#logOut').addEventListener('click', async (e) => {
  const res = await api.post('api/logOut');
  localStorage.removeItem('token');
})

// 


document.querySelector('#logIn').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;
  const res = await api.logIn('api/logIn', { email, password })
  const { data } = res;
  localStorage.setItem('token', data.userToken.accessToken);
  if (res.status === 200) {
    e.target[0].value = '';
    e.target[1].value = '';
  }

})




// -------------------------admin page------------------------;


