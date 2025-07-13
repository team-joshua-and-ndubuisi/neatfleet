import {
  createFileWithDirectories,
  getFullPath,
  updateIndexFile,
  FeatureNamesType,
  generateFeatureNames,
  closeCLI,
  requireNonEmpty,
  askConfirmation,
  askForDirectory,
  showHeader,
  previewCode,
  replaceLastDirectory,
  showMessage,
  addReducerToFile,
} from '../utils';

import { sliceTemplate } from '../templates/sliceTemplate';
import { sliceHookTemplate } from '../templates/hookTemplate';

/**
 * Prompts the user for initial state properties and their types.
 * @returns An array of type properties as strings, e.g., `id: number; name: string;`
 */
const promptForInitialStateProperties = async (): Promise<string[]> => {
  const properties: string[] = [];
  let addMore = true;

  while (addMore) {
    const propName = await requireNonEmpty(
      'Add a field for initial state (e.g., "id"):'
    );

    const propType = await requireNonEmpty(
      `Enter property value for ${propName} (e.g., "true", "false", "0", etc.):`
    );

    properties.push(`${propName}: ${propType},`);

    addMore = await askConfirmation('Would you like to add another field?');
  }

  return properties;
};

/**
 * Generates a Redux slice file for the specified feature and updates the index file.
 * @param location - The directory where the slice file will be saved.
 * @param featureNamesDict - A dictionary of versions of the feature name (e.g., 'posts', 'Posts', 'post', 'Post').
 */
export const generateSlice = async (
  location?: string,
  featureNamesDict?: FeatureNamesType
) => {
  showHeader('Slice Generation');

  // Prompt for location if not provided
  if (!location) {
    location = await askForDirectory(
      'Enter the location directory for the slice definition:'
    );
  }

  // Prompt for feature name if featureNamesDict is not provided
  if (!featureNamesDict) {
    const featureName = await requireNonEmpty(
      'Enter the feature name (e.g., "posts"):'
    );
    featureNamesDict = generateFeatureNames(featureName);
  }

  // Confirm filename
  let filename = `${featureNamesDict.pluralCamel}Slice`;

  const filenameConfirmed = await askConfirmation(
    `Should the filename be ${filename}?`
  );

  if (!filenameConfirmed) {
    filename = await requireNonEmpty('Enter a new filename:');
  }

  // Confirm name property of slice
  let sliceNameProp = `${featureNamesDict.pluralCamel}`;

  const sliceNamePropConfirmed = await askConfirmation(
    `Should the name prop of the slice be ${sliceNameProp}`
  );

  if (!sliceNamePropConfirmed) {
    sliceNameProp = await requireNonEmpty('Enter a new name prop for slice:');
  }

  // prompt for initialState type
  const typeStateConfirm = await askConfirmation(
    'Import type for initialState?'
  );

  // prompt for initialState type name
  let initialStateType: string | false = false;

  if (typeStateConfirm) {
    initialStateType = `${featureNamesDict.PluralPascal}State`;

    const initialStateTypeConfirmed = await askConfirmation(
      `Should the initialState type name be ${initialStateType}?`
    );

    if (!initialStateTypeConfirmed) {
      initialStateType = await requireNonEmpty(
        'Enter the name of the initialState type:'
      );
    }
  }

  // prompt user for initial state types
  const initialStateProperties = await promptForInitialStateProperties();
  const initialStateKeys = initialStateProperties.map(
    (prop) => prop.split(':')[0]
  );
  const initialStateString = initialStateProperties.join('\n  ');

  // Get slice content from the template
  const sliceContent = sliceTemplate(
    filename,
    sliceNameProp,
    initialStateType,
    initialStateString
  );

  // Define the full path for the new slice file
  const filePath = getFullPath(location, `${filename}.ts`);

  // Print generated template
  previewCode(sliceContent);

  // Confirm slice creation
  const confirmSlice = await askConfirmation(
    `Generate a slice for feature '${featureNamesDict.original}' in ${location}?`
  );

  if (!confirmSlice) {
    console.log('Slice generation canceled.');
    closeCLI();
    return;
  }

  // Create the slice file with directories using fileUtils
  createFileWithDirectories(filePath, sliceContent);
  console.log(
    `Slice file for ${featureNamesDict.original} created at ${filePath}`
  );

  // Update the index file in the same directory to include the new slice
  updateIndexFile(location);
  console.log(`Updated index.ts file in ${location}`);

  // prompt the user to confirm reducer inclusion in the store
  const confirmReducerInclusion = await askConfirmation(
    `Include this reducer in the Redux store?`
  );

  if (confirmReducerInclusion) {
    // alter the reducers file in the store dir to import this reducer and add it to the combineReducers function
    const reducersFilePath = getFullPath('src/store', 'reducers.ts');

    addReducerToFile(
      reducersFilePath,
      filename,
      `~/features/${featureNamesDict.original}`
    );

    // log successful change to ~src/store/reducers.ts
    showMessage(`${featureNamesDict.original} reducer added to store.`);
  }

  // prompt for hook creation
  const createHook = await askConfirmation(`Generate hook for ${filename}?`);

  if (createHook) {
    // create hookLocation string
    const hookLocation = replaceLastDirectory(location, 'hooks');

    // prompt user to confirm filename
    let hookFilename = `use${featureNamesDict.PluralPascal}`;

    const confirmHookFilename = await askConfirmation(
      `Should the filename be ${hookFilename}?`
    );

    if (!confirmHookFilename) {
      hookFilename = await requireNonEmpty('Enter the hook filename:');
    }

    const hookContent = sliceHookTemplate(
      hookFilename,
      filename,
      initialStateKeys
    );

    previewCode(hookContent);

    const confirmApi = await askConfirmation(
      `Generate hook '${hookFilename}' in ${hookLocation}?`
    );

    if (!confirmApi) {
      console.log('API generation canceled.');
      closeCLI();
      return;
    }

    const filePath = getFullPath(hookLocation, `${hookFilename}.ts`);

    createFileWithDirectories(filePath, hookContent);

    showMessage(`Hook file ${hookFilename} created at ${filePath}`, 'success');

    updateIndexFile(hookLocation);
    console.log(`Updated index.ts file in ${hookLocation}`);
  }
};

// Check if the module is running directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  (async () => {
    try {
      // Parse CLI arguments for location and feature name, if provided
      const [, , locationArg, featureNameArg] = process.argv;
      const location = locationArg ? locationArg : undefined;
      const featureNamesDict = featureNameArg
        ? generateFeatureNames(featureNameArg)
        : undefined;

      // Run generateSlice with optional prompts for missing arguments
      await generateSlice(location, featureNamesDict);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    } finally {
      closeCLI();
    }
  })();
}
