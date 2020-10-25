<template>
  <div>
    <v-navigation-drawer v-model="sideNav" absolute temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>User</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-item dense v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="primary" dark>
      <v-app-bar-nav-icon @click.stop="sideNav = !sideNav" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor:pointer">
          Dev Meetup
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down" >
        <v-btn text v-for="item in menuItems" :key="item.title" :to="item.link" exact>
          <v-icon dark left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
  import { mdiAccountMultiple,mdiLogoutVariant,mdiAccount,mdiMapMarker,mdiLockOpen } from '@mdi/js';

  export default {
    name: 'Navbar',
    data() {
      return {
        sideNav: false,
        meetupPath: mdiAccountMultiple,
        logoutPath: mdiLogoutVariant,
        menuItems : [
          { icon: mdiAccountMultiple, title: "View Meetups", link:"/meetups" },
          { icon: mdiMapMarker, title: "Organize Meetup", link:"/meetups/new" },
          { icon: mdiAccount, title: "Profile", link:"/profile" },
          { icon: mdiLockOpen, title: "Sign In", link:"/sessions/new" },
          { icon: mdiLogoutVariant, title: "Sign Out", link:"/users/new" },
        ]
      }
    }
  }
</script>

<style scoped>
  .v-toolbar {
    flex: none !important;
  }
</style>