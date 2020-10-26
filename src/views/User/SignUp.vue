<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message" ></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <v-form @submit.prevent="onSignUp">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      v-model="email"
                      label="Email"
                      type="email"
                      :rules="[rules.required]">
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      v-model="password"
                      label="Password"
                      type="password"
                      :rules="[rules.required]">
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="confirmPassword"
                      v-model="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      :rules="[comparePassword]">
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit" :disabled="loading" :loading="loading" >
                      Sign Up
                      <template v-slot:loader>
                        <span class="custom-loader">
                          <v-icon light>mdi-cached</v-icon>
                        </span>
                      </template>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        rules: {
          required: value => !!value || 'Required.',
        },
      }
    },
    computed: {
      comparePassword(){
        return this.password !== this.confirmPassword ? 'Password does not match' : true
      },
      user(){
        return this.$store.getters.user
      },
      error(){
        return this.$store.getters.error
      },
      loading(){
        return this.$store.getters.loading
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined){
          this.$router.push('/')
        }
      }
    },
    methods: {
      onSignUp() {
        this.$store.dispatch( 'signUserUp', {email: this.email,password:this.password,confirmPassword:this.confirmPassword})
      },
      onDismissed(){
        this.$store.dispatch('clearError')
      }
    }
  }
</script>

