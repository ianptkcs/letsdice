import type { PageServerLoad, Actions } from './$types.js';
import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema.js';
import { zod } from 'sveltekit-superforms/adapters';
import { Method } from '$lib/enums/method.js';

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(formSchema)),
  };
};

const authAction = async (method: Method, event: any) => {
  const form = await superValidate(event, zod(formSchema));
  if (!form.valid) {
    return fail(400, {
      form,
    });
  }

  const { supabase } = event.locals;

  const { error } = await (method === Method.SIGNUP
    ? supabase.auth.signUp(form.data)
    : supabase.auth.signInWithPassword(form.data));

  if (error) {
    $inspect(error);
    return setError(form, 'password', error.message);
  }

  return redirect(303, '/');
};

export const actions = {
  signup: (event) => authAction(Method.SIGNUP, event),
  signin: (event) => authAction(Method.SIGNIN, event),
} satisfies Actions;
