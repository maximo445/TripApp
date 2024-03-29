const login = async (email, password) => {
    console.log(email, password);
    try {

        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:8080/api/v1/users/login',
            data: {
                email,
                password
            }
        });

        // if (res.data.status === 'success') {
        //     alert('You are logged in!');
        //     window.setTimeout(() => {
        //         location.assign('/')
        //     }, 1500)
        // }

        console.log(res);

    } catch (err) {
        console.log(err.response.data.message);
    }
}

document.querySelector('.login-form').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
    console.log('Event trigered');
});