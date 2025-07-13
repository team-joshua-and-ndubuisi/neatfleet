export const sliceTemplate = (
  filename: string,
  sliceNameProp: string,
  initialStateType?: string | false,
  initialStateString?: string
): string => {
  return `import { createSlice, PayloadAction } from '@reduxjs/toolkit';
${
  initialStateType ? `import type { ${initialStateType} } from '../types';` : ''
}

${
  initialStateType
    ? `const initialState: ${initialStateType} = {
  // Define initial state structure here
  ${initialStateString}
};`
    : `const initialState = {
  // Define initial state structure here
  ${initialStateString}
};`
}

const ${filename} = createSlice({
  name: '${sliceNameProp}',
  initialState,
  reducers: {
    // Define reducers here
    exampleReducer: (state, action: PayloadAction<any>) => {
      // Example reducer logic here
    },
  },
});

// Export actions as named exports
export const { exampleReducer } = ${filename}.actions;

// Export reducer as default export
export default ${filename}.reducer;
`;
};
