import Urls from '../urls'

export const learningSessionService = {
    start,
    submit,
    getLastSevenDaysGraph,
}

function start (lessonId, difficulty) {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .get(Urls.get('start_learning_session', {lesson: lessonId, difficulty}))
            .then((response) => {
                resolve(response.data)
            }).catch(() => {
                reject()
            })
    });
}

function submit (learningSession, proposedAnswers) {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .post(
                Urls.get('submit_learning_session', {learningSession: learningSession}),
                JSON.stringify({proposedAnswers})
            )
            .then((response) => {
                resolve(response.data)
            }).catch(() => {
                reject()
            })
    });
}

function getLastSevenDaysGraph () {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .get(Urls.get('last_seven_days_graph'))
            .then((response) => resolve(response.data))
            .catch(() => reject())
    })
}
