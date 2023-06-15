<script lang="ts">
import { useMutation, useQuery } from "@sveltestack/svelte-query";
import { sendLogout } from "../features/auth/queryFunctions";
import { createProject } from "../features/projects/queryFunctions";
import { getUser } from "../features/users/queryFunctions";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../features/users/userApiSlice";
import type { IMsgRes } from "../types/MsgRes";
import { superForm } from 'sveltekit-superforms/client';

export let data: PageData;

// Client API:
const { form } = superForm(data.form);

const {mutate: createProjectMutation} = useMutation(createProject);
const {mutate: sendLogoutMutation, isLoading, isSuccess } = useMutation(sendLogout);
const {data} = useQuery("user", getUser);
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

  useEffect(() => {
    if (isLogoutSuccess) navigate("/");
  }, [isLogoutSuccess, navigate]);

  let content;

  if (isLogoutLoading) content = <p>Logging Out...</p>;

  let err = logoutError as IMsgRes;

  if (isLogoutError && err) {
    content = <p>Error: {err?.data?.message}</p>;
  }
  </script>

    <header>
      <div>
        <Link to="/dash">
          <h1>Welcome to iziPM</h1>
        </Link>
        <p>{userData?.user && userData.user.username}</p>
        <nav>
          <button title="Logout" onClick={sendLogout}>
      <div class="logout icon" />
    </button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("projectName", {
                required: "This field is required.",
                minLength: { value: 4, message: "Min length is 4" },
                maxLength: { value: 30, message: "Max length is 30" },
              })}
            />
            {errors?.projectName?.message && (
              <p>{errors.projectName?.message}</p>
            )}
            <button type="submit">Create project</button>
          </form>
        </nav>
      </div>
    </header>
