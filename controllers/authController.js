export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username ||!password) {
      return res.status(400).json({ message: 'Missing username or password' });
    }
    
    if (username === "teacher" && password === "teacher123") {
      console.log(process.env.USERNAME, process.env.PASSWORD);
      return res.status(200).json({ message: 'Login successful' });
    }
  
    res.status(401).json({ message: 'Invalid credentials' });
  };
  