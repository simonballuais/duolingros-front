import Vue from 'vue'
import Vuex from 'vuex'

import {security} from './security'
import {bookLesson} from './book_lesson'
import {learningSession} from './learning_session'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        security,
        bookLesson,
        learningSession,
    }
})
