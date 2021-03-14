import { bookLessonService, progressService } from '../service'

const state = {
    'bookLessons': null,
    'progress': null,
    'lastUnlockedBookLessonId': null,
}

const actions = {
    loadAllBookLessons({commit}) {
        bookLessonService.fetchAll()
            .then((bookLessons) => {
                commit('bookLessonsUpdated', bookLessons)
                commit('mergeProgressIntoBookLessonsIfPossible')
            })
            .catch(() => {
                commit('bookLessonsUpdateError')
            })
    },
    loadProgress({commit, rootState}) {
        if (rootState.security.isLoggedIn) {
            progressService.get()
                .then((progress) => {
                    commit('progressUpdated', progress)
                    commit('mergeProgressIntoBookLessonsIfPossible')
                })
                .catch(() => {
                    commit('progressUpdateError')
                })
        } else {
            commit('progressUpdated', progressService.getAsArray())
            commit('mergeProgressIntoBookLessonsIfPossible')
        }
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

        window.console.log('UPPUPUUPP')

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
}

const mutations = {
    bookLessonsUpdated(state, bookLessons) {
        state.bookLessons = bookLessons
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

        state.bookLessons.every((b) => {
            if (!b.progress) {
                state.lastUnlockedBookLessonId = b.id
                return false
            }

            return true
        })
    },
    localProgressMovedForward(state, {progress}) {
        progressService.saveAnonymous(progress)
    }
}

export const bookLesson = {
    namespaced: true,
    state,
    actions,
    mutations,
}
