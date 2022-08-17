import { _getUsers, _getQuestions } from "./_DATA"

export function getInitialData () {
    return Promise.all([
        _getUsers(),
        _getQuestions()
    ]).then(([users, questions]) => ({
        users,
        questions,
    }))
}

export function checkUserCredenrials(username, password){
    return new Promise((resolve, reject) =>
        setTimeout(() => {
            _getUsers().then(users => {
                if (Object.keys(users).includes(username)) {
                    const user = users[username];
    
                    if (user.password !== password) {
                        alert('Wrong password.')
                        reject('Wrong password.');
                    }
    
                    return resolve(user);
                }
                alert('User not found.')
                return reject('User not found.');
            })
            
        }, 500)
    );
}