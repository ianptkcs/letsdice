<script lang="ts">
  import * as Form from '$lib/components/ui/form/index.js';
  import Label from '../ui/label/label.svelte';
  import Input from '../ui/input/input.svelte';

  let { field, value = $bindable(), form, description = '', ...rest } = $props();
</script>

<Form.Field {form} name={field}>
  <div class="space-y-1">
    <Form.Control>
      {#snippet children({ props })}
        <Label for={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
        <Input {...rest} {...props} id={field} bind:value />
      {/snippet}
    </Form.Control>
    {#if description}
      <Form.Description>{description}</Form.Description>
    {/if}
    <Form.FieldErrors />
  </div>
</Form.Field>
