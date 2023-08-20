export const directions = {
  all: 'a',
  left: 'l',
  right: 'r',
  top: 't',
  bottom: 'b',
  vert: 'v',
  horiz: 'h',
};

export const cssDirections = {
  all: [''],
  left: ['-left'],
  right: ['-right'],
  top: ['-top'],
  bottom: ['-bottom'],
  vert: ['-top', '-bottom'],
  horiz: ['-left', '-right'],
};

export function forEachDirection(fn) {
  Object.entries(directions).forEach(([name, dir]) =>
    fn({ name, dir, cssDirs: cssDirections[name] }),
  );
}

export function getDirectionProperties(cssDirs, prefix, value) {
  return cssDirs.map(cssDir => [`${prefix}${cssDir}`, `${value}`]);
}
