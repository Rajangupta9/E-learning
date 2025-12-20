const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// CORS middleware - must be before other middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

// Proxy mapping (service names used in docker-compose)
app.use(
  '/auth',
  createProxyMiddleware({
    target: 'http://auth-service:4001',
    changeOrigin: true,
    pathRewrite: { '^/auth': '' },
    logLevel: 'debug',
    onProxyReq: (proxyReq, req, res) => {
      console.log(`Proxying ${req.method} ${req.url} to auth-service`);
      if (req.body) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log(`Response from auth-service: ${proxyRes.statusCode}`);
    },
    onError: (err, req, res) => {
      console.error('Proxy error for /auth:', err.message);
      res.status(500).json({ error: 'Gateway proxy error', message: err.message });
    },
  }),
);

app.use(
  '/users',
  createProxyMiddleware({
    target: 'http://user-service:4002',
    changeOrigin: true,
    pathRewrite: { '^/users': '' },
  }),
);
app.use(
  '/orgs',
  createProxyMiddleware({
    target: 'http://organization-service:4003',
    changeOrigin: true,
    pathRewrite: { '^/orgs': '' },
  }),
);
app.use(
  '/courses',
  createProxyMiddleware({
    target: 'http://course-service:7001',
    changeOrigin: true,
    pathRewrite: { '^/courses': '' },
  }),
);
app.use(
  '/content',
  createProxyMiddleware({
    target: 'http://content-service:4005',
    changeOrigin: true,
    pathRewrite: { '^/content': '' },
  }),
);
app.use(
  '/assessments',
  createProxyMiddleware({
    target: 'http://assessment-service:4006',
    changeOrigin: true,
    pathRewrite: { '^/assessments': '' },
  }),
);
app.use(
  '/enrollments',
  createProxyMiddleware({
    target: 'http://enrollment-service:4007',
    changeOrigin: true,
    pathRewrite: { '^/enrollments': '' },
  }),
);
app.use(
  '/payments',
  createProxyMiddleware({
    target: 'http://payment-service:4008',
    changeOrigin: true,
    pathRewrite: { '^/payments': '' },
  }),
);
app.use(
  '/notifications',
  createProxyMiddleware({
    target: 'http://notification-service:4009',
    changeOrigin: true,
    pathRewrite: { '^/notifications': '' },
  }),
);
app.use(
  '/analytics',
  createProxyMiddleware({
    target: 'http://analytics-service:6001',
    changeOrigin: true,
    pathRewrite: { '^/analytics': '' },
  }),
);
app.use(
  '/realtime',
  createProxyMiddleware({
    target: 'http://real-time-service:4010',
    changeOrigin: true,
    pathRewrite: { '^/realtime': '' },
  }),
);
app.use(
  '/search',
  createProxyMiddleware({
    target: 'http://search-service:4011',
    changeOrigin: true,
    pathRewrite: { '^/search': '' },
  }),
);
app.use(
  '/integrations',
  createProxyMiddleware({
    target: 'http://integration-service:4012',
    changeOrigin: true,
    pathRewrite: { '^/integrations': '' },
  }),
);
app.use(
  '/ai',
  createProxyMiddleware({
    target: 'http://ai-service:5001',
    changeOrigin: true,
    pathRewrite: { '^/ai': '' },
  }),
);
app.use(
  '/rustsvc',
  createProxyMiddleware({
    target: 'http://rust-service:8001',
    changeOrigin: true,
    pathRewrite: { '^/rustsvc': '' },
  }),
);

app.get('/health', (req, res) => {
  console.log('Health check requested');
  res.json({ status: 'gateway ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.GATEWAY_PORT || 4000;
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`Gateway listening on port ${PORT}`);
  console.log(`Health endpoint: http://localhost:${PORT}/health`);
  console.log('='.repeat(50));
});
