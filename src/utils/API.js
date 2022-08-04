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
                        reject(alert('Wrong password.'));
                    }
    
                    return resolve(user);
                }
    
                return reject(alert('User not found.'));
            })
            
        }, 500)
    );
}