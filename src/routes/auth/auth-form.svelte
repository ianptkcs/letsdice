<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js';
  import * as Form from '$lib/components/ui/form/index.js';
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { formSchema, type FormSchema } from './schema';
  import FormField from '$lib/components/general/form-field.svelte';

  let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } = $props();

  const form = superForm(data.form, {
    validators: zodClient(formSchema),
  });

  const { form: formData, enhance } = form;

  import { page } from '$app/state';
  import { Method } from '$lib/enums/method';
  import Separator from '@/components/ui/separator/separator.svelte';
  let tab = $state((page.url.searchParams.get('tab') as Method) || Method.SIGNIN);

  const capitalize = (str: string): string =>
    ['in', 'up']
      .filter((sfx) => str.endsWith(sfx))
      .reduce(
        (_, sfx) =>
          str.charAt(0).toUpperCase() + str.slice(1, -sfx.length) + ' ' + sfx.charAt(0).toUpperCase() + sfx.slice(1),
        str,
      );
</script>

{#snippet tabForm(tab: Method, description: string)}
  <Tabs.Content value={tab}>
    <Card.Root>
      <Card.Header>
        <Card.Title>{capitalize(tab)}</Card.Title>
        <Card.Description>{description}</Card.Description>
      </Card.Header>

      <!-- Tab Form -->
      <form method="POST" use:enhance action="?/{tab}">
        <Card.Content>
          <!-- Email and Password Fields -->
          <FormField {form} field="email" value={$formData.email} placeholder="example@email.com" />
          <FormField {form} field="password" value={$formData.password} placeholder="********" />
        </Card.Content>
        <Card.Footer class="flex flex-col justify-center">
          <Form.Button class="w-4/5">{capitalize(tab)}</Form.Button>
        </Card.Footer>
      </form>
    </Card.Root>
  </Tabs.Content>
{/snippet}

<Tabs.Root value={tab} onValueChange={(value) => (tab = value as Method)} class="w-1/2">
  <Tabs.List class="grid w-full grid-cols-2">
    <Tabs.Trigger value={Method.SIGNIN}>{capitalize(Method.SIGNIN)}</Tabs.Trigger>
    <Tabs.Trigger value={Method.SIGNUP}>{capitalize(Method.SIGNUP)}</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value={Method.SIGNIN}>
    {@render tabForm(tab, 'Sign in to your account')}
  </Tabs.Content>
  <Tabs.Content value={Method.SIGNUP}>
    {@render tabForm(tab, 'Sign up and start playing!')}
  </Tabs.Content>
</Tabs.Root>
