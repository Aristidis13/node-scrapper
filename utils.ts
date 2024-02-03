/* eslint-disable @typescript-eslint/no-explicit-any */
const eventListen = (req: any, res: any) => {
  res.writeHead('Hello world');
  res.end();
};

export { eventListen };
