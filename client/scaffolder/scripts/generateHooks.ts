import {
  createFileWithDirectories,
  getFullPath,
  FeatureNamesType,
  generateFeatureNames,
  updateIndexFile,
  closeCLI,
  requireNonEmpty,
  askConfirmation,
  showMessage,
  showHeader,
} from '../utils';

import { hookTemplate } from '../templates/hookTemplate';

/**
 * Prompts the user to choose which CRUD hooks to include and if they want an empty custom hook.
 * @returns An object with boolean values indicating which hooks to include.
 */
const promptForHookOptions = async (): Promise<{
  includeFetchAll: boolean;
  includeFetchOne: boolean;
  includeCreate: boolean;
  includeUpdate: boolean;
  includeDelete: boolean;
  includeCustomHook: boolean;
}> => {
  const includeFetchAll = await askConfirmation('Include "Fetch All" hook?');
  const includeFetchOne = await askConfirmation(
    'Include "Fetch One by ID" hook?'
  );
  const includeCreate = await askConfirmation('Include "Create" hook?');
  const includeUpdate = await askConfirmation('Include "Update" hook?');
  const includeDelete = await askConfirmation('Include "Delete" hook?');
  const includeCustomHook = await askConfirmation(
    'Include an empty custom hook?'
  );

  return {
    includeFetchAll,
    includeFetchOne,
    includeCreate,
    includeUpdate,
    includeDelete,
    includeCustomHook,
  };
};

/**
 * Generates individual hook files for the specified feature and updates the index file.
 * @param location - The directory where the hook files will be saved.
 * @param featureNamesDict - A dictionary of versions of the feature name.
 * @param hookOptions - The selected hooks to include.
 */
export const generateHooks = async (
  location?: string,
  featureNamesDict?: FeatureNamesType,
  hookOptions?: {
    includeFetchAll: boolean;
    includeFetchOne: boolean;
    includeCreate: boolean;
    includeUpdate: boolean;
    includeDelete: boolean;
    includeCustomHook: boolean;
  }
) => {
  showHeader('Hook Generation');

  // Prompt for location if not provided
  if (!location) {
    location = await requireNonEmpty(
      'Enter the location directory for the hook files:'
    );
  }

  // Prompt for feature name if featureNamesDict is not provided
  if (!featureNamesDict) {
    const featureName = await requireNonEmpty(
      'Enter the feature name (e.g., "posts"):'
    );
    featureNamesDict = generateFeatureNames(featureName);
  }

  // Prompt for hook options if not provided
  if (!hookOptions) {
    hookOptions = await promptForHookOptions();
  }

  // Confirm hook files creation
  const confirmHooks = await askConfirmation(
    `Generate hooks for feature '${featureNamesDict.original}' in ${location}?`
  );
  if (!confirmHooks) {
    showMessage('Hook generation canceled.', 'info');
    closeCLI();
    return;
  }

  // Define filename mapping for each hook type
  const fileNames = {
    includeFetchAll: `useFetch${featureNamesDict.PluralPascal}.ts`,
    includeFetchOne: `useFetch${featureNamesDict.SingularPascal}ById.ts`,
    includeCreate: `useCreate${featureNamesDict.SingularPascal}.ts`,
    includeUpdate: `useUpdate${featureNamesDict.SingularPascal}.ts`,
    includeDelete: `useDelete${featureNamesDict.SingularPascal}.ts`,
    includeCustomHook: `use${featureNamesDict.PluralPascal}.ts`,
  };

  // Generate each hook and save to individual files
  for (const [hookName, shouldInclude] of Object.entries(hookOptions)) {
    if (shouldInclude) {
      const hookContent = hookTemplate(
        featureNamesDict,
        hookName as keyof typeof hookOptions
      );
      const hookFileName = fileNames[hookName as keyof typeof fileNames];
      const filePath = getFullPath(location, hookFileName);
      createFileWithDirectories(filePath, hookContent);
      showMessage(
        `Hook file ${hookFileName} created at ${filePath}`,
        'success'
      );
    }
  }

  // Update the index file in the same directory to include the new hooks
  updateIndexFile(location);
  showMessage(`Updated index.ts file in ${location}`, 'success');
};

// Check if the module is running directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  (async () => {
    try {
      // Parse CLI arguments for location and feature name, if provided
      const [, , locationArg, featureNameArg] = process.argv;
      const location = locationArg || undefined;
      const featureNamesDict = featureNameArg
        ? generateFeatureNames(featureNameArg)
        : undefined;

      // Run generateHooks with optional prompts for missing arguments
      await generateHooks(location, featureNamesDict);
    } catch (error) {
      showMessage(`Error: ${error.message}`, 'error');
    } finally {
      closeCLI();
    }
  })();
}
