# Integrations Reference

## Customer IM

Customer IM is a built-in global capability:

- H5 starts consultations.
- PC admin receives sessions through a global floating dock and drawer.
- It does not create an independent navigation entry.
- A global provider monitors unread counts, assignment state, connection state, reconnect events, and new messages.

Backend:

```text
server/internal/im/
├── gateway/
├── service/
├── repository/
├── dto/
└── vo/
```

Frontend:

```text
admin/src/features/im/
├── ImMonitorProvider.tsx
├── ImFloatingEntry.tsx
├── ImWorkbenchDrawer.tsx
├── hooks/
└── api/

h5/src/pages/im/
└── chat/
```

WebSocket endpoints:

```text
GET /adminapi/im/ws?token=<admin-token>&terminal=admin
GET /h5api/im/ws?token=<user-token>&terminal=h5
GET /h5api/im/ws?visitor_id=<visitor-id>&terminal=h5
```

Message contract:

```json
{
  "type": "message.send",
  "request_id": "req_1700000000",
  "data": {
    "session_id": "s_10001",
    "client_msg_id": "cmsg_1700000000",
    "msg_type": "text",
    "content": "Hello, I need help with an order",
    "payload": {}
  }
}
```

Core tables:

```text
im_session
im_message
im_session_user
im_customer_service
im_reply_group
im_reply
im_blacklist
im_event
```

Remember: physical names are rendered with `{table_prefix}`.

## Third-party SDK Integrations

All third-party capabilities live under:

```text
server/internal/common/sdk/
├── storage/
│   ├── driver.go
│   ├── local.go
│   ├── tencent_cos.go
│   ├── aliyun_oss.go
│   └── qiniu_kodo.go
└── sms/
    ├── driver.go
    ├── tencent_sms.go
    └── aliyun_sms.go
```

Supported storage drivers:

- `local`
- `tencent_cos`
- `aliyun_oss`
- `qiniu_kodo`

Supported SMS drivers:

- `tencent_sms`
- `aliyun_sms`

Storage interface:

```go
type StorageDriver interface {
    Put(ctx context.Context, objectKey string, reader io.Reader, size int64, contentType string) (*FileObject, error)
    Fetch(ctx context.Context, url string, objectKey string) (*FileObject, error)
    Delete(ctx context.Context, objectKey string) error
    PublicURL(objectKey string) string
}
```

SMS interface:

```go
type SmsDriver interface {
    Send(ctx context.Context, req SmsSendRequest) (*SmsSendResult, error)
}

type SmsSendRequest struct {
    Mobile     string
    TemplateID string
    Params     map[string]string
    Scene      string
}
```

Security rules:

- Read secrets only from environment variables, secret management services, or encrypted config.
- Mask secrets in admin config pages.
- Test-connection APIs only return success/failure and an error summary.
- Uploads validate size, extension, MIME, and generated object key.
- SMS limits: one send per mobile per 60 seconds, at most 20 per scene per day, five-minute code TTL, invalidate after use or excessive failures.

