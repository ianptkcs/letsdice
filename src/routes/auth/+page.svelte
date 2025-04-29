<script lang="ts">
  import type { PageData } from './$types.js';
  import AuthForm from './auth-form.svelte';
  let { data }: { data: PageData } = $props();
</script>

<div class="grid grid-cols-2 gap-2 h-[100dvh]">
  <div class="flex flex-col gap-10 items-center justify-center">
    <a class="flex gap-1 items-center -mt-24" data-sveltekit-preload-data="hover" href="/">
      <img src="/logo.png" alt="logo" class="dark:invert w-16 aspect-square" />
      <span class="text-3xl">Let's Dice</span>
    </a>
    <AuthForm {data} />
  </div>
  <div class="bg-[url(/background.jpg)] bg-no-repeat bg-cover bg-center"></div>
</div>
