# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.5.0] - 2021-09-16

## [0.4.1] - 2021-05-07
### Changed
- Decrease max age of public queries.

## [0.4.0] - 2021-02-24
### Changed
- Update queries to be publicly cacheable.

## [0.3.0] - 2020-10-30
### Added
- Field `pattern` to `AddressField` schema.

## [0.2.0] - 2020-07-02
### Added
- Routes `/country-settings/` and `/country-settings/:country` to retrieve country configurations.

## [0.1.0] - 2020-06-30
### Added
- Configuration schema for address and phone fields.
- GraphQL queries to retrieve those configurations (all countries or a single one).
