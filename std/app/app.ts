export type App = {
  name: string;
  vendor: string;
  release: ReleaseDate;
};

export type ReleaseDate = {
  year: number;
  month: number;
  day: number;
  build: number;
  toString: () => string
};

export type BuildConfig = {

}

export type RuntimeConfig = {

}

export type BuildData = {

}

export type RouteData = {

}

export type EventData = {

}

export type BuildResult = {

}

export type RouteResult = {

}

export type EventResult = {

} | void
