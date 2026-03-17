# Email Integration Setup — TWS Pilot Mailbox

**Status:** Himalaya v1.2.0 installed and ready. Waiting for IMAP/SMTP credentials from IT.

---

## What's Done

- Himalaya CLI installed at `~/bin/himalaya` (v1.2.0, aarch64-darwin)
- Config template below — ready to populate once IT provides credentials

---

## What IT Needs to Send Us

For the pilot/dummy forwarding mailbox:

| Credential | Notes |
|---|---|
| IMAP host | e.g. `mail.clook.net` or similar |
| IMAP port | Usually 993 (TLS) or 143 (STARTTLS) |
| SMTP host | May differ from IMAP host |
| SMTP port | Usually 587 (STARTTLS) or 465 (TLS) |
| Username | Usually the full email address |
| Password | App password if 2FA enabled |

---

## Config Template (populate when credentials received)

Create file at `~/.config/himalaya/config.toml`:

```toml
[accounts.tws-pilot]
email = "PILOT_EMAIL@tws-domain.co.uk"
display-name = "The Wheel Specialist"
default = true

backend.type = "imap"
backend.host = "IMAP_HOST"
backend.port = 993
backend.encryption.type = "tls"
backend.login = "PILOT_EMAIL@tws-domain.co.uk"
backend.auth.type = "password"
backend.auth.raw = "PASSWORD_HERE"

message.send.backend.type = "smtp"
message.send.backend.host = "SMTP_HOST"
message.send.backend.port = 587
message.send.backend.encryption.type = "start-tls"
message.send.backend.login = "PILOT_EMAIL@tws-domain.co.uk"
message.send.backend.auth.type = "password"
message.send.backend.auth.raw = "PASSWORD_HERE"
```

> ⚠️ Store credentials securely. Once tested, migrate to `pass` or system keyring.

---

## Test Commands (run after config is populated)

```bash
# Verify account connects
himalaya account list

# List folders
himalaya folder list

# List inbox
himalaya envelope list

# Read first email
himalaya envelope list --output json | python3 -c "import sys,json; e=json.load(sys.stdin); print(e[0]['id'] if e else 'empty')" | xargs himalaya message read
```

---

## Rollout Phases

| Phase | Scope | Trigger |
|---|---|---|
| Phase 1 | Pilot mailbox — read + triage only, no auto-send | IT sends credentials |
| Phase 2 | Enable auto-responses for standard enquiries | After Jack verifies triage accuracy |
| Phase 3 | Roll out to all 23 branch mailboxes | After pilot confirmed solid |

---

## Per-Branch Rollout (Phase 3)

Each branch will need its own `[accounts.branch-name]` block in the config. The agent will need:
- Branch name mapping (e.g. `tws-liverpool`, `tws-manchester`)
- Which franchisee each mailbox belongs to
- Routing rules: which emails go to which branch agent context

