<template>
  <header>
    <div class="title">Wikimedia Server Connectivity Dashboard</div>
    <div class="desc">{{ $i18n('header-slogan') }}</div>
  </header>
</template>

<style scoped lang="less">
header {
  border-bottom: 1px solid #cdcdcd;
  text-align: center;
  font-family: Georgia, 'Times New Roman', Times, serif;
  padding: 20px 0;
  line-height: 1.2;
}

.title {
  user-select: none;
  word-spacing: 9999px;
  font-variant: small-caps;
  font-size: 120%;
}

.desc {
  margin-top: 10px;
  font-size: 80%;
  color: #54595d;
}
</style>
