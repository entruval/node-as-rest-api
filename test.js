const axios = require('axios')

function create() {
  axios.post('http://localhost:3000/subscribers', {
    name: "bacasdasdasd",
    subscribedToChannel: "test"
  })
  .then(function (response) {
    // console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}


for (let i = 0; i < 10000; i++) {
  create()
  console.log(i)
}