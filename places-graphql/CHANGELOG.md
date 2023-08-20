# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.1] - 2020-12-17

## [0.4.0] - 2020-10-23
### Removed
- Moved queries and resolvers for address search/autocompletion to `vtex-apps/geolocation-graphql-interface` and `vtex-apps/google-geolocation-resolver`.

## [0.3.0] - 2020-08-31
### Added
- Queries and resolvers for address search/autocompletion.

## [0.2.1] - 2020-07-09
### Fixed
- Reads Google Maps API key from app settings.
- Fix outbound access host and path for Google Maps API.

## [0.2.0] - 2020-03-13
### Added
- Query to retrieve address from a given postal code.

## [0.1.0] - 2020-03-12
### Added
- Initial version of app with `reverseGeocode` query.
