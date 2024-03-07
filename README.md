#### Start Server

```bash
npm start
```

#### Start Client

```bash
 cd client
 npm run dev
```

#### Design

```


         ┌──────────────┐                ┌──────────────┐
         │              ├───────────────►│              │
         │    Server    │   check user   │      DB      │
         │              │◄───────────────┤              │
         └──────────────┘                └──────────────┘
                 ▲
                 │  check auth
                 │
         ┌───────┴──────┐
         │              │
         │    Client    │
         │              │
         └──────────────┘

```

This pattern uses jwt access tokens stored in http-only cookies which only the server can read.
The client synchronises auth-status with the server on mount. Protected routes in the client also check auth-status every time they are requested. To ease latency issues auth-status is stored in state and this is used while the server responds to the check.

Proxied routes e.g. "/api" need to be defined in vite.config.ts
