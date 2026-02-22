## GitHub Copilot Chat

- Extension: 0.38.2026021602 (prod)
- VS Code: 1.110.0-insider (a928adf44c1eb37236679c0dfbeba7dd4f9650e3)
- OS: win32 10.0.26100 x64
- GitHub Account: Lautaro-Montecchiani

## Network

User Settings:
```json
  "http.systemCertificatesNode": true,
  "github.copilot.advanced.debug.useElectronFetcher": true,
  "github.copilot.advanced.debug.useNodeFetcher": false,
  "github.copilot.advanced.debug.useNodeFetchFetcher": true
```

Connecting to https://api.github.com:
- DNS ipv4 Lookup: Error (1 ms): getaddrinfo ENOTFOUND api.github.com
- DNS ipv6 Lookup: Error (1 ms): getaddrinfo ENOTFOUND api.github.com
- Proxy URL: None (2 ms)
- Electron fetch (configured): Error (5 ms): Error: net::ERR_INTERNET_DISCONNECTED
	at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10684)
	at SimpleURLLoaderWrapper.emit (node:events:519:28)
  [object Object]
  {"is_request_error":true,"network_process_crashed":false}
- Node.js https: Error (22 ms): Error: getaddrinfo ENOTFOUND api.github.com
	at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)
- Node.js fetch: Error (36 ms): TypeError: fetch failed
	at node:internal/deps/undici/undici:14902:13
	at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
	at async n._fetch (c:\Users\lauta\.vscode-insiders\extensions\github.copilot-chat-0.38.2026021602\dist\extension.js:4972:26207)
	at async n.fetch (c:\Users\lauta\.vscode-insiders\extensions\github.copilot-chat-0.38.2026021602\dist\extension.js:4972:25855)
	at async d (c:\Users\lauta\.vscode-insiders\extensions\github.copilot-chat-0.38.2026021602\dist\extension.js:5004:186)
	at async Qm._executeContributedCommand (file:///c:/Users/lauta/AppData/Local/Programs/Microsoft%20VS%20Code%20Insiders/a928adf44c/resources/app/out/vs/workbench/api/node/extensionHostProcess.js:494:48675)
  Error: getaddrinfo ENOTFOUND api.github.com
  	at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)

Connecting to https://api.githubcopilot.com/_ping:
- DNS ipv4 Lookup: Error (1 ms): getaddrinfo ENOTFOUND api.githubcopilot.com
- DNS ipv6 Lookup: Error (3 ms): getaddrinfo ENOTFOUND api.githubcopilot.com
- Proxy URL: None (37 ms)
- Electron fetch (configured): Error (3 ms): Error: net::ERR_INTERNET_DISCONNECTED
	at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10684)
	at SimpleURLLoaderWrapper.emit (node:events:519:28)
  [object Object]
  {"is_request_error":true,"network_process_crashed":false}
- Node.js https: Error (12 ms): Error: getaddrinfo ENOTFOUND api.githubcopilot.com
	at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)
- Node.js fetch: Error (26 ms): TypeError: fetch failed
	at node:internal/deps/undici/undici:14902:13
	at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
	at async n._fetch (c:\Users\lauta\.vscode-insiders\extensions\github.copilot-chat-0.38.2026021602\dist\extension.js:4972:26207)
	at async n.fetch (c:\Users\lauta\.vscode-insiders\extensions\github.copilot-chat-0.38.2026021602\dist\extension.js:4972:25855)
	at async d (c:\Users\lauta\.vscode-insiders\extensions\github.copilot-chat-0.38.2026021602\dist\extension.js:5004:186)
	at async Qm._executeContributedCommand (file:///c:/Users/lauta/AppData/Local/Programs/Microsoft%20VS%20Code%20Insiders/a928adf44c/resources/app/out/vs/workbench/api/node/extensionHostProcess.js:494:48675)
  Error: getaddrinfo ENOTFOUND api.githubcopilot.com
  	at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)

Connecting to https://copilot-proxy.githubusercontent.com/_ping:
- DNS ipv4 Lookup: Error (0 ms): getaddrinfo ENOTFOUND copilot-proxy.githubusercontent.com
- DNS ipv6 Lookup: Error (0 ms): getaddrinfo ENOTFOUND copilot-proxy.githubusercontent.com
- Proxy URL: None (22 ms)
- Electron fetch (configured): Error (5 ms): Error: net::ERR_INTERNET_DISCONNECTED
	at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10684)
	at SimpleURLLoaderWrapper.emit (node:events:519:28)
  [object Object]
  {"is_request_error":true,"network_process_crashed":false}
- Node.js https: Error (20 ms): Error: getaddrinfo ENOTFOUND copilot-proxy.githubusercontent.com
	at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)
- Node.js fetch: Error (21 ms): TypeError: fetch failed
	at node:internal/deps/undici/undici:14902:13
	at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
	at async n._fetch (c:\Users\lauta\.vscode-insiders\extensions\github.copilot-chat-0.38.2026021602\dist\extension.js:4972:26207)
	at async n.fetch (c:\Users\lauta\.vscode-insiders\extensions\github.copilot-chat-0.38.2026021602\dist\extension.js:4972:25855)
	at async d (c:\Users\lauta\.vscode-insiders\extensions\github.copilot-chat-0.38.2026021602\dist\extension.js:5004:186)
	at async Qm._executeContributedCommand (file:///c:/Users/lauta/AppData/Local/Programs/Microsoft%20VS%20Code%20Insiders/a928adf44c/resources/app/out/vs/workbench/api/node/extensionHostProcess.js:494:48675)
  Error: getaddrinfo ENOTFOUND copilot-proxy.githubusercontent.com
  	at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)

Connecting to https://mobile.events.data.microsoft.com: Error (2 ms): Error: net::ERR_INTERNET_DISCONNECTED
	at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10684)
	at SimpleURLLoaderWrapper.emit (node:events:519:28)
  [object Object]
  {"is_request_error":true,"network_process_crashed":false}
Connecting to https://dc.services.visualstudio.com: Error (3 ms): Error: net::ERR_INTERNET_DISCONNECTED
	at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10684)
	at SimpleURLLoaderWrapper.emit (node:events:519:28)
  [object Object]
  {"is_request_error":true,"network_process_crashed":false}
Connecting to https://copilot-telemetry.githubusercontent.com/_ping: Error (19 ms): Error: getaddrinfo ENOTFOUND copilot-telemetry.githubusercontent.com
	at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)
Connecting to https://copilot-telemetry.githubusercontent.com/_ping: Error (14 ms): Error: getaddrinfo ENOTFOUND copilot-telemetry.githubusercontent.com
	at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)
Connecting to https://default.exp-tas.com: Error (14 ms): Error: getaddrinfo ENOTFOUND default.exp-tas.com
	at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)

Number of system certificates: 87

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).