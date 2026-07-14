CREATE TABLE IF NOT EXISTS events
(
    app_id String,
    event_type LowCardinality(String),
    message String DEFAULT '',
    info JSON,
    _timestamp DateTime64(3) DEFAULT now64(3)
)
ENGINE = MergeTree
PARTITION BY toYYYYMM(_timestamp)
ORDER BY (_timestamp, app_id, event_type);
