export const createNewUser = async (email: string, password: string, name: string) => {
    email = email.trim().toLowerCase();
    
    return {
        email,
        password,
        name,
    }
  };