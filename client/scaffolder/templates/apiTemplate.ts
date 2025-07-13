import { FeatureNamesType } from '../utils';

interface ApiOptions {
  includeGetAll: boolean;
  includeGetOne: boolean;
  includeCreate: boolean;
  includeUpdate: boolean;
  includeDelete: boolean;
}

export const apiTemplate = (
  featureNamesDict: FeatureNamesType,
  options: ApiOptions
): string => {
  const { pluralCamel, PluralPascal, SingularPascal } = featureNamesDict;

  const urlDeclaration = `const url = '/${pluralCamel}';`;

  const getAllFunction = options.includeGetAll
    ? `
export const fetch${PluralPascal} = async (): Promise<${SingularPascal}Type[]> => {
  const response = await axiosInstance.get(url);
  return response.data;
};`
    : '';

  const getOneFunction = options.includeGetOne
    ? `
export const fetch${SingularPascal}ById = async (id: string): Promise<${SingularPascal}Type | null> => {
  const response = await axiosInstance.get(\`\${url}/\${id}\`);
  return response.data;
};`
    : '';

  const createFunction = options.includeCreate
    ? `
export const create${SingularPascal} = async (new${SingularPascal}: Omit<${SingularPascal}Type, 'id'>): Promise<${SingularPascal}Type> => {
  const response = await axiosInstance.post(url, new${SingularPascal});
  return response.data;
};`
    : '';

  const updateFunction = options.includeUpdate
    ? `
export const update${SingularPascal} = async (updated${SingularPascal}: ${SingularPascal}Type): Promise<${SingularPascal}Type> => {
  const response = await axiosInstance.put(\`\${url}/\${updated${SingularPascal}.id}\`, updated${SingularPascal});
  return response.data;
};`
    : '';

  const deleteFunction = options.includeDelete
    ? `
export const delete${SingularPascal} = async (id: string): Promise<void> => {
  await axiosInstance.delete(\`\${url}/\${id}\`);
};`
    : '';

  return `import { axiosInstance } from '~/api';
import type { ${SingularPascal}Type } from '../types';

${urlDeclaration}
${getAllFunction}
${getOneFunction}
${createFunction}
${updateFunction}
${deleteFunction}
`;
};
