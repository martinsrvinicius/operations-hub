<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { checkApiHealth } from './lib/api-health';

type ConnectionState = 'checking' | 'online' | 'offline';
const connection = ref<ConnectionState>('checking');

onMounted(async () => {
  try {
    await checkApiHealth();
    connection.value = 'online';
  } catch {
    connection.value = 'offline';
  }
});
</script>

<template>
  <main class="shell">
    <header class="header">
      <div class="brand">OH <span class="brand-name">Operations Hub</span></div>
      <span class="version">Foundation · 0.1.0</span>
    </header>

    <section class="hero" aria-labelledby="page-title">
      <p class="eyebrow">Request management</p>
      <h1 id="page-title">A clear path from request to decision.</h1>
      <p class="intro">
        Internal request management with department-scoped approvals and a traceable audit history.
      </p>
      <div class="service-card">
        <div>
          <h2>Development environment</h2>
          <p class="muted">The API health endpoint is the first implemented integration.</p>
        </div>
        <p class="state" :class="connection" aria-live="polite">
          <span class="dot" aria-hidden="true"></span>
          {{ connection === 'checking' ? 'Checking API…' : connection === 'online' ? 'API connected' : 'API unavailable' }}
        </p>
      </div>
      <p class="footnote">Authentication, requests and approval workflows are planned for later milestones.</p>
    </section>
  </main>
</template>
