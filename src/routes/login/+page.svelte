<script lang="ts">
	import { setCredentials } from '../../features/auth/auth';
	import getTokenPayload from '../../util/getTokenPayload';
	import { writable } from "svelte/store";
	import { useMutation } from '@sveltestack/svelte-query';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	// Client API:
	const { form } = superForm(data.form);


  const onSubmit = async ({ email, password }: FormData) => {
    try {
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials(getTokenPayload(accessToken)));
      navigate("/dash");
    } catch (err: any) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
    }
  };
	</script>
	
  if (isLoading) return <p>Loading...</p>;

  return (
    <section>
      <header>
        <h1>Login</h1>
      </header>
      <main>
        <p aria-live="assertive">
          {errors.email?.message || errors.password?.message || errMsg}
        </p>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
					<label for="email">E-mail</label>
					<input type="email" name="email" bind:value={$form.email} />
					
					<label for="password">Password</label>
					<input type="password" name="password" bind:value={$form.password} />

          <button type="submit">Login</button>
          {/* <label htmlFor="persist">
            <input
              type="checkbox"
              id="persist"
              onChange={handleToggle}
              checked={persist}
            />
            Trust This Device
          </label> */}
        </form>



				
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  );

