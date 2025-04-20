<script lang="ts">
    import "../app.css";
    import { ModeWatcher } from "mode-watcher";

    import AppSidebar from "$lib/components/app-sidebar.svelte";
    import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
    import { Separator } from "$lib/components/ui/separator/index.js";
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import ModeToggle from "$lib/components/mode-toggle.svelte";
    let { children } = $props();
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
                            <Breadcrumb.Item class="hidden md:block">
                                <Breadcrumb.Link href="#"
                                    >Building Your Application</Breadcrumb.Link
                                >
                            </Breadcrumb.Item>
                            <Breadcrumb.Separator class="hidden md:block" />
                            <Breadcrumb.Item>
                                <Breadcrumb.Page>Data Fetching</Breadcrumb.Page>
                            </Breadcrumb.Item>
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
