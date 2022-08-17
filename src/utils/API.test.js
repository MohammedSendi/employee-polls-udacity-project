import {checkUserCredenrials} from './API'

describe('checkUserCredenrials', () => {

    it('should return the user', async () => {
        const user = 'sarahedo'
        const pass = 'password123'

        var res = await checkUserCredenrials(user, pass);
        expect(res.id).toEqual(user);
        expect(res.password).toEqual(pass);

    });

    it('should give error on wrong password', async () => {
        const user = 'sarahedo'
        const pass = 'wrong pass'

        //var res = await checkUserCredenrials(user, pass);
        await expect(checkUserCredenrials(user, pass)).rejects.toEqual(
            'Wrong password.'
        );

    });

    it('should give error on invalid user', async () => {
        const user = 'invalid user'
        const pass = 'password123'

        await expect(checkUserCredenrials(user, pass)).rejects.toEqual(
            'User not found.'
        );

    });
})