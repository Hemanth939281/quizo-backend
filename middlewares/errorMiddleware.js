const errorMiddleware = (err,res) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });

  };
  
  export default errorMiddleware;
  