<script lang="ts">
import { useMutation, useQuery } from "@sveltestack/svelte-query";
import { sendLogout } from "../features/auth/queryFunctions";
import type { PageData } from './$types';
import { createProject } from "../features/projects/queryFunctions";
import { getUser } from "../features/users/queryFunctions";
import { useSelector } from "react-redux";
import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte"
import { selectUserInfo } from "../features/users/userApiSlice";
import type { IMsgRes } from "../types/MsgRes";
import { superForm } from 'sveltekit-superforms/client';

export let data: PageData;

// Client API:
const { form } = superForm(data.form);

const {mutate: createProjectMutation} = useMutation(createProject);
const {mutate: sendLogoutMutation, isLoading: isLogoutLoading, isSuccess: isLogoutSuccess, isError: isLogoutError, error: logoutError } = useMutation(sendLogout);
const {data: userData, isUserSuccess} = useQuery("user", getUser);
console.log(data)

  const onSubmit = async ({ projectName }: FormData) => {
    const isUserDefined = typeof userData?.user._id !== "undefined";

    try {
      if (isUserDefined) {
        await createProject({
          projectName,
          userId: userData?.user._id,
        });
        reset();
      }
    } catch (e) {
      console.log(e);
    }
  };

  // redirects when logout is successful
  $: isLogoutSuccess && () => {window.location.href = '/'}
  </script>


<SuperDebug data={$form}/>
{#if isUserSuccess}
    <header>
      <div>
        <Link to="/dash">
          <h1>Welcome to iziPM</h1>
        </Link>
        <nav>
          <button title="Logout" onClick={sendLogout}>
      <div class="logout icon" />
    </button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
            type="text"
              name="projectName"
              bind:value={$form.projectName}
            />
            {errors?.projectName?.message && (
              <p>{errors.projectName?.message}</p>
            )}
            <button type="submit">Create project</button>
          </form>
        </nav>
      </div>
    </header>
    {:else if isLogoutLoading}
    <p>Logging out...</p>
    {:else if isLogoutError}
    <p>{logoutError?.data?.message}</p>
    {/if}
