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
    confirmingEmailCode: false,
    confirmEmailError: false,
    sendingPasswordResetRequest: false,
    sendingPasswordChange: false,
}

const actions = {
    login({commit}, {username, password}) {
        return new Promise((resolve, reject) => {
            commit('loginRequest');

            userService.login(username, password)
                .then(
                    ({user, token}) => {
                        window.console.log(user)
                        commit('loginSuccess', {user, token})
                        resolve()
                    }
                ).catch(
                    () => {
                        commit('loginFailure')
                        reject()
                    }
                )
        })
    },
    loadAnonymousUserDataIfNecessary({dispatch, state}) {
        if (!state.user && !state.isLoggedIn) {
            dispatch('reloadUserData')
        }
    },
    reloadUserData({commit, state}) {
        if (state.isLoggedIn) {
            userService.get(state.user.id)
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
        commit('bookLesson/logout')
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
    confirmEmailCode({commit}, emailCode) {
        return new Promise((resolve, reject) => {
            commit('confirmingEmailCode')

            userService.confirmEmailCode(emailCode)
                .then(() => {
                    commit('emailCodeConfirmed')
                    resolve()
                })
                .catch(() => {
                    commit('emailCodeConfirmError')
                    reject()
                })
        })
    },
    sendResetPasswordRequest({commit}, email) {
        return new Promise((resolve, reject) => {
            commit('sendingPasswordResetRequest')

            userService.sendResetPasswordRequest(email)
                .then(() => {
                    commit('passwordResetRequestSent')
                    resolve()
                })
                .catch(() => {
                    commit('passwordResetRequestSent')
                    reject()
                })
        })
    },
    sendPasswordChange({commit}, {password, token}) {
        return new Promise((resolve, reject) => {
            commit('sendingPasswordChange')

            userService.sendPasswordChange(password, token)
                .then(() => {
                    commit('passwordChangeSent')
                    resolve()
                })
                .catch(() => {
                    commit('passwordChangeError')
                    reject()
                })
        })
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
    confirmingEmailCode(state) {
        state.confirmingEmailCode = true
        state.confirmEmailError = false
    },
    emailCodeConfirmed(state) {
        state.confirmingEmailCode = false
        state.confirmEmailError = false
    },
    emailCodeConfirmError(state) {
        state.confirmingEmailCode = false
        state.confirmEmailError = true
    },
    sendingPasswordResetRequest(state) {
        state.sendingPasswordResetRequest = true
    },
    passwordResetRequestSent(state) {
        state.sendingPasswordResetRequest = false
        state.passwordResetRequestSent = true
    },
    sendingPasswordChange(state) {
        state.sendingPasswordChange = true
    },
    passwordChangeSent(state) {
        state.sendingPasswordChange = false
    },
    passwordChangeError(state) {
        state.sendingPasswordChange = false
    },
}

export const security = {
    namespaced: true,
    state,
    actions,
    mutations,
}
