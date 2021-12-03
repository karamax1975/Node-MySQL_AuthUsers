

const rest = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
})







const formReg = document.querySelector('#reg');

formReg.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = e.target[0].value;
  const password = e.target[1].value;

  const res = fetch('api/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ email, password })
  }).then((data) => {
    data.json().then(data => console.log(data));

  })
})



// ------------------------------

const logOut = document.querySelector('#logOut');
logOut.addEventListener('click', (e) => {
  const res = fetch('api/logOut', {
    method: 'POST',

  })
})

// 

const userLogin = async () => {
  const formLogIn = document.querySelector('#logIn');


  formLogIn.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const res = await rest.post('api/logIn', {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      data: { email, password }
    })
    const { data } = res;
    if (res.status === 200) {
      e.target[0].value = '';
      e.target[1].value = '';
    }

  })
}

userLogin();



// -------------------------admin page------------------------;


