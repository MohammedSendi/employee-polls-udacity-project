import {_saveQuestion, _saveQuestionAnswer} from "./_DATA";

describe('_saveQuestion', () => {

    it('should save the given question', async () => {
        const question = {
            author: ':author:',
            optionOneText: ':optionOne.text:',
            optionTwoText: ':optionTwo.text:',
        };

        var res = await _saveQuestion(question);
        expect(res.id).toBeTruthy();
        expect(res.author).toBe(':author:');
        expect(res.optionOne.text).toBe(':optionOne.text:');
        expect(res.optionTwo.text).toBe(':optionTwo.text:');
    });

    it('should not save the given invalid question', async () => {
        

        await expect(_saveQuestion({})).rejects.toEqual(
            'Please provide optionOneText, optionTwoText, and author'
        );
    });
})

describe("_saveQuestionAnswer", () => {
    it("should return true for correct parameters", async () => {
        const response = await _saveQuestionAnswer({
            authedUser: "sarahedo",
            qid: "8xf0y6ziyjabvozdd253nd",
            answer: "optionOne"
        });

        expect(response).toBeTruthy();
    });

    it("should return error for false parameters", async () => {
        const response = await _saveQuestionAnswer({
            authedUser: "sarahedo",
            qid: undefined,
            answer: "optionOne"
        }).catch(e => e);

        expect(response).toBe("Please provide authedUser, qid, and answer");
    });
});
