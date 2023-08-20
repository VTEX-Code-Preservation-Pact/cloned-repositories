export interface IDecorators<K> {
  decorators?: { use: any; in: K[] }[];
}

export interface IPartialEntity<T> {
  partialEntity?: Partial<T>;
}

export interface BaseOptionsA<K, T> extends IDecorators<K>, IPartialEntity<T> {
  omit?: K[];
}

export interface BaseOptionsB<K, T> extends IDecorators<K>, IPartialEntity<T> {
  pick?: K[];
}
