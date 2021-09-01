<template>
  <v-app :style="{background: '#B0BEC5'}">
    <v-main>
      <v-btn icon x-large aria-label="settings" v-on:click="settingsDrawer=!settingsDrawer">
        <v-icon>
          mdi-cog
        </v-icon>
      </v-btn>
      <v-btn icon x-large aria-label="help" v-on:click="helpDrawer=!helpDrawer">
        <v-icon>
          mdi-help-circle
        </v-icon>
      </v-btn>
      <SettingsDrawer v-model="settingsDrawer" v-on:settingsChanged="changeSettings"></SettingsDrawer>
      <HelpDrawer v-model="helpDrawer"></HelpDrawer>
      <router-view/>
    </v-main>    
  </v-app>
</template>

<script>
  import SettingsDrawer from '@/components/SettingsDrawer.vue'
  import HelpDrawer from '@/components/HelpDrawer.vue'

  export default {
    name: 'App',
    components: {
      SettingsDrawer,
      HelpDrawer
    },
    data() {
        return {
            settingsDrawer: false,
            helpDrawer: false,
        };
    },
    methods: {
      changeSettings(settings) {
        // set min and max times and the option to display times as global variables
        this.$root.minTime = settings.minTime;
        this.$root.maxTime = settings.maxTime;
        this.$root.displayTimes = settings.displayTimes;
        this.settingsDrawer = false;
      },
    }
  };
</script>
