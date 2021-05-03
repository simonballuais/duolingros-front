import Urls from '../urls'

export const questionService = {
    updateQuestionText,
    updatePropositionText,
}

function updateQuestionText (questionId, text) {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .put(
                    Urls.get('questions', {question: questionId}),
                    JSON.stringify({text})
                 )
            .then((response) => {
                resolve(response.data)
            }).catch(() => {
                reject()
            })
    });
}

function updatePropositionText (propositionId, text) {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .put(
                    Urls.get('propositions', {proposition: propositionId}),
                    JSON.stringify({text})
                 )
            .then((response) => {
                resolve(response.data)
            }).catch(() => {
                reject()
            })
    });
}
