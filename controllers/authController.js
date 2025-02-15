export const login = async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    
    if (username === "teacher" && password === "teacher123") {
      console.log(process.env.USERNAME, process.env.PASSWORD);
      return res.status(200).json({ message: 'Login successful' });
    }
    
    if (!username ||!password) {
      return res.status(400).json({ message: 'Missing username or password' });
    }

  
    res.status(401).json({ message: 'Invalid credentials' });
  };
  