\echo 'Delete and recreate geo db?'
\prompt 'Return for yes or control-C to cancel: ' foo

DROP DATABASE geo;
CREATE DATABASE geo;
\connect geo

\i geo-schema.sql
\i geo-seed.sql

\echo 'Delete and recreate geo_test db?'
\prompt 'Return for yes or control-C to cancel: ' foo

DROP DATABASE geo_test;
CREATE DATABASE geo_test;
\connect geo_test

\i geo-schema.sql

