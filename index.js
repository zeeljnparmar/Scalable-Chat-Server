const cluster = require('cluster');
const os = require('os');
const express = require('express');
const conversationRoutes = require('./src/routes/conversation.routes');
require('./src/cleanup'); // Trigger background cleanup

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`[Master] Running on PID: ${process.pid}`);

  // Fork one worker per CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Restart worker on unexpected exit
  cluster.on('exit', (worker, code, signal) => {
    console.log(`[Master] Worker ${worker.process.pid} died. Spawning a new worker.`);
    cluster.fork();
  });

} else {
  // Worker process: starts an Express server
  const app = express();
  app.use(express.json());
  app.use('/api', conversationRoutes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`[Worker ${process.pid}] Server is running on port ${PORT}`);
  });
}
