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

export function checkUserCredenrials(user, password){
    return Promise.all([_getUsers()])
    .then((users) => {
        if(users[user] && users[user].password === password){
            return users[user]
        }
    })
}