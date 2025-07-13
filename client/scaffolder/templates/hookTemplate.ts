import { FeatureNamesType } from '../utils';

export const hookTemplate = (
  featureNamesDict: FeatureNamesType,
  hookType:
    | 'includeFetchAll'
    | 'includeFetchOne'
    | 'includeCreate'
    | 'includeUpdate'
    | 'includeDelete'
    | 'includeCustomHook'
): string => {
  const { PluralPascal, SingularPascal, pluralCamel, singularCamel } =
    featureNamesDict;

  switch (hookType) {
    case 'includeFetchAll':
      return `import { useQuery } from '@tanstack/react-query';
import { fetch${PluralPascal} } from '../api/${pluralCamel}Api';

export const useFetch${PluralPascal} = () => {
  return useQuery({
    queryKey: ['${pluralCamel}'],
    queryFn: fetch${PluralPascal},
  });
};
`;

    case 'includeFetchOne':
      return `import { useQuery } from '@tanstack/react-query';
import { fetch${SingularPascal}ById } from '../api/${pluralCamel}Api';

export const useFetch${SingularPascal}ById = (id: string) => {
  return useQuery({
    queryKey: ['${singularCamel}', id],
    queryFn: () => fetch${SingularPascal}ById(id),
  });
};
`;

    case 'includeCreate':
      return `import { useMutation, useQueryClient } from '@tanstack/react-query';
import { create${SingularPascal} } from '../api/${pluralCamel}Api';

export const useCreate${SingularPascal} = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: create${SingularPascal},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['${pluralCamel}'] });
    },
  });
};
`;

    case 'includeUpdate':
      return `import { useMutation, useQueryClient } from '@tanstack/react-query';
import { update${SingularPascal} } from '../api/${pluralCamel}Api';

export const useUpdate${SingularPascal} = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: update${SingularPascal},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['${pluralCamel}'] });
    },
  });
};
`;

    case 'includeDelete':
      return `import { useMutation, useQueryClient } from '@tanstack/react-query';
import { delete${SingularPascal} } from '../api/${pluralCamel}Api';

export const useDelete${SingularPascal} = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: delete${SingularPascal},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['${pluralCamel}'] });
    },
  });
};
`;

    case 'includeCustomHook':
      return `export const use${PluralPascal} = () => {
  // Add custom hook logic here
};
`;

    default:
      return '';
  }
};

export const fetchAllHookTemplate = (
  featureNamesDict: FeatureNamesType
): string => {
  const { PluralPascal, pluralCamel } = featureNamesDict;
  return `import { useQuery } from '@tanstack/react-query';
import { fetch${PluralPascal} } from '../api/${pluralCamel}Api';

export const useFetch${PluralPascal} = () => {
  return useQuery({
    queryKey: ['${pluralCamel}'],
    queryFn: fetch${PluralPascal},
  });
};
`;
};

export const fetchOneHookTemplate = (
  featureNamesDict: FeatureNamesType
): string => {
  const { SingularPascal, singularCamel, pluralCamel } = featureNamesDict;
  return `import { useQuery } from '@tanstack/react-query';
import { fetch${SingularPascal}ById } from '../api/${pluralCamel}Api';

export const useFetch${SingularPascal}ById = (id: string) => {
  return useQuery({
    queryKey: ['${singularCamel}', id],
    queryFn: () => fetch${SingularPascal}ById(id),
  });
};
`;
};

export const createHookTemplate = (
  featureNamesDict: FeatureNamesType
): string => {
  const { SingularPascal, pluralCamel } = featureNamesDict;
  return `import { useMutation, useQueryClient } from '@tanstack/react-query';
import { create${SingularPascal} } from '../api/${pluralCamel}Api';

export const useCreate${SingularPascal} = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: create${SingularPascal},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['${pluralCamel}'] });
    },
  });
};
`;
};

export const updateHookTemplate = (
  featureNamesDict: FeatureNamesType
): string => {
  const { SingularPascal, pluralCamel } = featureNamesDict;
  return `import { useMutation, useQueryClient } from '@tanstack/react-query';
import { update${SingularPascal} } from '../api/${pluralCamel}Api';

export const useUpdate${SingularPascal} = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: update${SingularPascal},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['${pluralCamel}'] });
    },
  });
};
`;
};

export const deleteHookTemplate = (
  featureNamesDict: FeatureNamesType
): string => {
  const { SingularPascal, pluralCamel } = featureNamesDict;
  return `import { useMutation, useQueryClient } from '@tanstack/react-query';
import { delete${SingularPascal} } from '../api/${pluralCamel}Api';

export const useDelete${SingularPascal} = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: delete${SingularPascal},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['${pluralCamel}'] });
    },
  });
};
`;
};

export const sliceHookTemplate = (
  hookFilename: string,
  sliceName: string,
  initialStateKeys: string[]
): string => {
  return `import { useAppSelector, useAppDispatch } from '~/store';
import { /* actions from slice */ } from '../slices';

export const ${hookFilename} = () => {
  const appDispatch = useAppDispatch();
  ${initialStateKeys.map(
    (key) =>
      `const ${key} = useAppSelector((state) => state.${sliceName}.${key});`
  )}
  const func = () => appDispatch(/* action() */);

  return {
    ${initialStateKeys.map((key) => `${key},`)}
    func,
  }
}`;
};

export const defaultHookTemplate = (
  featureNamesDict: FeatureNamesType
): string => {
  const { PluralPascal } = featureNamesDict;
  return `export const use${PluralPascal} = () => {
  // Add custom hook logic here
};
`;
};
