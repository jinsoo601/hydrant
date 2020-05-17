export const getClientIpAddress = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.addEventListener("load", (event) => {
      resolve(req.response);
    });
    req.addEventListener("error", () => {
      reject(new Error("Couldn't get IP Address"));
    });
    req.open("GET", "https://api6.ipify.org");
    req.send();
  });
};
