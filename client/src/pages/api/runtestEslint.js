import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { stdout, stderr } = await execPromise('npm run lint'); // or your custom eslint command
      if (stderr) {
        return res.status(500).json({ error: stderr });
      }
      res.status(200).json({ output: stdout });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
