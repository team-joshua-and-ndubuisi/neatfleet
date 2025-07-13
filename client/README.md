# Frontend Project Template

## About This Template

This is a scalable, feature-based frontend template for React applications, designed with TypeScript, Redux, axios, and react-query, with a bonus 'scaffolder' app which automates the generation of new features.

## Table of Contents

- [Getting Started](#getting-started)
- [Architecture Overview](#architecture-overview)
- [Scaffolder](#scaffolder)

### Additional Documentation

For more details about the development setup and Vite-specific configurations, see the [React + TypeScript + Vite](#react--typescript--vite) section.

### Key Features

- Modular structure for features and shared components.
- State management using Redux.
- API interaction and caching with axios and react-query.
- Lazy loading with React Router.
- Automated feature generation with Scaffolder

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start mocked server:

   ```bash
   npm run server
   ```

3. Start dev server:

   ```bash
   npm run dev
   ```

## Architecture Overview

- Static Data: Stored in the data directory for constants and hardcoded information.
- Mutable State: Managed with Redux in the store directory, allowing for scalable state management.
- Persistent Data: Handled via API calls (using axios) and caching (with react-query) for backend data that persists across sessions. The database is mocked using the [json-server](https://www.npmjs.com/package/json-server) package (see db.json file).

### Project Structure

Here's an overview of the project structure:

```bash
src/
├── App.tsx
├── api
│   ├── axios.ts
│   └── index.ts
├── components
│   ├── ErrorComponent.tsx
│   ├── LoadingIndicator.tsx
│   ├── NavBar.tsx
│   └── index.ts
├── data
│   ├── index.ts
│   ├── navItems.ts
│   └── texts.ts
├── features
│   ├── counter
│   └── users
├── layouts
│   ├── MainLayout.tsx
│   └── index.ts
├── main.tsx
├── pages
│   ├── AboutPage.tsx
│   ├── ContactPage.tsx
│   ├── HomePage.tsx
│   ├── LoadingPage.tsx
│   └── NotFoundPage.tsx
├── routes
│   ├── index.ts
│   └── routes.tsx
├── store
│   ├── hooks.ts
│   ├── index.ts
│   ├── reducers.ts
│   └── store.ts
├── theme
│   ├── index.ts
│   └── theme.ts
├── types
│   ├── index.ts
│   └── navItemTypes.ts
└── vite-env.d.ts
```

Each directory has a specific responsibility and most have an index file for [barrel exporting](https://4markdown.com/everything-about-barrel-exports-in-javascript/). The components, hooks, and types directories are meant to hold modules that will be used throughout the app by other features and therefore, have a more 'global' position in the architecture.

Here are the directory structures for the template features (Counter and Users):

```bash
src/features/counter/
├── components
├── hooks
│   ├── index.ts
│   └── useCounter.ts
├── index.ts
├── slices
│   ├── counterSlice.ts
│   └── index.ts
└── types
    ├── counterStateTypes.ts
    └── index.ts
```

```bash
src/features/users/
├── api
│   ├── index.ts
│   └── usersApi.ts
├── components
│   ├── User.tsx
│   ├── UserList.tsx
│   └── index.ts
├── hooks
│   ├── index.ts
│   └── useUsers.ts
├── index.ts
└── types
    ├── index.ts
    └── userTypes.ts
```

Each feature is a quasi-microcosm of the src directory, with its own types, api, slices, hooks, and components - all of which are optional based on the specifics of the feature.

Such a structure, as well organized as it might be, comes with a cost: every new feature desired comes with a tremendous overhead for setting up the directory structure. Wouldn't it be nice to have a way to automate the creation of these detailed and tedious to implement structures?

## Scaffolder

This template comes with an app for generating code. Outside the src directory, in the root directory is another directory: scaffolder. Here is the directory structure:

```bash
scaffolder/
├── generateFeature.ts
├── scripts
│   ├── generateApi.ts
│   ├── generateComponent.ts
│   ├── generateHooks.ts
│   ├── generateSlice.ts
│   ├── generateTypes.ts
│   └── index.ts
├── templates
│   ├── apiTemplate.ts
│   ├── componentTemplate.ts
│   ├── hookTemplate.ts
│   ├── index.ts
│   ├── sliceTemplate.ts
│   └── typesTemplate.ts
└── utils
    ├── cliUtils.ts
    ├── featureNameUtils.ts
    ├── fileUtils.ts
    ├── index.ts
    ├── indexUtils.ts
    └── stringUtils.ts
```

There are several scripts which can be run to generate different modules of a feature or the entire feature itself:

```bash
npm run generate:feature
```

```bash
npm run generate:hook
```

```bash
npm run generate:api
```

```bash
npm run generate:slice
```

```bash
npm run generate:type
```

```bash
npm run generate:component
```

Each script will start a CLI with prompts asking for details about the feature to be generated.

### Feature Generation Example

Here is an example of a typical use case for the scaffolder. Start by running this terminal command from the root directory:

```bash
npm run generate:component
```

You will be prompted to name the feature. The mocked database (db.json) has an array of users and posts. The users data is already demonstrated in the template so we'll use the posts data. Type in 'posts' in the response to the prompt.

#### Generating Types

Next you will be asked a series of yes/no questions about which modules will be needed for this feature. Respond with yes to all four (type, API, slice, and components). You can just hit enter for yes. After confirming which modules will be needed, a new directory will be created in the features directory named whatever we typed in earlier (in our case, 'posts').

Next, the type generation will begin. You will be prompted to confirm the filename for the types. Can can type 'n' for no and enter in a custom filename but the generated one ('postTypes.ts') is what we want. Press enter to confirm.

Next you will be prompted for the interface name. Notice that again, the feature name was used to generate the name. Press enter again to confirm.

Next we need to enter the fields for our type. For this we should look at the posts data in our mocked database:

```json
"posts": [
    {
      "id": "1",
      "title": "Scaffolder is the GOAT 🐐",
      "content": "Just tried out...",
      "user": "CodeLover99"
    },
    {
      "id": "2",
      "title": "Another bloated tool 🙄",
      "content": "Scaffolder? More like ...",
      "user": "GrumpyDev42"
    }
  ]
```

Each post has an id, title, content, and user, all of which are strings. So we'll enter 'id' for our first field, enter 'string' for the type, and then hit enter to add another field. Do the same for title, content and user, then type 'n' when prompted for another field.

The next prompt will ask about including a state interface. This will be used for the type of our slice's initial state. Hit enter to confirm and again to confirm the interface name. We are going to use the slice to hide/display the posts. When prompted for the field, type 'arePostsDisplayed' and set that to a boolean. Then type 'n' to finish. A print out of the code that will be generated will be displayed. Hit enter to confirm.

```ts
export interface PostType {
  id: string;
  title: string;
  content: string;
  user: string;
}

export interface PostsState {
  arePostsDisplayed: boolean;
}
```

Before moving on, take a look in the src/features/posts directory. Notice that not only was our types file was created, but we also have an index file which barrel exports the types from this directory. This makes import this code much cleaner and consistent. If we are to add types in the future with the generate:type script, this index file will be updated automatically.

```ts
export * from './postTypes';
```

#### Generating API

Next we will begin the API generator. Press enter to confirm the filename for the API. You will be prompted to include 5 different API functions (fetch, fetch by id, create, update, delete). Press enter for each.

You will again be prompted to confirm the code generated:

```ts
import { axiosInstance } from '~/api';
import type { PostType } from '../types';

const url = '/posts';

export const fetchPosts = async (): Promise<PostType[]> => {
  const response = await axiosInstance.get(url);
  return response.data;
};

export const fetchPostById = async (id: string): Promise<PostType | null> => {
  const response = await axiosInstance.get(`${url}/${id}`);
  return response.data;
};

export const createPost = async (
  newPost: Omit<PostType, 'id'>
): Promise<PostType> => {
  const response = await axiosInstance.post(url, newPost);
  return response.data;
};

export const updatePost = async (updatedPost: PostType): Promise<PostType> => {
  const response = await axiosInstance.put(
    `${url}/${updatedPost.id}`,
    updatedPost
  );
  return response.data;
};

export const deletePost = async (id: string): Promise<void> => {
  await axiosInstance.delete(`${url}/${id}`);
};
```

Again, after the file is created an index file is used for barrel exporting:

```ts
export * from './postsApi';
```

After this, you are prompted for hooks associated with each API function. Press enter for each prompt and confirmation.

```ts
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../api/postsApi';

export const useFetchPosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
};
```

```ts
import { useQuery } from '@tanstack/react-query';
import { fetchPostById } from '../api/postsApi';

export const useFetchPostById = (id: string) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id),
  });
};
```

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../api/postsApi';

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
```

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePost } from '../api/postsApi';

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
```

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '../api/postsApi';

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
```

And again, an index file for barrel exporting is generated:

```ts
export * from './useCreatePost';
export * from './useDeletePost';
export * from './useFetchPostById';
export * from './useFetchPosts';
export * from './useUpdatePost';
```

#### Generating a Slice

The slice generation script will start next. Confirm the filename and name prop as in prior prompts. When it asks for a type for the initial state, we are going to use the one we created in our types file: PostsState. The only field will be 'arePostsDisplayed' and we'll set the value to false. Type 'n' to finish adding fields and confirm the output code:

```ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PostsState } from '../types';

const initialState: PostsState = {
  // Define initial state structure here
  arePostsDisplayed: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Define reducers here
    exampleReducer: (state, action: PayloadAction<any>) => {
      // Example reducer logic here
    },
  },
});

// Export actions as named exports
export const { exampleReducer } = postsSlice.actions;

// Export reducer as default export
export default postsSlice.reducer;
```

Notice that the boilerplate code is incomplete. We'll need to add our reducers and export the actions.

The next prompt will ask about including this slice in the Redux store. Press enter to say yes. This is the only time Scaffolder will alter code outside of the feature directory. Our store will now include our new slice:

```ts
import { combineReducers } from '@reduxjs/toolkit';
import { counterSlice } from '~/features/counter';
import { postsSlice } from '~/features/posts';

export const reducers = combineReducers({
  counterSlice: counterSlice,
  postsSlice: postsSlice,
});
```

And just like with our API, we will need a custom hook for our slice. This time, however, we will rename it rather than use the generated filename. Type 'n' when prompted for the filename 'usePosts' and instead type in 'useDisplayPosts'. Like with our slice, this generated hook will need some work but the boilerplate got us started:

```ts
import { useAppSelector, useAppDispatch } from '~/store';
import /* actions from slice */ '../slices';

export const useDisplayPosts = () => {
  const appDispatch = useAppDispatch();
  const arePostsDisplayed = useAppSelector(
    (state) => state.postsSlice.arePostsDisplayed
  );
  const func = () => appDispatch(/* action() */);

  return {
    arePostsDisplayed,
    func,
  };
};
```

Type enter to confirm. Notice our index file has been updated:

```ts
export * from './useCreatePost';
export * from './useDeletePost';
export * from './useDisplayPosts';
export * from './useFetchPostById';
export * from './useFetchPosts';
export * from './useUpdatePost';
```

#### Generating Components

Before we start generating components, let's plan the structure of our feature. For `posts`, we need:

1. **Post Component**: Represents a single post.
2. **PostsContainer Component**: A container displaying multiple `Post` components.
3. **Posts Component**: An outer wrapper for additional features (e.g., header, layout).

Before we start generating components, let's take a moment and think about the structure of what we are creating. We'll need a component for an individual post, a container for the posts, and an outer wrapped so we can include a header. Later we will alter some of these components when we implement the hide/display state.

Let's change the name of our first component to 'Post'. We will include a single prop, 'post', and the type will be our PostType we generated earlier. We then need to import this type. This component will not use a hook. Confirm the generated code:

```tsx
import React from 'react';

import type { PostType } from '../types';

interface PostProps {
  post?: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div>
      <p>Post works!</p>
    </div>
  );
};

export default Post;
```

Here again, we will need to do some work to get this code just right.

Let's generate another component, 'PostsContainer'. It will not need any props but it will use the PostType type. We also will use a hook, useFetchPosts. Confirm the code generated:

```tsx
import React from 'react';
import { useFetchPosts } from '../hooks';
import type { PostType } from '../types';

const PostsContainer: React.FC = () => {
  const fetchposts = useFetchPosts();

  return (
    <div>
      <p>PostsContainer works!</p>
    </div>
  );
};

export default PostsContainer;
```

Lastly, we'll generate a 'Posts' component to wrap the 'PostsContainer' and a heading. This component will not need props, types, or hooks.

#### Alterations

Before we go through and alter the generated code, let's make sure our posts directory is correct:

```bash
src/features/posts/
├── api
│   ├── index.ts
│   └── postsApi.ts
├── components
│   ├── Post.tsx
│   ├── PostsContainer.tsx
│   └── index.ts
├── hooks
│   ├── index.ts
│   ├── useCreatePost.ts
│   ├── useDeletePost.ts
│   ├── useDisplayPosts.ts
│   ├── useFetchPostById.ts
│   ├── useFetchPosts.ts
│   └── useUpdatePost.ts
├── index.ts
├── slices
│   ├── index.ts
│   └── postsSlice.ts
└── types
    ├── index.ts
    └── postTypes.ts
```

We'll start with the individual Post component. We'll change the imports to include some pre-built components from the Material UI library (should already be installed):

```tsx
import React from 'react';
import type { PostType } from '../types';
import { Card, Stack, Typography } from '@mui/material';
```

Then we'll use those MUI components to display some of the post's details (we also made the prop mandatory):

```tsx
interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <Card sx={{ px: 4, py: 3 }}>
      <Stack direction='column' gap={2}>
        <Typography variant='h5'>{post.title}</Typography>
        <Typography variant='h6'>{post.user}</Typography>
        <Typography variant='body1'>{post.content}</Typography>
      </Stack>
    </Card>
  );
};

export default Post;
```

Next let's work on the PostsContainer component. Change the imports to include a Stack component from MUI, the Post component we just worked on, and a couple components from our template for loading and errors:

```tsx
import React from 'react';
import { useFetchPosts } from '../hooks';
import type { PostType } from '../types';
import { Stack } from '@mui/material';
import Post from './Post';
import { ErrorComponent, LoadingIndicator } from '~/components';
```

We will destructure the useFetchPosts hook, check for isLoading or error, and if the posts data is there, map over them creating individual Post components:

```tsx
const PostsContainer: React.FC = () => {
  const { data: posts, isLoading, error } = useFetchPosts();

  if (isLoading) return <LoadingIndicator />;
  if (error) return <ErrorComponent />;

  return (
    <Stack direction='column' gap={2}>
      {posts?.map((post: PostType) => (
        <Post key={post.id} post={post} />
      ))}
    </Stack>
  );
};

export default PostsContainer;
```

Next we'll import components from MUI and our PostsContainer:

```tsx
import { Stack, Typography } from '@mui/material';
import React from 'react';
import PostsContainer from './PostsContainer';

const Posts: React.FC = () => {
  return (
    <Stack direction='column' gap={2} mt={4}>
      <Typography variant='h4'>Posts</Typography>
      <PostsContainer />
    </Stack>
  );
};

export default Posts;
```

And finally, we will import our Posts component to the About page:

```tsx
import React from 'react';
import { Typography, Container } from '@mui/material';
import { texts } from '~/data';
import { Posts } from '~/features/posts';

const AboutPage: React.FC = () => {
  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant='h4' mb={2}>
        About this template...
      </Typography>
      <Typography variant='body1'>{texts.about}</Typography>
      <Posts />
    </Container>
  );
};

export default AboutPage;
```

Our posts should now be displayed.

But we want to be able to hide and show the posts. And it would also be good to be able to delete posts (since clearly they're not always nice). Let's start by finishing the slice that was generated:

```ts
import { createSlice } from '@reduxjs/toolkit';
import type { PostsState } from '../types';

const initialState: PostsState = {
  arePostsDisplayed: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    displayPosts: (state) => {
      state.arePostsDisplayed = true;
    },
    hidePosts: (state) => {
      state.arePostsDisplayed = false;
    },
  },
});

export const { displayPosts, hidePosts } = postsSlice.actions;

export default postsSlice.reducer;
```

And now we'll adjust the useDisplayPosts hook:

```ts
import { useAppSelector, useAppDispatch } from '~/store';
import { displayPosts, hidePosts } from '../slices';

export const useDisplayPosts = () => {
  const appDispatch = useAppDispatch();
  const arePostsDisplayed = useAppSelector(
    (state) => state.postsSlice.arePostsDisplayed
  );
  const hide = () => appDispatch(hidePosts());
  const display = () => appDispatch(displayPosts());

  return {
    arePostsDisplayed,
    hidePosts: hide,
    displayPosts: display,
  };
};
```

Now we'll add a button from MUI to our AboutPage and import the useDisplayPosts hook so we can toggle the display of the posts:

```tsx
import { Button, Typography, Container } from '@mui/material';
import { texts } from '~/data';
import { Posts, useDisplayPosts } from '~/features/posts';

function AboutPage() {
  const { arePostsDisplayed, displayPosts, hidePosts } = useDisplayPosts();

  const handleDisplayPostsClick = () =>
    arePostsDisplayed ? hidePosts() : displayPosts();

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant='h4' mb={2}>
        About this template...
      </Typography>
      <Typography variant='body1'>{texts.about}</Typography>
      <Button onClick={handleDisplayPostsClick}>
        {arePostsDisplayed ? 'Hide ' : 'Show '}Posts
      </Button>
      {arePostsDisplayed && <Posts />}
    </Container>
  );
}

export default AboutPage;
```

Lastly, let's alter our Post component so we can delete it. We'll import some MUI components and icons as well as our useDeletePost hook:

```tsx
import React from 'react';
import type { PostType } from '../types';
import { Card, IconButton, Stack, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDeletePost } from '../hooks';

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const { mutate: deletePost } = useDeletePost();

  return (
    <Card sx={{ px: 4, py: 3 }}>
      <Stack direction='column' gap={2}>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='h5'>{post.title}</Typography>
          <IconButton onClick={() => deletePost(post.id)}>
            <DeleteForeverIcon color='warning' />
          </IconButton>
        </Stack>
        <Typography variant='h6'>{post.user}</Typography>
        <Typography variant='body1'>{post.content}</Typography>
      </Stack>
    </Card>
  );
};

export default Post;
```

Now we can delete that second post (because it's so mean).

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```
