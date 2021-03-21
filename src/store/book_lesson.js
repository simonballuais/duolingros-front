import { progressService, courseService } from '../service'

const state = {
    'bookLessons': null,
    'courses': null,
    'progress': null,
    'bufferedProgresses': null,
    'bufferedLockedCourses': null,
    bookLessonIdThatJustEnded: null,
}

const actions = {
    loadAllBookLessons({commit}) {
        return new Promise((resolve, reject) => {
            courseService.fetchAll()
                .then((courses) => {
                    commit('bookLessonsUpdated', courses)
                    commit('mergeProgressIntoBookLessonsIfPossible')
                    resolve()
                })
                .catch(() => {
                    commit('bookLessonsUpdateError')
                    reject()
                })
        })
    },
    loadProgress({commit, rootState}) {
        return new Promise((resolve, reject) => {
            if (rootState.security.isLoggedIn) {
                progressService.get()
                    .then((progress) => {
                        commit('progressUpdated', progress)
                        commit('mergeProgressIntoBookLessonsIfPossible')
                        resolve()
                    })
                    .catch(() => {
                        commit('progressUpdateError')
                        reject()
                    })
            } else {
                commit('progressUpdated', progressService.getAsArray())
                commit('mergeProgressIntoBookLessonsIfPossible')
                resolve()
            }
        })
    },
    moveAnonymousProgressForward({commit}, {bookLesson}) {
        let progress = progressService.getAnonymousForBookLessonOrCreateNewOne(bookLesson)
        let lessonId = progress.currentLessonId
        const completeBookLesson = state.bookLessons.filter((bl) => bl.id === bookLesson.id).shift()
        let nextLessonIndex = 0
        let sortedLessonList = completeBookLesson.lessonList.sort(
            (a, b) => a.order < b.order ? -1 : 1
        )

        sortedLessonList.every(
            (l) => {
                nextLessonIndex++
                return l.id != lessonId
            }
        )

        progress.cycleProgression += 1

        if (nextLessonIndex >= sortedLessonList.length) {
            nextLessonIndex = 0
            progress.cycleProgression = 0
            progress.difficulty += 1
        }

        if (progress.difficulty > 5) {
            progress.difficulty = 5
            progress.completed = true
        }

        progress.currentLessonId = completeBookLesson.lessonList[nextLessonIndex].id
        progress.totalLessonCount = completeBookLesson.lessonList.length

        commit('localProgressMovedForward', {progress})
    },
    updateBufferedProgresses({state, commit}) {
        if (state.bookLessonIdThatJustEnded) {
            setTimeout(
                () => { commit('bufferedProgressesUpdated') },
                500
            )
        }

        commit('bufferedProgressesUpdated')
    }
}

const mutations = {
    bookLessonsUpdated(state, courses) {
        state.courses = courses
        state.bookLessons = []

        courses.forEach((c) => {
            c.bookLessonList.forEach((bl) => {
                bl.courseId = c.id
                state.bookLessons.push(bl)
            })
        })
    },
    bookLessonsUpdateError(state) {
        state.bookLessons = []
    },
    progressUpdated(state, progress) {
        state.progress = progress
    },
    mergeProgressIntoBookLessonsIfPossible(state) {
        if (!state.bookLessons || !state.progress) {
            return
        }

        state.bookLessons.forEach((bl) => {
            const correspondingProgress = state.progress.filter(
                    (p) => p.bookLessonId === bl.id
            ).pop()

            if (correspondingProgress) {
                bl.progress = correspondingProgress
            }
        })
    },
    localProgressMovedForward(state, {progress}) {
        progressService.saveAnonymous(progress)
    },
    difficultyEnded(state, {bookLessonId}) {
        state.bookLessonIdThatJustEnded = bookLessonId
    },
    bufferedProgressesUpdated(state) {
        state.bufferedProgresses = {}
        state.bufferedLockedCourses = {}
        state.courses.forEach((c) => state.bufferedLockedCourses[c.id] = true)

        state.bookLessons.forEach(
            (bl) => {
                let newProgress = 0
                let newDifficulty = 0

                if (bl.progress) {
                    state.bufferedLockedCourses[bl.courseId] = false

                    if (bl.id === state.bookLessonIdThatJustEnded) {
                        newProgress = 100
                        newDifficulty = bl.progress.difficulty - 2
                        state.bookLessonIdThatJustEnded = null
                    } else {
                        newProgress = bl.progress.cycleProgression / bl.progress.totalLessonCount * 100
                        newDifficulty = bl.progress.difficulty - 1
                    }

                    if (bl.progress.completed) {
                        newDifficulty++
                    }
                }

                state.bufferedProgresses[bl.id] = {
                    progress: newProgress,
                    difficulty: newDifficulty,
                }
            }
        )
    },
    logout(state) {
        state.bufferedProgresses = {}
    }
}

export const bookLesson = {
    namespaced: true,
    state,
    actions,
    mutations,
}
