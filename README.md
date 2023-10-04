This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


# Batavia Coordinator

## **Dependencies**

Batavia coordinator depends on [al-entities](https://github.com/gonzales-jorge-siul/al-entities). It's included in this repository as a **subtree dependency**.

No aditional steps have to be done to clone this repository. But if the subtree folder is modified (inside or outside this repository) or if it's required to change the branch or refer to another branch or tag, follow the next steps

### **Previous**
Add the repository remote link, the name of the origin-name must follow `lib-[repository-name]`, in this case `lib-entities`
```sh
coordinator$ git remote add -f lib-entities git@github.com:gonzales-jorge-siul/al-entities.git
```

### **Add subtree**
To add a subtree folder use the following command:
```sh
coordinator$ git subtree add --prefix [subfolder-path] [origin-name] [branch] --squash
```

Where:
- subfolder-path: is the of the subfolder and should not include `'./'`, in this case: `entities`
- origin-name: the name of the origin added in previous step, in this case `lib-entities`
- branch: the branch to be cloned, in this case `main`
- The `--squash` flag avoid to copy the entiry git history

Example:

```sh
coordinator$ git subtree add --prefix entities lib-entities main --squash
```

### **Push subtree changes**
If a file inside of the subtree folder is modify, use the following command to push the changes into the subtree repository

```sh
coordinator$ git subtree push --prefix [subfolder-path] [origin-name] [branch]
```

Where:
- subfolder-path: is the of the subfolder and should not include `'./'`, in this case: `entities`
- origin-name: the name of the origin added in previous step, in this case `lib-entities`
- branch: the branch where to push changes, in this case `main`

Before push changes the normal flow should be executed it means add changes to stage area and commit changes. The following example show a common case to do so. **Pay attention to the folder from where commands are executed**.

```sh
coordinator$ cd entities/
entities$ git add .
entities$ git commit -m "Some comment"
entities$ cd ../
coordinator$ git subtree push --prefix entities lib-entities main
```

### **Pull subtree changes**
If changes were made to the librarie repositorie use the following command:

```sh
coordinator$ git subtree pull --prefix [subfolder-path] [origin-name] [branch] --squash
```

Where:
- subfolder-path: is the of the subfolder and should not include `'./'`, in this case: `entities`
- origin-name: the name of the origin added in previous step, in this case `lib-entities`
- branch: the branch where to push changes, in this case `main`
- The `--squash` flag avoid to copy the entiry git history

Example:

```sh
coordinator$ git subtree pull --prefix entities lib-entities main --squash
```