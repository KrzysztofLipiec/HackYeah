<template>
  <b-container fluid class="bv-example-row">
    <b-row>
      <b-col md="4" offset-md="4">
        <div class="registration-panel">
          <h1>Login to your shop</h1>
          <b-form>
            <b-form-group
              id="email-label"
              label="Email address:"
              label-for="email"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="email-input"
                v-model="form.email"
                type="email"
                required
                placeholder="Enter email..."
              ></b-form-input>
            </b-form-group>
            <b-form-group id="password-label" label="Password:" label-for="password-label">
              <b-form-input
                id="password-input"
                v-model="form.password"
                type="password"
                required
                placeholder="Enter password"
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary" @click="login">Login</b-button>
          </b-form>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import state from "../state";
import { TForm } from "@/interfaces/TForm";

@Component
export default class RegistrationPanel extends Vue {
  @Prop() private form: TForm;

  constructor() {
    super();
    this.form = {
      email: "",
      password: ""
    };
  }

  async login(): Promise<unknown> {
    let user = (
      await fetch(`${state.apiUrl}auth`, {
        method: "POST"
      })
    ).json();
    this.$router.push("BackstageDashboard");

    return user;
  }
}
</script>
