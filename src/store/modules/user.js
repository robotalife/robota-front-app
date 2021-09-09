import firebase from 'firebase/app'
import 'firebase/auth'
import {currentUser, gConfig, isAuthGuardActive} from '../../constants/config'
import {setCurrentUser, getCurrentUser, getGravatarURL} from '../../utils'
import axios from "axios";
import router from "@/router";

export default {
    state: {
        currentUser: isAuthGuardActive ? getCurrentUser() : currentUser,
        loginError: null,
        processing: false,
        forgotMailSuccess: null,
        resetPasswordSuccess: null
    },
    getters: {
        currentUser: state => state.currentUser,
        processing: state => state.processing,
        loginError: state => state.loginError,
        forgotMailSuccess: state => state.forgotMailSuccess,
        resetPasswordSuccess: state => state.resetPasswordSuccess,
    },
    mutations: {
        setUser(state, payload) {
            state.currentUser = payload
            state.processing = false
            state.loginError = null
        },
        setLogout(state) {
            state.currentUser = null
            state.processing = false
            state.loginError = null
        },
        setProcessing(state, payload) {
            state.processing = payload
            state.loginError = null
        },
        setError(state, payload) {
            state.loginError = payload
            state.currentUser = null
            state.processing = false
        },
        setForgotMailSuccess(state) {
            state.loginError = null
            state.currentUser = null
            state.processing = false
            state.forgotMailSuccess = true
        },
        setResetPasswordSuccess(state) {
            state.loginError = null
            state.currentUser = null
            state.processing = false
            state.resetPasswordSuccess = true
        },
        clearError(state) {
            state.loginError = null
        }
    },
    actions: {
        login({commit}, payload) {
            commit('clearError')
            commit('setProcessing', true)
            axios.post(gConfig.PUBLIC_API_URL + '/signin', {
                password: payload.password,
                email: payload.email
            }).then(function (response) {
                if (response.data.statusCode === 200) {
                    const responseObject = response.data.data;
                    const loggedInUser = {
                        id: responseObject.id,
                        title: responseObject.username,
                        //img: getGravatarURL(payload.email),
                        date: 'Last seen today 15:24',
                        token: responseObject.token,
                        role: 0
                    }
                    setCurrentUser(loggedInUser)
                    commit('setUser', loggedInUser)
                } else {
                    setCurrentUser(null);
                    commit('setError', response.data.message)
                    setTimeout(() => {
                        commit('clearError')
                    }, 3000)
                }
            }).catch(error => {
                setCurrentUser(null);
                commit('setError', "Unexpected error occurred, please try again later.")
                setTimeout(() => {
                    commit('clearError')
                }, 3000)
            })
        },
        forgotPassword({commit}, payload) {
            commit('clearError')
            commit('setProcessing', true)
            firebase
                .auth()
                .sendPasswordResetEmail(payload.email)
                .then(
                    user => {
                        commit('clearError')
                        commit('setForgotMailSuccess')
                    },
                    err => {
                        commit('setError', err.message)
                        setTimeout(() => {
                            commit('clearError')
                        }, 3000)
                    }
                )
        },
        resetPassword({commit}, payload) {
            commit('clearError')
            commit('setProcessing', true)
            firebase
                .auth()
                .confirmPasswordReset(payload.resetPasswordCode, payload.newPassword)
                .then(
                    user => {
                        commit('clearError')
                        commit('setResetPasswordSuccess')
                    },
                    err => {
                        commit('setError', err.message)
                        setTimeout(() => {
                            commit('clearError')
                        }, 3000)
                    }
                )
        },


        signOut({commit}) {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    setCurrentUser(null);
                    commit('setLogout')
                }, _error => {
                })
        }
    }
}
