<script lang="ts">
    function loginHandler(event: SubmitEvent) {
        event.preventDefault();
        console.log("Successfully changed user info");
    }
</script>

<form>
    <label for="name">Name</label><br>
    <input type="text" id="name" name="name" placeholder="Name" ><br>
    <label for="email">Email</label><br>
    <input type="text" id="email" name="email" placeholder="Email"><br>
    <label for="bio">Bio</label><br>
    <input type="text" id="bio" name="bio" placeholder="Bio"><br>
</form>

<style>
    *,
    *::before,
    *::after {
        margin: 0;
        box-sizing: border-box;
    }

    form {
        margin: 1.5rem 5rem;
        padding: 1.5rem;
        max-width: 64rem;
        display: flex;
        flex-direction: column;
        text-align: left;
        background-color: var(--acccent-bg);
    }

    label {
        margin-bottom: 1.5rem;
        font-weight: bold;
    }

    input {
        margin-bottom: 1.5rem;
        width: 100%;
        padding: 1.5rem;
        padding: 1.2rem;
        font-family: Arial, Helvetica, sans-serif;
        border: 2px solid black;
        border-radius: 0.4rem;
        justify-self: left;
    }

    button {
        width: 100%;
        margin-top: 1.5rem;
        padding: 1.5rem;
        font-family: Arial, Helvetica, sans-serif;
        border: 2px solid black;
        border-radius: 0.4rem;
    }
</style>