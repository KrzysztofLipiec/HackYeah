<template>
  <b-container>
    <b-row>
      <b-col md="4" offset-md="4">
        <h2>Settings</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-input-group size="md" prepend="Shop Name">
          <b-form-input v-model="settings.shopName"></b-form-input>
        </b-input-group>

        <b-input-group class="mt-3" size="md" prepend="Account number">
          <b-form-input v-model="settings.accountNumber"></b-form-input>
        </b-input-group>

        <b-input-group class="mt-3" size="md" prepend="Address">
          <b-form-input v-model="settings.address"></b-form-input>
        </b-input-group>

        <b-input-group class="mt-3" size="md" prepend="Nip">
          <b-form-input v-model="settings.nip"></b-form-input>
        </b-input-group>

        <b-form-group class="mt-3">
          <b-input-group size="md" prepend="from">
            <b-form-input v-model="settings.openHours.from"></b-form-input>
          </b-input-group>

          <b-input-group class="mt-3" size="md" prepend="to">
            <b-form-input v-model="settings.openHours.to"></b-form-input>
          </b-input-group>
        </b-form-group>

        <b-input-group size="md" prepend="logo">
          <b-form-input v-model="settings.logo"></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="2" offset-md="9" class="mt-3">
        <b-button>Save</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { TSettings } from "@/interfaces/TSettings";
import state from "@/state";
import { ShopSize } from "../../../interfaces/ShopSize";
@Component
export default class Settings extends Vue {
  private settings: TSettings = {
    shopName: "",
    accountNumber: "",
    address: "",
    nip: "",
    openHours: {
      from: "",
      to: ""
    },
    size: ShopSize.medium,
    logo: ""
  };
  public mounted(): void {
    this.getSettings();
  }
  private async getSettings(): Promise<void> {
    fetch(`${state.apiUrl}settings/${state.userName}`)
      .then((response: Response) => {
        return response.json();
      })
      .then((data: TSettings) => {
        if (Object.keys(data).length) {
          this.settings = data;
        }
      });
  }
}
</script>