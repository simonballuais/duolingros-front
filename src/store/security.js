import { userService } from '../service'

const user = JSON.parse(localStorage.getItem('user'));
const state = {
    'status': {
        loggedIn: !!user,
    },
    'user': user,
    'token': null,
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
    reloadUserData({commit, state}) {
        if (!state.user) {
            return
        }

        userService.get(user.id)
            .then(
                (user) => {
                    window.console.log(user)
                    commit('userDataUpdated', {user})
                }
            ).catch(
                () => {
                }
            )
    },
    putUserData({dispatch, state}, user) {
        if (!state.user) {
            return
        }

        userService.put(user)
            .then(
                () => {
                    dispatch('reloadUserData')
                }
            ).catch(
                () => {
                }
            )
    },
    logout({commit}) {
        userService.logout()
        commit('logout')
    }
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

        state.user = user
        state.token = token

        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    },
    userDataUpdated(state, {user}) {
        state.user = user
        localStorage.setItem('user', JSON.stringify(user))
    },
    loginFailure(state) {
        state.status = {
            invalidCredentials: true
        }
    },
    logout(state) {
        state.status = {}
        state.token = null
        state.user = null
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    },
}

export const security = {
    namespaced: true,
    state,
    actions,
    mutations,
}
