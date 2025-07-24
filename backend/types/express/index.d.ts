// types/express/index.d.ts
import { UserType } from '../../src/models/User'; // or wherever your user type is defined

declare global {
  namespace Express {
    interface User extends UserType {}
  }
}

