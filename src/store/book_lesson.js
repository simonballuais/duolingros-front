import { bookLessonService } from '../service'

const state = {
    'bookLessons': [],
}

const actions = {
    loadAllBookLessons({commit}) {
        bookLessonService.fetchAll()
            .then((bookLessons) => {
                commit('bookLessonsUpdated', bookLessons)
            })
            .catch(() => {
                commit('bookLessonsUpdateError')
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
}

export const bookLesson = {
    namespaced: true,
    state,
    actions,
    mutations,
}
