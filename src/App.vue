<template>
  <div class="container">
      <li>
        <ul><router-link to="/">Got to home</router-link></ul>
        <ul><router-link to="/form">Got to form</router-link></ul>
        <ul><router-link to="/post">Got to post</router-link></ul>
        <ul><router-link to="/about">Got to about</router-link></ul>
      </li>
      <router-view></router-view>
  </div>
</template>