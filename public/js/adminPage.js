import API from './Api.js';
const api = new API()


function getListUsers() {
  const linkGetListUsers = document.querySelector('#getListUsers');
  linkGetListUsers.addEventListener('click', async (e) => {
    e.preventDefault();
    const res = await api.getListUsers('api/admin/getUsers');
    console.log(res);
    // const res = await api.getListUsers('api/admin/getUsers');
    // const out = document.querySelector('.out');
    // const createOut = document.createElement('span');
    // createOut.textContent = JSON.stringify(res.data);
    // out.appendChild(createOut);
    // console.log(res.data);

  })
}


getListUsers();