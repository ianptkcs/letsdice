<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import type { Item } from '$lib/interfaces/item';
  import GalleryVerticalEnd from '@lucide/svelte/icons/gallery-vertical-end';
  import type { ComponentProps } from 'svelte';

  let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

  interface navItem extends Item {
    items?: navItem[];
  }

  const navMain: navItem[] = [
    {
      label: 'Table',
      value: 'table',
      items: [
        {
          label: 'Search',
          value: 'search',
        },
        {
          label: 'Create',
          value: 'create',
        },
      ],
    },
    {
      label: 'User',
      value: 'user',
      items: [
        {
          label: 'Profile',
          value: 'profile',
        },
        {
          label: 'History',
          value: 'History',
        },
        {
          label: 'Search',
          value: 'search',
        },
      ],
    },
  ];
</script>

<Sidebar.Root bind:ref {...restProps}>
  <Sidebar.Header>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton size="lg">
          {#snippet child({ props })}
            <a href="##" {...props}>
              <div
                class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
              >
                <GalleryVerticalEnd class="size-4" />
              </div>
              <div class="flex flex-col gap-0.5 leading-none">
                <span class="font-semibold">Documentation</span>
                <span class="">v1.0.0</span>
              </div>
            </a>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Header>
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.Menu>
        {#each navMain as groupItem (groupItem.label)}
          <Sidebar.MenuItem>
            <Sidebar.MenuButton class="font-medium">
              {#snippet child({ props })}
                <a href={groupItem.value} {...props}>
                  {groupItem.label}
                </a>
              {/snippet}
            </Sidebar.MenuButton>
            {#if groupItem.items?.length}
              <Sidebar.MenuSub>
                {#each groupItem.items as item (item.label)}
                  <Sidebar.MenuSubItem>
                    <Sidebar.MenuSubButton>
                      {#snippet child({ props })}
                        <a href={item.value} {...props}>{item.label}</a>
                      {/snippet}
                    </Sidebar.MenuSubButton>
                  </Sidebar.MenuSubItem>
                {/each}
              </Sidebar.MenuSub>
            {/if}
          </Sidebar.MenuItem>
        {/each}
      </Sidebar.Menu>
    </Sidebar.Group>
  </Sidebar.Content>
  <Sidebar.Rail />
</Sidebar.Root>
