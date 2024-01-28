const eventListen = (req: any, res: any) => {
  console.log(res);
  res.writeHead('Hello world');
  res.end();
};

export { eventListen };
