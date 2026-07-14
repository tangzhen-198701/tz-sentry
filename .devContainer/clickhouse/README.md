# ClickHouse schema

Numbered files in `init/` are the versioned source of truth for the event schema. Docker runs them automatically only when creating a fresh ClickHouse data volume. Existing environments must apply each new file in filename order before deploying code that depends on it.

The runtime `CLICKHOUSE_EVENT_TABLE` must point to `<CLICKHOUSE_DATABASE>.events` unless a migration explicitly renames the table.
