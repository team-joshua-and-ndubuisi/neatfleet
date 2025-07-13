import {
  closeCLI,
  createFileWithDirectories,
  getFullPath,
  updateIndexFile,
  FeatureNamesType,
  generateFeatureNames,
  requireNonEmpty,
  askConfirmation,
  showHeader,
  replaceLastDirectory,
  showMessage,
  previewCode,
} from '../utils';

import {
  apiTemplate,
  fetchAllHookTemplate,
  fetchOneHookTemplate,
  createHookTemplate,
  updateHookTemplate,
  deleteHookTemplate,
} from '../templates';

/**
 * Prompts the user to choose which CRUD operations to include in the API.
 * @returns An object with boolean values indicating which operations to include.
 */
const promptForApiOptions = async (
  featureNamesDict: FeatureNamesType
): Promise<{
  includeGetAll: boolean;
  includeGetOne: boolean;
  includeCreate: boolean;
  includeUpdate: boolean;
  includeDelete: boolean;
}> => {
  const includeGetAll = await askConfirmation(
    `Include fetch${featureNamesDict.PluralPascal} function?`
  );
  const includeGetOne = await askConfirmation(
    `Include fetch${featureNamesDict.SingularPascal}ById function?`
  );
  const includeCreate = await askConfirmation(
    `Include create${featureNamesDict.SingularPascal} function?`
  );
  const includeUpdate = await askConfirmation(
    `Include update${featureNamesDict.SingularPascal} function?`
  );
  const includeDelete = await askConfirmation(
    `Include delete${featureNamesDict.SingularPascal} function?`
  );

  return {
    includeGetAll,
    includeGetOne,
    includeCreate,
    includeUpdate,
    includeDelete,
  };
};

/**
 * Generates an API file for the specified feature and updates the index file.
 * @param location - The directory where the API file will be saved.
 * @param featureNamesDict - A dictionary of versions of the feature name.
 * @param apiOptions - The selected CRUD operations to include in the API.
 */
export const generateApi = async (
  location?: string,
  featureNamesDict?: FeatureNamesType,
  apiOptions?: {
    includeGetAll: boolean;
    includeGetOne: boolean;
    includeCreate: boolean;
    includeUpdate: boolean;
    includeDelete: boolean;
  }
) => {
  showHeader('API Generation');

  // Prompt for location if not provided
  if (!location) {
    location = await requireNonEmpty(
      'Enter the location directory for the API file:'
    );
  }

  // Prompt for feature name if featureNamesDict is not provided
  if (!featureNamesDict) {
    const featureName = await requireNonEmpty(
      'Enter the feature name (e.g., "posts"):'
    );
    featureNamesDict = generateFeatureNames(featureName);
  }

  let filename = `${featureNamesDict.pluralCamel}Api.ts`;

  // Confirm filename
  const filenameConfirmed = await askConfirmation(
    `Should the filename be ${filename}?`
  );

  if (!filenameConfirmed) {
    filename = await requireNonEmpty('Enter a new filename:');
  }

  // Prompt for API options if not provided
  if (!apiOptions) {
    apiOptions = await promptForApiOptions(featureNamesDict);
  }

  // Generate API content from the template
  const apiContent = apiTemplate(featureNamesDict, apiOptions);

  // Print generated template
  previewCode(apiContent);

  // Confirm API file creation
  const confirmApi = await askConfirmation(
    `Generate API for feature '${featureNamesDict.original}' in ${location}?`
  );

  if (!confirmApi) {
    console.log('API generation canceled.');
    closeCLI();
    return;
  }

  // Define the full path for the new API file
  const filePath = getFullPath(location, filename);

  // Create the file and ensure its directory exists using fileUtils
  createFileWithDirectories(filePath, apiContent);
  console.log(
    `API file for ${featureNamesDict.original} created at ${filePath}`
  );

  // Update the index file in the same directory to include the new API file
  updateIndexFile(location);
  console.log(`Updated index.ts file in ${location}`);

  // api function to hook template dictionary
  const apiHookDict = {
    includeGetAll: {
      filename: `useFetch${featureNamesDict.PluralPascal}.ts`,
      template: fetchAllHookTemplate,
    },
    includeGetOne: {
      filename: `useFetch${featureNamesDict.SingularPascal}ById.ts`,
      template: fetchOneHookTemplate,
    },
    includeCreate: {
      filename: `useCreate${featureNamesDict.SingularPascal}.ts`,
      template: createHookTemplate,
    },
    includeUpdate: {
      filename: `useUpdate${featureNamesDict.SingularPascal}.ts`,
      template: updateHookTemplate,
    },
    includeDelete: {
      filename: `useDelete${featureNamesDict.SingularPascal}.ts`,
      template: deleteHookTemplate,
    },
  };

  // location for hooks
  const hookLocation = replaceLastDirectory(location, 'hooks');

  for (const [apiFunc, shouldInclude] of Object.entries(apiOptions)) {
    if (shouldInclude) {
      // generate filename
      const filename = apiHookDict[apiFunc].filename;

      // prompt user to confirm filename
      const createHook = await askConfirmation(`Generate ${apiFunc} hook?`);

      if (createHook) {
        // create single hook content based on api function
        const hookContent = apiHookDict[apiFunc].template(featureNamesDict);

        // print content
        previewCode(hookContent);

        // prompt user for confirmation
        const confirmApi = await askConfirmation(
          `Generate hook '${filename}' in ${location}?`
        );

        if (!confirmApi) {
          console.log('API generation canceled.');
          closeCLI();
          return;
        }

        // calculate filepath
        const filePath = getFullPath(hookLocation, filename);

        // create file
        createFileWithDirectories(filePath, hookContent);

        // alert user of file creation
        showMessage(`Hook file ${filename} created at ${filePath}`, 'success');

        // Update the index file in the same directory to include the new hook file
        updateIndexFile(hookLocation);
        console.log(`Updated index.ts file in ${hookLocation}`);
      }
    }
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

      // Run generateApi with optional prompts for missing arguments
      await generateApi(location, featureNamesDict);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    } finally {
      closeCLI();
    }
  })();
}
