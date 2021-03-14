import { userService } from '../service'
import router from '../router'

const user = JSON.parse(localStorage.getItem('user'))
const token = localStorage.getItem('token')
const state = {
    'status': {
        loggedIn: !!user,
    },
    'user': user,
    isLoggedIn: !!(user && token),
    'token': token,
    puttingUserData: false,
    putUserDataError: false,
}

const actions = {
    login({commit}, {username, password}) {
        commit('loginRequest');

        userService.login(username, password)
            .then(
                ({user, token}) => {
                    commit('loginSuccess', {user, token})
                }
            ).catch(
                () => {
                    commit('loginFailure')
                }
            )
    },
    loadAnonymousUserDataIfNecessary({dispatch, state}) {
        if (!state.user && !state.isLoggedIn) {
            dispatch('reloadUserData')
        }
    },
    reloadUserData({commit, state}) {
        if (state.isLoggedIn) {
            userService.get(user.id)
                .then(
                    (user) => {
                        commit('userDataUpdated', {user})
                    }
                ).catch(
                    () => {
                    }
                )
        } else {
            const anonymousUser = userService.getAnonymous()

            if (!anonymousUser) {
                return router.push({'name': 'login'})
            }

            commit('userDataUpdated', {user: anonymousUser})
        }
    },
    putUserData({dispatch, state, commit}, user) {
        commit('puttingUserData')

        if (state.isLoggedIn) {
            userService.put(user)
                .then(() => {
                    dispatch('reloadUserData')
                    commit('putUserDataSuccess')
                })
                .catch(() => {
                    commit('putUserDataError')
                })
        } else {
            userService.saveAnonymous(state.user)
        }
    },
    logout({commit}) {
        userService.logout()
        commit('logout')
    },
    initAnonymousUserIfNecessary({commit, state}) {
        if (state.user) {
            return
        }

        const user = {
            reason: null,
            dailyObjective: null,
            currentLevel: null,
            learningSessionCountThatDay: 0,
            currentSerie: 0,
        }

        userService.saveAnonymous(user)

        commit('anonymousUserInitiated', {user})
    },
    anonymousDailyCountIncremented({state, dispatch}) {
        if (state.user.learningSessionCountThatDay == 0) {
            state.user.currentSerie += 1
        }

        state.user.learningSessionCountThatDay += 1
        dispatch('putUserData')
    },
}

const mutations = {
    loginRequest(state) {
        state.status = {
            loggingIn: true,
        }
    },
    loginSuccess(state, {user, token}) {
        state.status = {
            loggedIn: true,
        }

        state.isLoggedIn = true
        state.user = user
        state.token = token

        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    },
    userDataUpdated(state, {user}) {
        state.user = user

        if (state.isLoggedIn) {
            localStorage.setItem('user', JSON.stringify(user))
        }
    },
    loginFailure(state) {
        window.console.log('login failure')
        state.status = {
            invalidCredentials: true
        }
    },
    logout(state) {
        state.status = {}
        state.token = null
        state.user = null
        state.isLoggedIn = false
        router.push({'name': 'login'})
    },
    anonymousUserInitiated(state, {user}) {
        state.user = user
    },
    puttingUserData(state) {
        state.putUserDataError = false
        state.puttingUserData = true
    },
    putUserDataError(state) {
        state.puttingUserData = false
        state.putUserDataError = true
    },
    putUserDataSuccess(state) {
        state.puttingUserData = false
        state.putUserDataError = false
    },
}

export const security = {
    namespaced: true,
    state,
    actions,
    mutations,
}
