<script lang="ts">
  import '../../app.css';
  import { ModeWatcher } from 'mode-watcher';

  import AppSidebar from '$lib/components/app-sidebar.svelte';
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
  import { Separator } from '$lib/components/ui/separator/index.js';
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import ModeToggle from '$lib/components/mode-toggle.svelte';

  import { page } from '$app/state';

  let { children } = $props();
  let frags = $derived.by(() => {
    const path = () => page.url.pathname.split('/').filter(Boolean);
    return path().map((_, i) => ({
      name: path()
        [i].replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      href:
        '/' +
        path()
          .slice(0, i + 1)
          .join('/'),
    }));
  });
</script>

<ModeWatcher />
<Sidebar.Provider>
  <AppSidebar />
  <Sidebar.Inset>
    <header class="flex h-16 shrink-0 items-center gap-2 border-b">
      <div class="flex items-center w-full justify-between">
        <div class="flex items-center gap-2 px-3">
          <Sidebar.Trigger />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <Breadcrumb.Root>
            <Breadcrumb.List>
              {#each frags as { href, name }, i ([href, name])}
                <Breadcrumb.Item class="hidden md:block">
                  <Breadcrumb.Link {href}>{name}</Breadcrumb.Link>
                </Breadcrumb.Item>
                {#if i < frags.length - 1}
                  <Breadcrumb.Separator />
                {/if}
              {:else}
                <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
              {/each}
            </Breadcrumb.List>
          </Breadcrumb.Root>
        </div>
        <ModeToggle />
      </div>
    </header>
    <main>
      {@render children?.()}
    </main>
  </Sidebar.Inset>
</Sidebar.Provider>
