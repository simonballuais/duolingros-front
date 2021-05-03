import Urls from '../urls'

export const progressService = {
    get,
    getAnonymousForBookLessonOrCreateNewOne,
    saveAnonymous,
    getOrInitiateList,
    getAsArray,
}

function get () {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .get(Urls.get('current_progress'))
            .then((response) => {
                resolve(response.data)
            }).catch(() => {
                reject()
            })
    });
}

function getAnonymousForBookLessonOrCreateNewOne (bookLesson) {
    let currentProgress = getOrInitiateList()
    let progress = currentProgress[bookLesson.id]

    if (!progress) {
        progress = createAnonymousForBookLesson(bookLesson)
        saveAnonymous(progress)
    }

    return progress
}

function saveAnonymous (progress) {
    let currentProgress = getOrInitiateList()
    currentProgress[progress.bookLessonId] = progress
    localStorage.setItem('anonymousProgress', JSON.stringify(currentProgress))
}

function getOrInitiateList () {
    let currentProgress = JSON.parse(localStorage.getItem('anonymousProgress'))

    if (!currentProgress) {
        currentProgress = {}
        localStorage.setItem(
            'anonymousProgress',
            JSON.stringify(currentProgress)
        )
    }

    return currentProgress
}

function getAsArray () {
    const indexedList = getOrInitiateList()
    return Object.keys(indexedList).map((k) => indexedList[k])
}

function createAnonymousForBookLesson(bookLesson) {
    return {
        "difficulty": 1,
        "completed": false,
        "cycleProgression": 0,
        "currentLessonId": bookLesson.lessonList[0].id,
        "totalLessonCount": 4,
        "bookLessonId": bookLesson.id,
    }
}
