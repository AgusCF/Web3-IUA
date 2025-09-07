<template>
  <v-footer class="text-center d-flex flex-column ga-2 py-4" color="indigo-lighten-1" style="max-height: 140px;">
    <div class="d-flex ga-3">
      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        density="comfortable"
        variant="text"
      ></v-btn>
    </div>
    <div class="d-flex ga-3">
      <v-btn
      v-for="link in links"
      :key="link"
      :text="link"
      variant="text"
      rounded
    ></v-btn>
    </div>
    
    <v-divider></v-divider>

    <div>
      <strong>From 2025 to — {{ new Date().getFullYear() }}</strong>
    </div>
  </v-footer>
</template>

<script setup>
  const icons = [
    'mdi-linkedin',
    'mdi-instagram',
  ]
  const links = [
    'Home',
    'About Us',
    'Team',
    'Services',
    'Blog',
    'Contact Us',
  ]
</script>
