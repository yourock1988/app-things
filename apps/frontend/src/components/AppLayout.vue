<script>
export default {
  props: ['tabs'],

  data() {
    return {
      drawer: false,
      icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'],
    }
  },
}
</script>
<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item
          title="Application Menu"
          prepend-icon="mdi-menu"
          @click.stop="drawer = !drawer"
        ></v-list-item>
        <v-divider></v-divider>
        <v-list-item
          v-for="t of tabs"
          :key="t"
          :title="t"
          :to="t"
        ></v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="warning"> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar>
      <v-toolbar-title>Application Bar</v-toolbar-title>

      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <template v-slot:append>
        <v-btn icon="mdi-heart"></v-btn>
        <v-btn icon="mdi-magnify"></v-btn>
        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>

      <template v-slot:extension>
        <v-tabs>
          <v-tab v-for="t of tabs" :key="t" :text="t" :to="t"></v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <v-breadcrumbs
        :items="['home', 'admin', 'things', 'cars']"
      ></v-breadcrumbs>
      <v-divider></v-divider>

      <v-container>
        <slot></slot>
      </v-container>
    </v-main>

    <v-footer class="text-center d-flex flex-column ga-2 py-4">
      <div class="d-flex ga-3">
        <v-btn
          v-for="icon of icons"
          :key="icon"
          :icon="icon"
          variant="text"
        ></v-btn>
      </div>

      <v-divider class="my-2" thickness="2" width="50"></v-divider>

      <div class="text-caption font-weight-regular opacity-60">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
        Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
        accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a
        sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
        lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
        iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor
        vel ut orci.
      </div>

      <v-divider></v-divider>

      <div>{{ new Date().getFullYear() }} — <strong>web-app.click</strong></div>
    </v-footer>
  </v-app>
</template>
