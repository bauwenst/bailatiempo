# BailaTiempo
*BailaTiempo* is a web app with timers that track each genre played at a dance social so far, so that the DJ can balance the genres better.

## How this was made
### Step 1: ChatGPT Canvas
I asked ChatGPT to design me a web app with the basic features I wanted. I then iterated on it for several nights (because of quota) until all the bugs were ironed out.

### Step 2: Node, React, Tailwind
ChatGPT Canvas writes and edits a JavaScript code file, even though it can visualise it as HTML with special CSS classes. The secret is that it loads Tailwind CSS to have a kit of styles readily available to it.

I used [this tutorial](https://github.com/gitname/react-gh-pages/tree/master?tab=readme-ov-file#tutorial) to create my app. In short:
1. One-time install: get `node` and `npm`. I did it with an installer and also had to change Powershell's execution policy to `RemoteSigned` to get `npm` to work.
2. Create fully empty repo on GitHub. No `README`, no `LICENSE`, no `.gitignore`. The name of this repo will be the path where GitHub deploys the app. Unfortunately, that means you can't deploy to a subpath, since you can't have slashes in repo names.
3. Run `npx create-react-app bailatiempo` and `cd bailatiempo`. You now have a Node app that is also a Git repo.
4. Run `npm install gh-pages --save-dev`. This adds GitHub Pages support.
5. Run `npm install -D tailwindcss@3 postcss autoprefixer`. This adds a [working](https://github.com/tailwindlabs/tailwindcss/issues/15942#issuecomment-2694611579) version of Tailwind CSS.
6. Run `npx tailwindcss init -p`. This generates Tailwind's configuration files.
7. In `tailwind.config.json`, add `"./index.html", "./src/**/*.{js,ts,jsx,tsx}"` to the `"content"` list. Why? Because ChatGPT told me when I asked how to recreate Canvas locally.
8. In `src/index.css`, paste over the existing content with
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body, #root {
    width: 100%;
    height: 100%;
    margin: 0;
    overflow: hidden;
}
```
9. In `package.json`, add the top-level field `"homepage": "https://bauwenst.github.io/bailatiempo"` and add the two scripts `"predeploy": "npm run build"` and `"deploy": "gh-pages -d build"`. **Note:** It is not this `homepage` field that determines where you will deploy. It is merely you telling the build system where it should assume deployment for constructing paths. GitHub determines the path you publish to and it will always be `/reponame`.
10. Run `git remote add origin https://bauwenst@github.com/bauwenst/bailatiempo.git`. This primes the auto-pusher to GitHub Pages.

All that remained was to copy ChatGPT's code into `src/App.jsx` (the `x` is because React embeds raw HTML into the JavaScript, which is eXtended syntax).

### Step 3: Deployment to GitHub
You can test your app locally with `npm run start`.

Running `npm run deploy` will build the app (this will take a while), push the resulting artifacts to `gh-pages`, and then GitHub will make it available at its URL.
When you `git commit` anything yourself, that happens to the `master` branch.

## Origin of the name
In Spanish, *baila!* means "dance!" and *tiempo* means "time", so BailaTiempo is how someone who does not speak Spanish could translate "dance time" (as in "it's time to dance", but also "the time that has been danced"). (In reality, it would be something like *duración del baile*, but I digress.) 

It's also a play on the phrase *a tiempo* which means "on time" in common parlance, and in dancing means "starting on 1", which is how casino, LA salsa, bachata and kizomba are all danced.
