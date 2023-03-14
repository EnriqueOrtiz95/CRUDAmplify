#MANDATORY APPLY THIS IN ALL YOUR VITE PROJECTS USING AMPLIFY

>>>>>>> in vite.config.js you must to have this config using Amplify:

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
    },
}
})

>>>>>>>> in your index.html below your script add another script with this js code:

<script>
    window.global = window;
    window.process = {
        env: { DEBUG: undefined },
    };
    var exports = {};
</script>
