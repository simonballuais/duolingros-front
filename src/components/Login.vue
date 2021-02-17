<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="col-sm-6 offset-sm-3">
          <InlineForm v-on:submit="handleSubmit">
          <div class="form-group">
            <TextInput v-model="username" placeholder="Login" />
            <small v-if="status.invalidCredentials"
                   class="form-text text-danger">
              Invalid credentials
            </small>
          </div>
          <div class="form-group">
            <TextInput v-model="password" placeholder="Password" type="password" />
          </div>
          <div class="form-group">
            <Submit label="Go" :loading="status.loggingIn" />
          </div>

          <div class="form-group">
            <router-link :to="{name: 'registration'}"
                         v-slot="{href, route, navigate, isActive, isExactActive}"
            >
              <a :href="href">
                S'inscrire
              </a>
            </router-link>
          </div>
          </InlineForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

import InlineForm from './form/InlineForm.vue'
import TextInput from './form/TextInput.vue'
import Submit from './form/Submit.vue'

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      loading: false,
    }
  },
  computed: {
    ...mapState('security', ['status', 'isLoggedIn']),
  },
  components: {
    InlineForm,
    TextInput,
    Submit,
  },
  methods: {
    ...mapActions('security', ['login', 'logout']),
    handleSubmit() {
      this.loading = true
      const {username, password} = this

      if (username && password) {
        this.login({username, password})
      }
    }
  },
  created() {
    if (this.isLoggedIn) {
        this.$router.push({name: 'home'})
    }

    this.$store.subscribe((mutation) => {
      if (mutation.type === 'security/loginSuccess') {
        this.$router.push({name: 'home'})
      }
    });
  }
}
</script>
