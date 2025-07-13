export const componentTemplate = (
  componentName: string,
  props: string[],
  types: string[],
  hooks: string[]
): string => {
  const propsString = props.length
    ? `\ninterface ${componentName}Props {\n  ${props.join('\n  ')}\n}`
    : '';

  const typesString = types.length
    ? `import type { ${types.join('Type, ')} } from '../types';`
    : '';

  const hookImportsString = hooks.length
    ? `import { ${hooks.join(', ')} } from '../hooks';`
    : '';

  return `import React from 'react';
${hookImportsString}
${typesString}
${propsString}

const ${componentName}: React.FC${
    props.length ? `<${componentName}Props>` : ''
  } = (${
    props.length
      ? '{ ' + props.map((p) => p.split('?:')[0]).join(', ') + ' }'
      : ''
  }) => {
  ${
    hooks.length
      ? hooks
          .map(
            (hook) =>
              `const ${hook.replace(/^use/, '').toLowerCase()} = ${hook}();`
          )
          .join('\n  ')
      : ''
  }
  
  return (
    <div>
      <p>${componentName} works!</p>
    </div>
  );
};

export default ${componentName};
`;
};
