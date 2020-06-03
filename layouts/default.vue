<template>
  <div>
    <nav class="nav">
      <a href="/" class="nav__link">dashboard</a>
      <a href="/trackTxs" class="nav__link">transactions</a>
    </nav>
    <nuxt />
  </div>
</template>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: center;
  height: 64px;
  max-height: 64px;
  min-height: 64px;
  background: blanchedalmond;
  padding: 20px 0;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  overflow: hidden;

  &__link {
    display: inline-block;
    color: black;
    margin: 0 10px;
    text-decoration: none;
    font-weight: bold;
    transition: color ease 0.3s;

    &:hover {
      color: brown;
    }
  }
}
</style>
