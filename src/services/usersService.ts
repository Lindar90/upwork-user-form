interface IUser {
  username: string,
  country: string,
  tax: string,
}

const usersService = {
  // TODO extract baseURL to env variables
  async save(data: IUser) {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      return response.json();
    } catch (e) {
      // TODO 1. Handle 400 validation errors and throw custom exception with errors array
      // TODO 2. In case of other error type sent error to reporting system (Sentry??)
      // TODO 2. and handle error gracefully
      console.log(e);
      throw e;
    }
  },
};

export default usersService;
