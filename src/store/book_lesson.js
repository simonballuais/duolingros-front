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
    loadProgress({commit}) {
        progressService.get()
            .then((progress) => {
                commit('progressUpdated', progress)
                commit('mergeProgressIntoBookLessonsIfPossible')
            })
            .catch(() => {
                commit('progressUpdateError')
            })
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
    }
}

export const bookLesson = {
    namespaced: true,
    state,
    actions,
    mutations,
}
